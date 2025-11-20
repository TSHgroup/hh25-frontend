import { useState, useEffect } from 'react';
import { authenticatedFetch } from '../../utils/api';
import { useNavigate, useLocation } from 'react-router';

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
}

export default function ScenarioCreator() {
    const navigate = useNavigate();
    const location = useLocation();

    const scenarioId = location.state?.scenarioId;
    const editMode = location.state?.editMode || false;
    const personaIdFromNav = location.state?.personaId;

    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        description: '',
        category: 'business',
        tags: '',
        languages: 'pl',
        objectives: '',
        persona: 'd5aA2CdBa6d56039aA4790B0',
        openingPrompt: '',
        closingPrompt: '',
    });

    // const [personas, setPersonas] = useState<Persona[]>([]);
    // const [personasLoading, setPersonasLoading] = useState(true);
    const [customCategory, setCustomCategory] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(editMode);
    const [error, setError] = useState<string | null>(null);

    //Ftching personas is not working due to endpoint '/api/v1/persona/user/me'
    // useEffect(() => {
    //     const fetchPersonas = async () => {
    //         setPersonasLoading(true);
    //         try {
    //             const response = await authenticatedFetch('/api/v1/persona/user/me');
    //             if (!response.ok) {
    //                 throw new Error('Nie udało się załadować listy person.');
    //             }
    //             const data = await response.json();
                
    //             console.log("Data received from /api/v1/persona/user/me:", data);

    //             const personaList = data.result || data;
    //             setPersonas(Array.isArray(personaList) ? personaList : []);

    //         } catch (err) {
    //             console.error("Error fetching personas:", err);
    //             setPersonas([]); 
    //         } finally {
    //             setPersonasLoading(false);
    //         }
    //     };
    //     fetchPersonas();
    // }, []);

    useEffect(() => {
        if (editMode && scenarioId) {
            const fetchScenarioData = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    console.log(`Fetching data for scenario ID: ${scenarioId}`);
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
                        persona: data.persona || 'd5aA2CdBa6d56039aA4790B0',
                        openingPrompt: data.openingPrompt || '',
                        closingPrompt: data.closingPrompt || '',
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        if (!formData.persona) {
            setError('Musisz wybrać personę.');
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
                closingPrompt: formData.closingPrompt,
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
                <button 
                    onClick={() => navigate('/dashboard/scenarios')}
                    className="text-gray-500 hover:text-gray-700 transition">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
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

                {/* <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Persona *
                    </label>
                    <select
                        name="persona"
                        value={formData.persona}
                        onChange={handleChange}
                        required
                        disabled={personasLoading}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black disabled:bg-gray-100">
                        {personasLoading ? (
                            <option>Ładowanie person...</option>
                        ) : (
                            <>
                                <option value="">Wybierz personę</option>
                                {personas.map(p => (
                                    <option key={p._id} value={p._id}>
                                        {p.name} ({p.role})
                                    </option>
                                ))}
                            </>
                        )}
                    </select>
                </div> */}

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
                            <option value="business">Business</option>
                            <option value="education">Education</option>
                            <option value="relationships">Relationships</option>
                            <option value="family">Family</option>
                            <option value="dates">Dates</option>
                            <option value="public speaking">Public Speaking</option>
                            <option value="other">Other</option>
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
                        Cele (oddzielone przecinkami)
                    </label>
                    <input
                        type="text"
                        name="objectives"
                        value={formData.objectives}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="np. Opanowanie podstaw negocjacji, Nauka małych rozmów"/>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Prompt początkowy
                    </label>
                    <textarea
                        name="openingPrompt"
                        value={formData.openingPrompt}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="Jak AI ma rozpocząć rozmowę..."/>
                </div>

                <div>
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
        </div>
    );
}