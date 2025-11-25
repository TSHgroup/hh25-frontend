import { useState, useEffect } from 'react';
import { authenticatedFetch } from '../../utils/api';

export function meta() {
    return [
        { title: "Historia Sesji - OdpalGadkę" },
        { name: "description", content: "View your training session history" }
    ];
}

interface TranscriptEntry {
    side: 'AI' | 'user';
    text: string;
    emotions?: string;
}

interface Round {
    roundId: string;
    transcript: TranscriptEntry[];
}

interface Stats {
    emotionScore: number;
    fluencyScore: number;
    wordingScore: number;
}

interface Conversation {
    _id: string;
    user: string;
    scenario: string;
    scenarioData?: {
        _id: string;
        title: string;
        subtitle?: string;
        description?: string;
        category: string;
    };
    rounds: Round[];
    stats?: Stats;
    length: number;
    createdAt: string;
    updatedAt: string;
}

interface ApiResponse {
    result: Conversation[];
    page: number;
    limit: number;
    lastPage: number;
    firstPage: number;
    size: number;
}

type TabType = 'all' | 'recent' | 'best';

const SessionCardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
        <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-6 bg-gray-200 rounded w-40"></div>
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                </div>
                <div className="text-right">
                    <div className="h-8 bg-gray-200 rounded w-12 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-100 rounded-xl">
                    <div className="h-6 bg-gray-200 rounded w-8 mx-auto mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-12 mx-auto"></div>
                </div>
                <div className="text-center p-3 bg-gray-100 rounded-xl">
                    <div className="h-6 bg-gray-200 rounded w-8 mx-auto mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-12 mx-auto"></div>
                </div>
                <div className="text-center p-3 bg-gray-100 rounded-xl">
                    <div className="h-6 bg-gray-200 rounded w-8 mx-auto mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-12 mx-auto"></div>
                </div>
            </div>

            <div className="flex items-center justify-between mb-4">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>

            <div className="h-10 bg-gray-200 rounded-xl"></div>
        </div>
    </div>
);

const ConversationCard = ({ 
    conversation, 
    isExpanded, 
    onToggleExpand 
}: { 
    conversation: Conversation;
    isExpanded: boolean;
    onToggleExpand: () => void;
}) => {
    const hasStats = conversation.stats && 
        typeof conversation.stats.emotionScore === 'number' &&
        typeof conversation.stats.fluencyScore === 'number' &&
        typeof conversation.stats.wordingScore === 'number';
    
    const avgScore = hasStats && conversation.stats
        ? ((conversation.stats.emotionScore + conversation.stats.fluencyScore + conversation.stats.wordingScore) / 3).toFixed(1)
        : 'N/A';

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{conversation.scenarioData?.title || 'Sesja treningowa'}</h3>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg">
                                {conversation.rounds?.length || 0} {(conversation.rounds?.length || 0) === 1 ? 'runda' : 'rund'}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">
                            {new Date(conversation.createdAt).toLocaleDateString('pl-PL', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold text-blue-600">{avgScore}</p>
                        <p className="text-xs text-gray-500">Średnia</p>
                    </div>
                </div>

                {hasStats ? (
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-purple-50 rounded-xl">
                            <p className="text-2xl font-bold text-purple-600">{conversation?.stats?.emotionScore}</p>
                            <p className="text-xs text-gray-600 mt-1">Emocje</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-xl">
                            <p className="text-2xl font-bold text-green-600">{conversation?.stats?.fluencyScore}</p>
                            <p className="text-xs text-gray-600 mt-1">Płynność</p>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-xl">
                            <p className="text-2xl font-bold text-orange-600">{conversation?.stats?.wordingScore}</p>
                            <p className="text-xs text-gray-600 mt-1">Słownictwo</p>
                        </div>
                    </div>
                ) : (
                    <div className="p-4 bg-gray-100 rounded-xl mb-4 text-center">
                        <p className="text-sm text-gray-600">Brak dostępnych statystyk</p>
                    </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{((conversation.length || 0) / 60).toFixed(1)} min</span>
                    </div>
                    <span className="text-xs text-gray-400">ID: {conversation.scenario?.slice(0, 8) || 'N/A'}...</span>
                </div>

                <button
                    onClick={onToggleExpand}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2">
                    <span>{isExpanded ? 'Zwiń szczegóły' : 'Zobacz transkrypcję'}</span>
                    <svg
                        className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {isExpanded && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Transkrypcja rozmowy</h4>
                    <div className="space-y-4">
                        {conversation.rounds.map((round, idx) => (
                            <div key={round.roundId || idx} className="space-y-2">
                                <p className="text-sm font-semibold text-gray-500 uppercase">Runda {idx + 1}</p>
                                {round.transcript.map((entry, entryIdx) => (
                                    <div
                                        key={entryIdx}
                                        className={`p-3 rounded-xl ${
                                            entry.side === 'AI'
                                                ? 'bg-blue-100 text-blue-900'
                                                : 'bg-green-100 text-green-900'
                                        }`}>
                                        <p className="text-xs font-bold mb-1">
                                            {entry.side === 'AI' ? '🤖 AI' : '👤 Ty'}
                                        </p>
                                        <p className="text-sm">{entry.text}</p>
                                        {entry.emotions && (
                                            <p className="text-xs text-gray-600 mt-1">Emocje: {entry.emotions}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default function Sessions() {
    const [activeTab, setActiveTab] = useState<TabType>('all');
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [limit] = useState(10);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const fetchConversations = async (currentPage: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await authenticatedFetch(
                `/api/v1/user/me/conversations?page=${currentPage}&limit=${limit}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Sesja wygasła. Zaloguj się ponownie.');
                }
                throw new Error(`Błąd API: ${response.status}`);
            }

            const data: ApiResponse = await response.json();
            setConversations(data.result);
            setLastPage(data.lastPage);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Wystąpił błąd');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConversations(page);
    }, [page]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= lastPage) {
            setPage(newPage);
        }
    };

    const getFilteredConversations = () => {
        if (activeTab === 'recent') {
            return [...conversations].sort((a, b) => 
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        }
        if (activeTab === 'best') {
            return [...conversations].sort((a, b) => {
                const avgA = a.stats 
                    ? (a.stats.emotionScore + a.stats.fluencyScore + a.stats.wordingScore) / 3 
                    : 0;
                const avgB = b.stats 
                    ? (b.stats.emotionScore + b.stats.fluencyScore + b.stats.wordingScore) / 3 
                    : 0;
                return avgB - avgA;
            });
        }
        return conversations;
    };

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const renderErrorState = () => (
        <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-2xl shadow-lg">
            <div className="flex items-start gap-4">
                <svg className="w-8 h-8 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-red-900 mb-2">Błąd</h3>
                    <p className="text-red-800">{error}</p>
                    <button
                        onClick={() => fetchConversations(page)}
                        className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition">
                        Spróbuj ponownie
                    </button>
                </div>
            </div>
        </div>
    );

    const renderEmptyState = () => (
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Brak sesji treningowych</h2>
            <p className="text-gray-600 mb-6">Rozpocznij swoją pierwszą rozmowę, aby zobaczyć historię tutaj</p>
        </div>
    );

    const filteredConversations = getFilteredConversations();

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Historia Sesji</h1>
                        <p className="text-gray-600 mt-1">Zobacz historię swoich treningów i postępy</p>
                    </div>
                </div>

                <div className="flex gap-2 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-6 py-3 text-sm font-semibold transition ${
                            activeTab === 'all'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}>
                        Wszystkie
                    </button>
                    <button
                        onClick={() => setActiveTab('recent')}
                        className={`px-6 py-3 text-sm font-semibold transition ${
                            activeTab === 'recent'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}>
                        Najnowsze
                    </button>
                    <button
                        onClick={() => setActiveTab('best')}
                        className={`px-6 py-3 text-sm font-semibold transition ${
                            activeTab === 'best'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}>
                        Najlepsze
                    </button>
                </div>
            </div>

            <div>
                {loading && (
                    <div className="space-y-4">
                        {[...Array(limit)].map((_, i) => (
                            <SessionCardSkeleton key={i} />
                        ))}
                    </div>
                )}
                {error && !loading && renderErrorState()}
                {!loading && !error && (
                    <>
                        {filteredConversations.length === 0 ? (
                            renderEmptyState()
                        ) : (
                            <>
                                <div className="space-y-4">
                                    {filteredConversations.map((conversation) => (
                                        <ConversationCard
                                            key={conversation._id}
                                            conversation={conversation}
                                            isExpanded={expandedId === conversation._id}
                                            onToggleExpand={() => toggleExpand(conversation._id)}
                                        />
                                    ))}
                                </div>

                                {lastPage > 1 && (
                                    <div className="flex justify-center items-center gap-4 mt-8">
                                        <button
                                            onClick={() => handlePageChange(page - 1)}
                                            disabled={page <= 1}
                                            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition">
                                            ← Poprzednia
                                        </button>
                                        <span className="px-6 py-3 text-gray-700 font-medium">
                                            Strona {page} z {lastPage}
                                        </span>
                                        <button
                                            onClick={() => handlePageChange(page + 1)}
                                            disabled={page >= lastPage}
                                            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition">
                                            Następna →
                                        </button>
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