import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { authenticatedFetch } from '../../utils/api';

export function meta() {
    return [
        { title: "Dashboard - OdpalGadkę" },
        { name: "description", content: "Your personal training dashboard" }
    ];
}

interface Trends {
    conversations: number;
    totalLength: number;
    emotionScore: number;
    fluencyScore: number;
    wordingScore: number;
}

interface Analytics {
    conversations: number;
    totalLength: number;
    averageEmotion: number;
    averageFluency: number;
    averageWording: number;
}

interface AnalyticsData {
    trends: Trends;
    currentStreak: number;
    analytics: Analytics;
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

const StatCardSkeleton = () => (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
        <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-32"></div>
    </div>
);

const StatCard = ({ title, value, trend, unit = '' }: { title: string, value: string | number, trend: number | null, unit?: string }) => {
    const hasValidTrend = typeof trend === 'number' && isFinite(trend);
    const isPositive = hasValidTrend && trend >= 0;
    const trendText = hasValidTrend ? `${isPositive ? '+' : ''}${trend.toFixed(1)}%` : 'Brak danych';

    return (
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
            <p className="text-sm font-semibold text-gray-600">{title}</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 my-2">{value}{unit}</p>
            <div className="flex items-center text-sm">
                {hasValidTrend ? (
                    <>
                        <span className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {trendText}
                        </span>
                        <span className="text-gray-500 ml-1">vs poprzedni okres</span>
                    </>
                ) : (
                    <span className="text-gray-500">{trendText}</span>
                )}
            </div>
        </div>
    );
};

const StatsCard = ({ title, value, icon, trend, color }: { title: string, value: string, icon: string, trend: { value: number, isPositive: boolean }, color: string }) => {
    const colorClasses = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        purple: 'bg-purple-500',
        orange: 'bg-orange-500',
    };

    const bgColor = colorClasses[color as keyof typeof colorClasses] || 'bg-gray-500';

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${bgColor} rounded-xl flex items-center justify-center`}>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                    </svg>
                </div>
                <div className={`text-sm font-semibold ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {trend.isPositive ? '+' : ''}{trend.value}%
                </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-600 mb-1">{title}</h3>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">{value}</p>
        </div>
    );
};

export default function Dashboard() {
    const navigate = useNavigate();
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
    const [analyticsLoading, setAnalyticsLoading] = useState(true);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [conversationsLoading, setConversationsLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            setAnalyticsLoading(true);
            try {
                const response = await authenticatedFetch('/api/v1/analytics?span=7d');
                if (response.ok) {
                    const data: AnalyticsData = await response.json();
                    setAnalyticsData(data);
                }
            } catch (err) {
                console.error('Nie udało się pobrać analityki:', err);
            } finally {
                setAnalyticsLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    useEffect(() => {
        const fetchConversations = async () => {
            setConversationsLoading(true);
            try {
                const response = await authenticatedFetch('/api/v1/user/me/conversations?page=1&limit=3');
                if (response.ok) {
                    const data = await response.json();
                    setConversations(data.result);
                }
            } catch (err) {
                console.error('Nie udało się pobrać rozmów:', err);
            } finally {
                setConversationsLoading(false);
            }
        };
        fetchConversations();
    }, []);

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Witaj z powrotem! 👋</h1>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">Oto Twój postęp w treningu komunikacji</p>
                </div>
                <Link to="/dashboard/scenarios" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Nowy Trening</span>
                    </button>
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Twoje statystyki</h2>
                    <Link 
                        to="/dashboard/analytics" 
                        className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                    >
                        Zobacz szczegóły →
                    </Link>
                </div>
                {analyticsLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <StatCardSkeleton />
                        <StatCardSkeleton />
                        <StatCardSkeleton />
                    </div>
                ) : analyticsData ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <StatCard 
                            title="Liczba rozmów" 
                            value={analyticsData.analytics.conversations} 
                            trend={analyticsData.trends.conversations} 
                        />
                        <StatCard 
                            title="Łączny czas rozmów" 
                            value={(analyticsData.analytics.totalLength / 60).toFixed(1)} 
                            trend={analyticsData.trends.totalLength}
                            unit=" min"
                        />
                        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
                            <p className="text-sm font-semibold text-gray-600">Passa treningowa</p>
                            <p className="text-3xl font-bold text-blue-600 my-2">{analyticsData.currentStreak}</p>
                            <p className="text-gray-500 text-sm">dni z rzędu</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-600 text-center py-4">Brak danych do wyświetlenia.</p>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Ostatnie Sesje</h2>
                        <Link to="/dashboard/sessions" className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                            Zobacz wszystkie →
                        </Link>
                    </div>
                    {conversationsLoading ? (
                        <div className="space-y-3 sm:space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="p-3 sm:p-4 bg-gray-100 rounded-xl animate-pulse">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-xl shrink-0"></div>
                                        <div className="flex-1">
                                            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                                            <div className="h-3 bg-gray-200 rounded w-24"></div>
                                        </div>
                                        <div className="w-12 h-8 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : conversations.length > 0 ? (
                        <div className="space-y-3 sm:space-y-4">
                            {conversations.map((conversation) => {
                                const hasStats = conversation.stats && 
                                    typeof conversation.stats.emotionScore === 'number' &&
                                    typeof conversation.stats.fluencyScore === 'number' &&
                                    typeof conversation.stats.wordingScore === 'number';
                                
                                const avgScore = hasStats && conversation.stats
                                    ? ((conversation.stats.emotionScore + conversation.stats.fluencyScore + conversation.stats.wordingScore) / 3).toFixed(0)
                                    : 'N/A';

                                const timeAgo = (date: string) => {
                                    const now = new Date();
                                    const then = new Date(date);
                                    const diffMs = now.getTime() - then.getTime();
                                    const diffMins = Math.floor(diffMs / 60000);
                                    const diffHours = Math.floor(diffMins / 60);
                                    const diffDays = Math.floor(diffHours / 24);

                                    if (diffDays > 0) return `${diffDays} ${diffDays === 1 ? 'dzień' : 'dni'} temu`;
                                    if (diffHours > 0) return `${diffHours} ${diffHours === 1 ? 'godzinę' : 'godzin'} temu`;
                                    if (diffMins > 0) return `${diffMins} ${diffMins === 1 ? 'minutę' : 'minut'} temu`;
                                    return 'przed chwilą';
                                };

                                return (
                                    <div key={conversation._id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow shrink-0">
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                                                {conversation.scenarioData?.title || 'Sesja treningowa'}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-600">{timeAgo(conversation.createdAt)}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <div className={`text-xl sm:text-2xl font-bold ${hasStats ? 'text-blue-600' : 'text-gray-400'}`}>
                                                {avgScore}{hasStats ? '' : ''}
                                            </div>
                                            <p className="text-xs text-gray-500">{hasStats ? 'Średnia' : 'Brak'}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                                </svg>
                            </div>
                            <p className="text-gray-600 text-sm">Brak sesji treningowych</p>
                            <p className="text-gray-500 text-xs mt-1">Rozpocznij swoją pierwszą rozmowę</p>
                        </div>
                    )}
                </div>

                <div className="bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl p-4 sm:p-6 shadow-lg text-white">
                    <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Dzisiejsza Wskazówka</h2>
                    <p className="text-sm sm:text-base text-blue-50 mb-4 sm:mb-6 leading-relaxed">
                        Przykładowy tip: Pamiętaj, aby robić krótkie pauzy między zdaniami. To daje Ci czas na zebranie myśli i sprawia, że brzmisz pewniej.
                    </p>
                    <button className="w-full px-4 py-2.5 sm:py-3 bg-white text-blue-600 text-sm sm:text-base font-semibold rounded-xl hover:shadow-xl transition">
                        Rozpocznij Trening
                    </button>
                </div>
            </div>
        </div>
    );
}