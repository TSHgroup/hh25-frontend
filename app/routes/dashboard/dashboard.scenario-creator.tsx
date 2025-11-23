import { useState, useEffect } from 'react';
import { authenticatedFetch } from '../../utils/api';
import { useNavigate, useParams } from 'react-router';
import PersonaSelectionModal from '../../components/PersonaSelectionModal';

export function meta() {
    return [
        { title: "Kreator Scenariusza - OdpalGadkę" },
        { name: "description", content: "Create or edit custom conversation scenarios" }
    ];
}

interface Persona {
    _id: string;
    name: string;
    role: string;
    personality: string;
}

interface Round {
    prompt: string;
    expectedResponseType: string;
    emotion: string;
    userEmotionTarget: string;
    tips: string[];
    keywordsRequired: string[];
    keywordsBanned: string[];
}

export default function ScenarioCreator() {
    const navigate = useNavigate();
    const { scenarioId } = useParams(); 
    const editMode = !!scenarioId;
    
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        description: '',
        category: 'business',
        tags: '',
        languages: 'pl',
        objectives: '',
        persona: '',
        openingPrompt: '',
        // closingPrompt: '',
        rounds: [] as Round[],
    });

    const [personas, setPersonas] = useState<Persona[]>([]);
    const [personasLoading, setPersonasLoading] = useState(true);
    const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);
    const [selectedPersonaName, setSelectedPersonaName] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(editMode);
    const [error, setError] = useState<string | null>(null);
    const [newRoundPrompt, setNewRoundPrompt] = useState('');

    useEffect(() => {
        const fetchAllAvaiblePersonas = async () => {
            setPersonasLoading(true);
            try {
                const [myPersonasResponse, publicPersonasResponse] = await Promise.allSettled ([
                    authenticatedFetch('/api/v1/persona/user/me'),
                    authenticatedFetch('/api/v1/persona?limit=100&page=1'),
                ]);

                const allPersonas = new Map<string, Persona>();

                if (myPersonasResponse.status === 'fulfilled' && myPersonasResponse.value.ok) {
                    const myPersonasData = await myPersonasResponse.value.json();
                    const myPersonasList = Array.isArray(myPersonasData) ? myPersonasData : [];
                    myPersonasList.forEach(p => allPersonas.set(p._id, p));
                } else {
                    console.error("Nie można zfetchować person użytkownika:", myPersonasResponse.status === 'rejected' ? myPersonasResponse.reason : 'Request failed');
                }

                if (publicPersonasResponse.status === 'fulfilled' && publicPersonasResponse.value.ok) {
                    const publicPersonasData = await publicPersonasResponse.value.json();
                    const publicPersonasList = publicPersonasData.result || [];
                    publicPersonasList.forEach((p: Persona) => allPersonas.set(p._id, p));
                } else {
                    console.error("Could not fetch public personas:", publicPersonasResponse.status === 'rejected' ? publicPersonasResponse.reason : 'Request failed');
                }
                
                setPersonas(Array.from(allPersonas.values()));

            } catch (err) {
                console.error("Error fetching personas:", err);
                setError('Nie udało się załadować listy person.');
                setPersonas([]);
            } finally {
                setPersonasLoading(false);
            }
        };

        fetchAllAvaiblePersonas();
    }, []);

    useEffect(() => {
        if (formData.persona && personas.length > 0) {
            const selected = personas.find(p => p._id === formData.persona);
            if (selected){
                setSelectedPersonaName(`${selected.name} (${selected.role})`)
            }
        }
    }, [formData.persona, personas])

    useEffect(() => {
        if (editMode && scenarioId) {
            const fetchScenarioData = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const response = await authenticatedFetch(`/api/v1/scenario/${scenarioId}`);
                    
                    if (!response.ok) {
                        console.error('Failed to fetch scenario. Status:', response.status);
                        throw new Error('Nie udało się załadować danych scenariusza.');
                    }
                    
                    const data = await response.json();

                    setFormData({
                        title: data.title || '',
                        subtitle: data.subtitle || '',
                        description: data.description || '',
                        category: data.category || 'business',
                        tags: (data.tags || []).join(', '),
                        languages: (data.languages || ['pl'])[0],
                        objectives: (data.objectives || []).join(', '),
                        persona: data.persona?._id || data.persona || '',
                        openingPrompt: data.openingPrompt || '',
                        // closingPrompt: data.closingPrompt || '',
                        rounds: data.rounds || [],
                    });

                } catch (err) {
                    console.error('Error in fetchScenarioData:', err);
                    setError(err instanceof Error ? err.message : 'Wystąpił błąd');
                } finally {
                    setIsLoading(false);
                }
            };

            fetchScenarioData();
        }
    }, [scenarioId, editMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        handleChange(e);
        if (e.target.value !== 'other') {
            setCustomCategory('');
        }
    };
    
    const handlePersonaSelect = (persona: Persona) => {
        setFormData(prev => ({ ...prev, persona: persona._id }));
        setSelectedPersonaName(`${persona.name} (${persona.role})`);
        setIsPersonaModalOpen(false);
    };

    const handleAddRound = () => {
        if (newRoundPrompt.trim()) {
            const newRound: Round = {
                prompt: newRoundPrompt.trim(),
                expectedResponseType: 'text',
                emotion: 'neutral',
                userEmotionTarget: 'neutral',
                tips: [],
                keywordsRequired: [],
                keywordsBanned: [],
            };
            setFormData(prev => ({
                ...prev,
                rounds: [...prev.rounds, newRound]
            }));
            setNewRoundPrompt('');
        }
    };

    const handleRemoveRound = (indexToRemove: number) => {
        setFormData(prev => ({
            ...prev,
            rounds: prev.rounds.filter((_, index) => index !== indexToRemove)
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        if (!formData.persona) {
            setError('Musisz wybrać personę.');
            setIsSubmitting(false);
            return;
        }

        if (formData.rounds.length < 1) {
            setError('Musisz dodać co najmniej 1 rundę.');
            setIsSubmitting(false);
            return;
        }

        try {
            const payload = {
                title: formData.title,
                subtitle: formData.subtitle || undefined,
                description: formData.description,
                category: formData.category === 'other' ? customCategory : formData.category,
                tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
                languages: [formData.languages],
                status: 'editing',
                objectives: formData.objectives ? formData.objectives.split(',').map(obj => obj.trim()).filter(Boolean) : [],
                persona: formData.persona, 
                openingPrompt: formData.openingPrompt,
                // closingPrompt: formData.closingPrompt,
                rounds: formData.rounds,
                provider: 'gemini',
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
            };
            const url = editMode ? `/api/v1/scenario/${scenarioId}` : '/api/v1/scenario';
            const method = editMode ? 'PUT' : 'POST';

            const response = await authenticatedFetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || errorData.error || `Błąd serwera: ${response.status}`);
            }

            alert(editMode ? 'Scenariusz został zaktualizowany!' : 'Scenariusz został utworzony!');
            navigate('/dashboard/scenarios');

        } catch(err) {
            console.error('Submit error:', err);
            setError(err instanceof Error ? err.message : 'Wystąpił błąd');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="text-center p-12">
                <p>Ładowanie danych scenariusza...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {editMode ? 'Edytuj scenariusz' : 'Utwórz nowy prywatny scenariusz'}
                    </h1>
                    <p className="text-gray-600 mt-1">
                        {editMode ? 'Zaktualizuj szczegóły swojego scenariusza.' : 'Stwórz własny scenariusz treningowy widoczny tylko dla Ciebie'}
                    </p>
                </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                        <p className="font-semibold">Błąd:</p>
                        <p className="text-sm mt-1 whitespace-pre-wrap">{error}</p>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tytuł *
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="np. Rozmowa biznesowa z klientem"/>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Podtytuł
                    </label>
                    <input
                        type="text"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="Krótki opis scenariusza"/>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Opis *
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="Szczegółowy opis scenariusza..."/>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Persona *
                    </label>
                    <div className="w-full px-4 py-2 border border-gray-300 rounded-xl flex justify-between items-center">
                        <span className="text-black">
                            {selectedPersonaName || 'Nie wybrano persony'}
                        </span>
                        <button
                            type="button"
                            onClick={() => setIsPersonaModalOpen(true)}
                            className="px-4 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-md hover:bg-blue-200"
                        >
                            Wybierz
                        </button>
                    </div>
                </div>

                <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateAreas: '"a b" "c c"' }}>
                    <div style={{ gridArea: 'a' }}>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Kategoria *
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleCategoryChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black">
                            <option value="business">Biznes</option>
                            <option value="education">Edukacja</option>
                            <option value="relationships">Relacje</option>
                            <option value="family">Rodzina</option>
                            <option value="dates">Randki</option>
                            <option value="public speaking">Przemówienia</option>
                            <option value="other">Inne</option>
                        </select>
                    </div>

                    <div style={{ gridArea: 'b' }}>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Język
                        </label>
                        <select
                            name="languages"
                            value={formData.languages}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black">
                            <option value="pl">Polski</option>
                            <option value="en">English</option>
                            <option value="de">Deutsch</option>
                            <option value="fr">Français</option>
                        </select>
                    </div>

                    {formData.category === 'other' && (
                        <div style={{ gridArea: 'c' }}>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Własna kategoria *
                            </label>
                            <input
                                type="text"
                                value={customCategory}
                                onChange={(e) => setCustomCategory(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                                placeholder="Wpisz własną kategorię"/>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tagi (oddzielone przecinkami)
                    </label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="np. negocjacje, sprzedaż, prezentacja"/>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cele (oddzielone przecinkami) *
                    </label>
                    <input
                        type="text"
                        name="objectives"
                        value={formData.objectives}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="np. Opanowanie podstaw negocjacji, Nauka małych rozmów"/>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Prompt początkowy *
                    </label>
                    <textarea
                        name="openingPrompt"
                        value={formData.openingPrompt}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="Jak AI ma rozpocząć rozmowę..."/>
                </div>

                {/* <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Prompt końcowy
                    </label>
                    <textarea
                        name="closingPrompt"
                        value={formData.closingPrompt}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="Jak AI ma zakończyć rozmowę..."/>
                </div> */}

                <div className="border-t border-gray-200 pt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Rundy Scenariusza (Podscenariusze)
                    </label>
                    <div className="space-y-2">
                        {formData.rounds.map((round, index) => (
                            <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                                <span className="flex-1 text-sm text-gray-800">{round.prompt}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveRound(index)}
                                    className="p-1 text-red-500 hover:text-red-700"
                                    title="Usuń rundę"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2 mt-3">
                        <input
                            type="text"
                            value={newRoundPrompt}
                            onChange={(e) => setNewRoundPrompt(e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                            placeholder="Wpisz treść nowej rundy..."
                        />
                        <button
                            type="button"
                            onClick={handleAddRound}
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600"
                        >
                            Dodaj
                        </button>
                    </div>
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard/scenarios')}
                        className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition">
                        Anuluj
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                        {isSubmitting ? (editMode ? 'Aktualizowanie...' : 'Tworzenie...') : (editMode ? 'Zaktualizuj scenariusz' : 'Utwórz prywatny scenariusz')}
                    </button>
                </div>
            </form>

            <PersonaSelectionModal
                isOpen={isPersonaModalOpen}
                onClose={() => setIsPersonaModalOpen(false)}
                onPersonaSelect={handlePersonaSelect}
                personas={personas}
                isLoading={personasLoading}
            />
        </div>
    );
}