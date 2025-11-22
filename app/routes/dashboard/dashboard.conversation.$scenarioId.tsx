import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { authenticatedFetch } from '../../utils/api';

interface Message {
    type: 'user' | 'ai' | 'system' | 'transcription';
    content: string;
}

interface ScenarioData {
    title: string;
    subtitle: string;
    rounds: { _id: string, prompt: string }[];
}

export default function ConversationPage() {
    const { scenarioId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([]);
    const [scenarioData, setScenarioData] = useState<ScenarioData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userInput, setUserInput] = useState('');
    const [selectedRoundId, setSelectedRoundId] = useState<string | null>(null);
    const ws = useRef<WebSocket | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioStreamRef = useRef<MediaStream | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const addMessage = (content: string, type: Message['type']) => {
        setMessages(prev => [...prev, { content, type }]);
    };

    const handleSocketMessage = (data: any) => {
        switch (data.type) {
            case 'started':
                addMessage(`Rozmowa rozpoczęta.`, 'system');
                break;
            case 'transcription':
                addMessage(`${data.content}`, 'transcription');
                break;
            case 'response':
                addMessage(data.content, 'ai');
                if (data.audio) {
                    playAudio(data.audio);
                }
                break;
            case 'error':
                addMessage(`Błąd: ${data.content}`, 'system');
                break;
            case 'ended':
                addMessage('Rozmowa zakończona przez serwer.', 'system');
                break;
        }
    };

    const playAudio = (base64Audio: string) => {
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            const audioContext = audioContextRef.current;
            const binaryString = atob(base64Audio);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const dataView = new DataView(bytes.buffer);
            const numSamples = bytes.length / 2;
            const buffer = audioContext.createBuffer(1, numSamples, 24000);
            const channelData = buffer.getChannelData(0);
            for (let i = 0; i < numSamples; i++) {
                channelData[i] = dataView.getInt16(i * 2, true) / 32768.0;
            }
            const source = audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(audioContext.destination);
            source.start(0);
        } catch (error) {
            console.error('Error playing audio:', error);
            addMessage('Nie udało się odtworzyć audio.', 'system');
        }
    };

    const handleSendMessage = () => {
        if (userInput.trim() && ws.current?.readyState === WebSocket.OPEN) {
            addMessage(userInput, 'user');
            ws.current.send(JSON.stringify({ type: 'message', content: userInput }));
            setUserInput('');
        }
    };

    const handleToggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const startRecording = async () => {
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('Twoja przeglądarka nie wspiera nagrywania audio.');
            }
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioStreamRef.current = stream;
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            audioChunksRef.current = [];
            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };
            recorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                sendAudio(audioBlob);
                audioStreamRef.current?.getTracks().forEach(track => track.stop());
            };
            recorder.start();
            setIsRecording(true);
            setIsMuted(false);
        } catch (err) {
            console.error("Error starting recording:", err);
            setError('Nie udało się uzyskać dostępu do mikrofonu. Sprawdź uprawnienia w przeglądarce.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            addMessage('Nagrywanie zakończone. Przetwarzanie...', 'system');
        }
    };

    const sendAudio = (audioBlob: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64Data = (reader.result as string).split(',')[1];
            if (ws.current?.readyState === WebSocket.OPEN) {
                ws.current.send(JSON.stringify({
                    type: 'audio',
                    audioData: base64Data,
                    mimeType: audioBlob.type, 
                }));
            }
        };
        reader.readAsDataURL(audioBlob);
    };

    const toggleMute = () => {
        if (audioStreamRef.current) {
            const audioTracks = audioStreamRef.current.getAudioTracks();
            if (audioTracks.length > 0) {
                audioTracks[0].enabled = !audioTracks[0].enabled;
                setIsMuted(!audioTracks[0].enabled);
            }
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (!scenarioId) {
            setError('Nie znaleziono ID scenariusza w adresie URL');
            setIsLoading(false);
            return;
        }
        const fetchScenarioData = async () => {
            setIsLoading(true);
            try {
                const scenarioResponse = await authenticatedFetch(`/api/v1/scenario/${scenarioId}`);
                if (!scenarioResponse.ok) throw new Error('Nie udało się załadować informacji o scenariuszu.');
                const scenario: ScenarioData = await scenarioResponse.json();
                setScenarioData(scenario);
                if (!scenario.rounds || scenario.rounds.length === 0) {
                    setError('Ten scenariusz nie ma zdefiniowanych żadnych rund. Nie można rozpocząć rozmowy.');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Wystąpił nieznany błąd.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchScenarioData();
    }, [scenarioId]);

    useEffect(() => {
        if (!selectedRoundId || !scenarioId) return;

        const connect = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) throw new Error('Brak tokenu. Zaloguj się ponownie');

                const wsUrl = `wss://odpalgadke.q1000q.cc/api/v1/ai/chat?token=${token}`;
                ws.current = new WebSocket(wsUrl);

                ws.current.onopen = () => {
                    addMessage('Połączono z serwerem. Rozpoczynanie rozmowy...', 'system');
                    ws.current?.send(JSON.stringify({
                        type: 'start',
                        scenarioId: scenarioId,
                        roundId: selectedRoundId
                    }));
                };

                ws.current.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    handleSocketMessage(data);
                };

                ws.current.onclose = () => {
                    addMessage('Rozłączono', 'system');
                };
                
                ws.current.onerror = (err) => {
                    console.error('WebSocket error:', err);
                    setError('Wystąpił błąd połączenia WebSocket.');
                };
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Wystąpił nieznany błąd.');
            }
        };

        connect();

        return () => {
            ws.current?.close();
        };
    }, [selectedRoundId, scenarioId]);

    if (isLoading) {
        return <div className="text-center p-12">Łączenie z serwerem i przygotowywanie rozmowy...</div>;
    }

    if (error) {
        return <div className="bg-red-100 text-red-700 p-6 rounded-xl max-w-4xl mx-auto"><b>Błąd:</b> {error}</div>;
    }

    if (!selectedRoundId) {
        return (
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border p-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900">{scenarioData?.title}</h1>
                <p className="text-gray-600 mt-1 mb-6">{scenarioData?.subtitle}</p>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Wybierz rundę, aby rozpocząć</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scenarioData?.rounds.map(round => (
                        <button
                            key={round._id}
                            onClick={() => setSelectedRoundId(round._id)}
                            className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl text-left hover:bg-blue-100 hover:border-blue-400 transition"
                        >
                            <p className="font-semibold text-blue-800">{round.prompt}</p>
                        </button>
                    ))}
                </div>
                 <button onClick={() => navigate('/dashboard/scenarios')} className="mt-8 px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition">
                    Wróć do listy scenariuszy
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-100px)] max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border">
            <div className="p-4 border-b">
                <h1 className="text-xl font-bold">{scenarioData?.title}</h1>
                <p className="text-sm text-gray-500">{scenarioData?.subtitle}</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === 'user' || msg.type === 'transcription' ? 'justify-end' : 'justify-start'}`}>
                         <div className={`max-w-lg p-3 rounded-2xl ${
                            msg.type === 'user' ? 'bg-blue-600 text-white' :
                            msg.type === 'ai' ? 'bg-gray-200 text-gray-800' :
                            msg.type === 'transcription' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800 text-sm italic w-full text-center'
                        }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t flex items-center gap-2 sm:gap-4 bg-gray-50">
                {isRecording && (
                    <button
                        onClick={toggleMute}
                        className={`p-3 rounded-full transition-colors ${isMuted ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                        title={isMuted ? 'Włącz mikrofon' : 'Wycisz mikrofon'}
                    >
                        {isMuted ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 016 0v8.25a3 3 0 01-3 3z" />
                            </svg>
                        )}
                    </button>
                )}

                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !isRecording && handleSendMessage()}
                        placeholder={isRecording ? "Mów teraz..." : "Wpisz wiadomość lub naciśnij mikrofon"}
                        className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black pr-12"
                        disabled={isRecording}
                    />
                </div>

                {userInput && !isRecording ? (
                     <button onClick={handleSendMessage} className="p-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-transform transform active:scale-90" title="Wyślij">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </button>
                ) : (
                    <button
                        onClick={handleToggleRecording}
                        className={`p-3 rounded-full transition-colors ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                        title={isRecording ? 'Zatrzymaj nagrywanie' : 'Rozpocznij nagrywanie'}
                    >
                        {isRecording ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 016 0v8.25a3 3 0 01-3 3z" />
                            </svg>
                        )}
                    </button>
                )}
                
                <button onClick={() => navigate('/dashboard/scenarios')} className="p-3 bg-gray-600 text-white font-semibold rounded-full hover:bg-gray-700" title="Zakończ i wróć">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
                    </svg>
                </button>
            </div>
        </div>
    );
}