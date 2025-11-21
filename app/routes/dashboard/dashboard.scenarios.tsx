import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router';
import { authenticatedFetch } from '../../utils/api';

export function meta() {
    return [
        { title: "Moje scenariusze - OdpalGadke"},
        { name: "description", content: "Browse and manage your conversation scenarios" }
    ]
}

interface Scenario {
    _id: string;
    title: string;
    subtitle: string;
    description: string;
    category: string;
    tags: string[];
    languages: string[];
    status: string;
    objectives: string[];
    persona: string;
    openingPrompt: string;
    closingPrompt: string;
    provider: string;
    model: string;
    createdBy: string;
    lastUpdatedAt: string;
    ai: { provider: string; model: string };
    rounds: any[];
    createdAt: string;
    isPrivate?: boolean;
}

interface ApiResponse {
    result: Scenario[];
    page: number;
    limit: number;
    lastPage: number;
    firstPage: number;
    size: number;
}

type TabType = 'all' | 'my';

export default function Scenarios(){
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabType>('all');

    const [allScenarios, setAllScenarios] = useState<Scenario[]>([]);
    const [allLoading, setAllLoading] = useState(true);
    const [allError, setAllError] = useState<string | null>(null);
    const [allPage, setAllPage] = useState(1);
    const [allLastPage, setAllLastPage] = useState(1);

    const [myScenarios, setMyScenarios] = useState<Scenario[]>([]);
    const [myLoading, setMyLoading] = useState(false);
    const [myError, setMyError] = useState<string | null>(null);

    const [limit] = useState(12);

    const fetchAllScenarios = async(currentPage: number) => {
        setAllLoading(true);
        setAllError(null);
        
        try {
            const response = await authenticatedFetch(`/api/v1/scenario?page=${currentPage}&limit=${limit}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok){
                if(response.status === 401){
                    throw new Error('Sesja wygasła. Zaloguj się ponownie.');
                }
                throw new Error(`Błąd api: ${response.status}`)
            }

            const data: ApiResponse = await response.json();

            setAllScenarios(data.result);
            setAllLastPage(data.lastPage);
        } catch(err){
            setAllError(err instanceof Error ? err.message : 'Wystąpił błąd');
        } finally{
            setAllLoading(false);
        }
    };

    const fetchMyScenarios = async () => {
        setMyLoading(true);
        setMyError(null);

        try {
            const response = await authenticatedFetch('/api/v1/scenario/user/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Sesja wygasła. Zaloguj się ponownie.');
                }
                throw new Error(`Błąd API: ${response.status} ${response.statusText}`);
            }

            const data: Scenario[] = await response.json();
            setMyScenarios(data);
            
        } catch (err) {
            setMyError(err instanceof Error ? err.message : 'Wystąpił błąd podczas ładowania Twoich scenariuszy.');
        } finally {
            setMyLoading(false);
        }
    };

    useEffect(() => {
        fetchAllScenarios(allPage);
    }, [allPage]);

    useEffect(() => {
        if(activeTab === 'my'){
            fetchMyScenarios();
        }
    }, [activeTab]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= allLastPage){
            setAllPage(newPage);
        }
    }

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
    }

    const handleDeleteScenario = async (scenarioId: string) => {
        if (!confirm('Czy na pewno chcesz usunąć ten scenariusz?')) return;

        try {
            const response = await authenticatedFetch(`/api/v1/scenario/${scenarioId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Nie udało się usunąć scenariusza');
            }

            alert('Scenariusz został usunięty');
            
            if (activeTab === 'my') {
                fetchMyScenarios();
            } else {
                fetchAllScenarios(allPage);
            }
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Wystąpił błąd');
        }
    };

    const handleEditScenario = (scenarioId: string) => {
        navigate('/dashboard/scenario-creator', { 
            state: { 
                scenarioId,
                editMode: true
            } 
        });
    };

    const handleStartScenario = (scenarioId: string) => {
        navigate(`/dashboard/conversation/${scenarioId}`);
    };

    const renderScenarioCard = (scenario: Scenario, isUserScenario: boolean = false) => (
        <div key={scenario._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
            <div className="p-4 sm:p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 flex-1">
                        {scenario.title}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                        {(scenario.isPrivate || isUserScenario) && (
                            <span className="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-lg whitespace-nowrap flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                                </svg>
                                Prywatny
                            </span>
                        )}
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
                            scenario.status === 'editing' ? 'bg-yellow-100 text-yellow-700' :
                            scenario.status === 'published' ? 'bg-green-100 text-green-700' :
                            scenario.status === 'deleted' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'}`}>
                            {scenario.status}
                        </span>
                    </div>
                </div>

                {scenario.subtitle && (
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
                        {scenario.subtitle}
                    </p>
                )}
                
                <p className="text-xs sm:text-sm text-gray-700 mb-4 line-clamp-3 flex-1">
                    {scenario.description}
                </p>
                
                <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-2">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap pt-0.5">
                            Kategoria:
                        </span>
                        <span className="inline-flex px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                            {scenario.category}
                        </span>
                    </div>

                    {scenario.tags && scenario.tags.length > 0 && (
                        <div className="flex items-start gap-2">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap pt-0.5">
                                Tagi:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {scenario.tags.slice(0, 3).map((tag, i) => (
                                    <span key={i} className="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                                        #{tag}
                                    </span>
                                ))}
                                {scenario.tags.length > 3 && (
                                    <span className="px-2.5 py-0.5 text-gray-500 text-xs">
                                        +{scenario.tags.length - 3}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                    </svg>
                    <span className="uppercase font-semibold">
                        {scenario.languages.join(', ')}
                    </span>
                </div>
                
                <div className="text-xs text-gray-500 border-t border-gray-200 pt-3 mb-4">
                    <p>Utworzono: {new Date(scenario.createdAt).toLocaleDateString('pl-PL')}</p>
                    <p>Ostatnia aktualizacja: {new Date(scenario.lastUpdatedAt).toLocaleDateString('pl-PL')}</p>
                </div>

                <div className="flex gap-2">
                    <button 
                        onClick={() => handleStartScenario(scenario._id)}
                        className="flex-1 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
                        Rozpocznij
                    </button>
                    {isUserScenario && (
                        <>
                            <button 
                                onClick={() => handleEditScenario(scenario._id)}
                                className="px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition"
                                title="Edytuj scenariusz">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                                </svg>
                            </button>
                            <button 
                                onClick={() => handleDeleteScenario(scenario._id)}
                                className="px-4 py-2.5 bg-red-100 text-red-600 font-semibold rounded-xl hover:bg-red-200 transition"
                                title="Usuń scenariusz">
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
    
    const renderEmptyState = (isUserScenarios: boolean) => (
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg border border-gray-100 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {isUserScenarios ? 'Nie masz jeszcze własnych scenariuszy' : 'Brak scenariuszy'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
                {isUserScenarios 
                    ? 'Stwórz własny prywatny scenariusz dopasowany do Twoich potrzeb. Tylko Ty będziesz mógł go zobaczyć i używać.'
                    : 'Nie znaleziono żadnych scenariuszy'}
            </p>
            {isUserScenarios && (
                <button 
                    onClick={() => navigate('/dashboard/scenario-creator')}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                    + Stwórz nowy scenariusz
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
            <p className="text-gray-600 text-base sm:text-lg">Ładowanie scenariuszy...</p>
        </div>
    );

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Scenariusze</h1>
                            <p className="text-sm sm:text-base text-gray-600 mt-1">Wybierz scenariusz i zacznij trening</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate('/dashboard/scenario-creator')}
                        className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white text-sm sm:text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="hidden sm:inline">+ Nowy prywatny scenariusz</span>
                        <span className="sm:hidden">+ Nowy scenariusz</span>
                    </button>
                </div>

                <div className="flex gap-1 sm:gap-2 border-b border-gray-200 overflow-x-auto">
                    <button
                        onClick={() => handleTabChange('all')}
                        className={`px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold transition whitespace-nowrap ${
                            activeTab === 'all'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}>
                        Wszystkie scenariusze
                    </button>
                    <button
                        onClick={() => handleTabChange('my')}
                        className={`px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold transition flex items-center gap-2 whitespace-nowrap ${
                            activeTab === 'my'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="hidden sm:inline">Moje prywatne scenariusze</span>
                        <span className="sm:hidden">Moje scenariusze</span>
                        {myScenarios.length > 0 && (
                            <span className="px-2 py-0.5 sm:py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
                                {myScenarios.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            <div>
                {activeTab === 'all' ? (
                    <>
                        {allLoading && renderLoadingState()}
                        {allError && !allLoading && renderErrorState(allError, () => fetchAllScenarios(allPage))}
                        {!allLoading && !allError && (
                            <>
                                {allScenarios.length === 0 ? (
                                    renderEmptyState(false)
                                ) : (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                                            {allScenarios.map((scenario) => renderScenarioCard(scenario, false))}
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
                ) : (
                    <>
                        {myLoading && renderLoadingState()}
                        {myError && !myLoading && renderErrorState(myError, fetchMyScenarios)}
                        {!myLoading && !myError && (
                            <>
                                {myScenarios.length === 0 ? (
                                    renderEmptyState(true)
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                                        {myScenarios.map((scenario) => renderScenarioCard(scenario, true))}
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}