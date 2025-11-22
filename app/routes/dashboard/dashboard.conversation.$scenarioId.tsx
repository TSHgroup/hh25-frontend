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
    rounds: { _id: string }[];
}

export default function ConversationPage() {
    const { scenarioId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([]);
    const [scenarioData, setScenarioData] = useState<ScenarioData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userInput, setUserInput] = useState('');
    const ws = useRef<WebSocket | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

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
            const buffer = audioContext.createBuffer(1, numSamples, 24000); // 24kHz sample rate
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

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (!scenarioId){
            setError('Nie znaleziono ID scenariusza w adresie URL');
            setIsLoading(false);
            return;
        }

        const connect = async () => {
            try {
                const scenarioResponse = await authenticatedFetch(`/api/v1/scenario/${scenarioId}`);
                if (!scenarioResponse.ok) {
                    throw new Error('Nie udało się załadować informacji o scenariuszu.');
                }
                const scenario: ScenarioData = await scenarioResponse.json();
                setScenarioData(scenario);

                if (!scenario.rounds || scenario.rounds.length === 0 || !scenario.rounds[0]._id) {
                    throw new Error('Ten scenariusz nie ma zdefiniowanych żadnych rund. Nie można rozpocząć rozmowy.');
                }
                const roundId = scenario.rounds[0]._id;

                const token = localStorage.getItem('accessToken');
                if (!token) throw new Error('Brak tokenu. Zaloguj się ponownie');

                const wsUrl = `wss://odpalgadke.q1000q.cc/api/v1/ai/chat?token=${token}`;
                ws.current = new WebSocket(wsUrl);

                ws.current.onopen = () => {
                    addMessage('Połączono z serwerem. Rozpoczynanie rozmowy...', 'system');
                    ws.current?.send(JSON.stringify({
                        type: 'start',
                        scenarioId: scenarioId,
                        roundId: roundId
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
            } finally {
                setIsLoading(false);
            }
        };

        connect();

        return () => {
            ws.current?.close();
        };
    }, [scenarioId]);

    const handleSendMessage = () => {
        if (userInput.trim() && ws.current?.readyState === WebSocket.OPEN) {
            addMessage(userInput, 'user');
            ws.current.send(JSON.stringify({ type: 'message', content: userInput }));
            setUserInput('');
        }
    };

    if (isLoading) {
        return <div className="text-center p-12">Łączenie z serwerem i przygotowywanie rozmowy...</div>;
    }

    if (error) {
        return <div className="bg-red-100 text-red-700 p-6 rounded-xl max-w-4xl mx-auto"><b>Błąd:</b> {error}</div>;
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
            <div className="p-4 border-t flex gap-4">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Wpisz wiadomość..."
                    className="flex-1 px-4 py-2 border rounded-xl"
                />
                <button onClick={handleSendMessage} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl">Wyślij</button>
                <button onClick={() => navigate('/dashboard/scenarios')} className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-xl">Zakończ</button>
            </div>
        </div>
    );
}