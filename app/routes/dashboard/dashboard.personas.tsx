import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { authenticatedFetch } from '../../utils/api';

export function meta() {
    return [
        { title: "Persony - OdpalGadkę" },
        { name: "description", content: "Browse and manage your personas" }
    ];
}

interface Persona {
    _id: string;
    createdBy: string;
    public: boolean;
    name: string;
    role: string;
    personality: string;
    voice: string;
    responseStyle: string;
    informations: string;
    emotionModel: {
        baseline: string;
        adapt: boolean;
    };
    maxResponseTokens: number;
    createdAt: string;
}

interface ApiResponse {
    result: Persona[];
    page: number;
    limit: number;
    lastPage: number;
    firstPage: number;
    size: number;
}

type TabType = 'all' | 'my' | 'create';

export default function Person() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabType>('all');

    const [allPersonas, setAllPersonas] = useState<Persona[]>([]);
    const [allLoading, setAllLoading] = useState(true);
    const [allError, setAllError] = useState<string | null>(null);
    const [allPage, setAllPage] = useState(1);
    const [allLastPage, setAllLastPage] = useState(1);

    const [myPersonas, setMyPersonas] = useState<Persona[]>([]);
    const [myLoading, setMyLoading] = useState(false);
    const [myError, setMyError] = useState<string | null>(null);

    const [limit] = useState(12);

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        personality: '',
        voice: 'Puck',
        responseStyle: 'conversational',
        informations: '',
        model: 'neutral',
        adapt: true,
        public: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);
    const { personaId } = useParams(); 
    const editMode = !!personaId;
    const [formLoading, setFormLoading] = useState(editMode);

    const fetchAllPersonas = async (currentPage: number) => {
        setAllLoading(true);
        setAllError(null);

        try {
            const response = await authenticatedFetch(`/api/v1/persona?page=${currentPage}&limit=${limit}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Sesja wygasła. Zaloguj się ponownie.');
                }
                throw new Error(`Błąd API: ${response.status}`);
            }

            const data: ApiResponse = await response.json();
            setAllPersonas(data.result);
            setAllLastPage(data.lastPage);
        } catch (err) {
            setAllError(err instanceof Error ? err.message : 'Wystąpił błąd');
        } finally {
            setAllLoading(false);
        }
    };

    const fetchMyPersonas = async () => {
        setMyLoading(true);
        setMyError(null);

        try {
            const response = await authenticatedFetch('/api/v1/persona/user/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Sesja wygasła. Zaloguj się ponownie.');
                }
                throw new Error(`Błąd API: ${response.status}`);
            }

            const data: Persona[] = await response.json();
            setMyPersonas(data);
        } catch (err) {
            setMyError(err instanceof Error ? err.message : 'Wystąpił błąd podczas ładowania Twoich person.');
        } finally {
            setMyLoading(false);
        }
    };

    const handleDeletePersona = async (personaId: string) => {
        if (!confirm('Czy na pewno chcesz usunąć tę personę?')) return;

        try {
            const response = await authenticatedFetch(`/api/v1/persona/${personaId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Nie udało się usunąć persony');
            }

            alert('Persona została usunięta');
            if (activeTab === 'my') {
                fetchMyPersonas();
            } else {
                fetchAllPersonas(allPage);
            }
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Wystąpił błąd');
        }
    };

    const handleTogglePublic = async (personaId: string, currentPublic: boolean) => {
        try {
            const endpoint = currentPublic 
                ? `/api/v1/persona/${personaId}/publish`
                : `/api/v1/persona/${personaId}/publish`;
            
            const method = currentPublic ? 'DELETE' : 'POST';

            const response = await authenticatedFetch(endpoint, { method });

            if (!response.ok) {
                throw new Error('Nie udało się zmienić statusu persony');
            }

            alert(currentPublic ? 'Persona została ukryta' : 'Persona została opublikowana');
            if (activeTab === 'my') {
                fetchMyPersonas();
            } else {
                fetchAllPersonas(allPage);
            }
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Wystąpił błąd');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setCreateError(null);

        const payload = {
            ...formData,
            maxResponseTokens: 150,
        };

        const url = editMode ? `/api/v1/persona/${personaId}` : '/api/v1/persona';
        const method = editMode ? 'PUT' : 'POST';

        console.log('Creating persona with payload:', payload);

        try {
            const response = await authenticatedFetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                const errorData = JSON.parse(errorText).catch(() => ({ error: `HTTP ${response.status}` }));
                throw new Error(errorData.error || errorData.message || `HTTP ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Success response:', responseData);

            // If user wanted it public, publish it immediately
            if (formData.public && responseData._id) {
                console.log('Publishing persona...');
                const publishResponse = await authenticatedFetch(`/api/v1/persona/${responseData._id}/publish`, {
                    method: 'POST',
                });
                
                if (publishResponse.ok) {
                    console.log('Persona published successfully');
                } else {
                    console.warn('Failed to publish persona, but it was created');
                }
            }

            alert((editMode)? 'Pomyślnie zaaktualizowano personę!' : 'Persona została pomyślnie utworzona!');
            
            setFormData({
                name: '',
                role: '',
                personality: '',
                voice: 'Puck',
                responseStyle: 'conversational',
                informations: '',
                model: 'neutral',
                adapt: true,
                public: false,
            });

            // Refresh the appropriate tab
            if (editMode) {
                navigate(`/dashboard/personas`)
            }
            if (formData.public) {
                setActiveTab('all');
                fetchAllPersonas(1);
            } else {
                // Since /user/me endpoint doesn't work, go to all personas
                setActiveTab('all');
                fetchAllPersonas(1);
            }
        } catch (err) {
            console.error('Submit error:', err);
            setCreateError(err instanceof Error ? err.message : 'Wystąpił błąd');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'all') {
            fetchAllPersonas(allPage);
        } else if (activeTab === 'my') {
            fetchMyPersonas();
        }
    }, [activeTab, allPage]);

    useEffect(() => {
        if (editMode && personaId) {
            const fetchPersonaData = async () => {
                setFormLoading(true);
                setCreateError(null);
                try {
                    const response = await authenticatedFetch(`/api/v1/persona/${personaId}`);
                    
                    if (!response.ok) {
                        console.error('Failed to fetch scenario. Status:', response.status);
                        throw new Error('Nie udało się załadować danych scenariusza.');
                    }
                    
                    const data = await response.json();

                    setFormData({
                        name: data.name || '',
                        role: data.role || '',
                        personality: data.personality || '',
                        voice: data.voice || 'Puck',
                        responseStyle: data.responseStyle || 'conversational',
                        informations: data.informations || '',
                        model: data.model || 'neutral',
                        adapt: data.adapt || true,
                        public: data.public || false,
                    });

                } catch (err) {
                    console.error('Error in fetchPersonaData:', err);
                    setCreateError(err instanceof Error ? err.message : 'Wystąpił błąd');
                } finally {
                    setFormLoading(false);
                }
            };

            fetchPersonaData();
            setActiveTab('create')
        }
        else{
            setActiveTab('all')
        }
    }, [personaId, editMode]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= allLastPage) {
            setAllPage(newPage);
        }
    };

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
    };

    const handleUsePerson = (personalId: string) => {
        navigate('/dashboard/scenarios', {
            state: { 
                selectedPersonaId: personalId,
                highlightNewScenario: true 
            } 
        })
    }

    const renderPersonaCard = (persona: Persona, isUserPersona: boolean = false) => (
        <div key={persona._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
            <div className="p-4 sm:p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 flex-1">
                        {persona.name}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                        {persona.public ? (
                            <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-lg whitespace-nowrap flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                                </svg>
                                Publiczna
                            </span>
                        ) : (
                            <span className="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-lg whitespace-nowrap flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                                </svg>
                                Prywatna
                            </span>
                        )}
                    </div>
                </div>

                <p className="text-sm text-blue-600 font-semibold mb-3">
                    {persona.role}
                </p>

                <p className="text-xs sm:text-sm text-gray-700 mb-4 line-clamp-3 flex-1">
                    {persona.personality}
                </p>

                <div className="space-y-2 mb-4 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                        </svg>
                        <span>Głos: {persona.voice}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                        </svg>
                        <span>Styl: {persona.responseStyle}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>Emocje: {persona.emotionModel.baseline} {persona.emotionModel.adapt ? '(adaptacyjne)' : ''}</span>
                    </div>
                </div>

                <div className="text-xs text-gray-500 border-t border-gray-200 pt-3 mb-4">
                    <p>Utworzono: {new Date(persona.createdAt).toLocaleDateString('pl-PL')}</p>
                </div>

                <div className="flex gap-2">
                    <button 
                        onClick={() => handleUsePerson(persona._id)}
                        className="flex-1 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
                        Użyj persony
                    </button>
                    {isUserPersona && (
                        <>
                            <button 
                                onClick={() => handleTogglePublic(persona._id, persona.public)}
                                className="px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition"
                                title={persona.public ? 'Ukryj' : 'Opublikuj'}>
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {persona.public ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                    )}
                                </svg>
                            </button>
                            <button 
                                onClick={() => navigate(`/dashboard/personas/${persona._id}`)}
                                className="px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition"
                                title="Edytuj">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                                </svg>
                            </button>
                            <button 
                                onClick={() => handleDeletePersona(persona._id)}
                                className="px-4 py-2.5 bg-red-100 text-red-600 font-semibold rounded-xl hover:bg-red-200 transition"
                                title="Usuń">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    const renderEmptyState = (isUserPersonas: boolean) => (
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg border border-gray-100 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {isUserPersonas ? 'Nie masz jeszcze własnych person' : 'Brak person'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
                {isUserPersonas
                    ? 'Stwórz własną personę AI dopasowaną do Twoich potrzeb.'
                    : 'Nie znaleziono żadnych person'}
            </p>
            {isUserPersonas && (
                <button
                    onClick={() => setActiveTab('create')}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                    + Stwórz nową personę
                </button>
            )}
        </div>
    );

    const renderErrorState = (error: string, onRetry: () => void) => (
        <div className="bg-red-50 border-l-4 border-red-600 p-4 sm:p-6 rounded-2xl shadow-lg">
            <div className="flex items-start gap-3 sm:gap-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-red-900 mb-2">Błąd</h3>
                    <p className="text-sm sm:text-base text-red-800">{error}</p>
                    <button
                        onClick={onRetry}
                        className="mt-4 px-4 sm:px-6 py-2 bg-red-600 text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-red-700 transition">
                        Spróbuj ponownie
                    </button>
                </div>
            </div>
        </div>
    );

    const renderLoadingState = () => (
        <div className="text-center py-8 sm:py-12">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-base sm:text-lg">Ładowanie person...</p>
        </div>
    );

    const renderCreateForm = () => (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                {createError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                        <p className="font-semibold">Błąd tworzenia persony:</p>
                        <p className="text-sm mt-1">{createError}</p>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Imię *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="np. Anna"/>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Rola *</label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="np. Trener biznesowy"/>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Osobowość *</label>
                    <textarea
                        name="personality"
                        value={formData.personality}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="Opisz osobowość persony..."/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Głos</label>
                        <input
                            type="text"
                            name="voice"
                            value={formData.voice}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                            placeholder="np. Puck"/>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Styl odpowiedzi</label>
                        <input
                            type="text"
                            name="responseStyle"
                            value={formData.responseStyle}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                            placeholder="np. conversational"/>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Dodatkowe informacje</label>
                    <textarea
                        name="informations"
                        value={formData.informations}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="Dodatkowe szczegóły o personie..."/>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Model emocji</label>
                    <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="np. neutral"/>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="adapt"
                        checked={formData.adapt}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 rounded"/>
                    <label className="text-sm font-semibold text-gray-700">Adaptacyjny model emocji</label>
                </div>
                
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="public"
                        checked={formData.public}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 rounded"/>
                    <label className="text-sm font-semibold text-gray-700">Persona publiczna (widoczna dla wszystkich)</label>
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={() => setActiveTab('my')}
                        className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition">
                        Anuluj
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                        {(editMode)? 
                        (isSubmitting ? 'Aktualizacja...' : 'Zaaktualizuj personę') 
                        : (isSubmitting ? 'Tworzenie...' : 'Utwórz personę')}
                    </button>
                </div>
            </form>
        </div>
    );

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Persony AI</h1>
                            <p className="text-sm sm:text-base text-gray-600 mt-1">Zarządzaj swoimi personami konwersacyjnymi</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-1 sm:gap-2 border-b border-gray-200 overflow-x-auto">
                    <button
                        onClick={() => handleTabChange('all')}
                        className={`px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold transition whitespace-nowrap ${
                            activeTab === 'all'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}>
                        Wszystkie persony
                    </button>
                    <button
                        onClick={() => handleTabChange('my')}
                        className={`px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold transition flex items-center gap-2 whitespace-nowrap ${
                            activeTab === 'my'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                        </svg>
                        <span className="hidden sm:inline">Moje persony</span>
                        <span className="sm:hidden">Moje</span>
                        {myPersonas.length > 0 && (
                            <span className="px-2 py-0.5 sm:py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
                                {myPersonas.length}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => handleTabChange('create')}
                        className={`ml-auto px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold transition flex items-center gap-2 whitespace-nowrap ${
                            activeTab === 'create'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                        </svg>
                        Stwórz personę
                    </button>
                </div>
            </div>

            <div>
                {activeTab === 'all' ? (
                    <>
                        {allLoading && renderLoadingState()}
                        {allError && !allLoading && renderErrorState(allError, () => fetchAllPersonas(allPage))}
                        {!allLoading && !allError && (
                            <>
                                {allPersonas.length === 0 ? (
                                    renderEmptyState(false)
                                ) : (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                                            {allPersonas.map((persona) => renderPersonaCard(persona, false))}
                                        </div>

                                        {allLastPage > 1 && (
                                            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                                                <button
                                                    onClick={() => handlePageChange(allPage - 1)}
                                                    disabled={allPage <= 1}
                                                    className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-200 text-gray-700 text-sm sm:text-base font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition">
                                                    ← Poprzednia
                                                </button>
                                                <span className="px-4 sm:px-6 py-2.5 sm:py-3 text-gray-700 text-sm sm:text-base font-medium">
                                                    Strona {allPage} z {allLastPage}
                                                </span>
                                                <button
                                                    onClick={() => handlePageChange(allPage + 1)}
                                                    disabled={allPage >= allLastPage}
                                                    className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-200 text-gray-700 text-sm sm:text-base font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition">
                                                    Następna →
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </>
                ) : activeTab === 'my' ? (
                    <>
                        {myLoading && renderLoadingState()}
                        {myError && !myLoading && renderErrorState(myError, fetchMyPersonas)}
                        {!myLoading && !myError && (
                            <>
                                {myPersonas.length === 0 ? (
                                    renderEmptyState(true)
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                                        {myPersonas.map((persona) => renderPersonaCard(persona, true))}
                                    </div>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    renderCreateForm()
                )}
            </div>
        </div>
    );
}