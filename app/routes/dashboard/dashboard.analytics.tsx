import { useState, useEffect } from 'react';
import { authenticatedFetch } from '../../utils/api';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function meta() {
    return [
        { title: "Analityka - OdpalGadkę" },
        { name: "description", content: "Detailed analytics of your performance" }
    ];
}

interface Trends {
    conversations: number,
    totalLength: number,
    emotionScore: number,
    fluencyScore: number,
    wordingScore: number,
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

type Span = '7d' | '30d' | '1y';

const StatCard = ({ title, value, trend, unit = '' }: { title: string, value: string | number, trend: number | null, unit?: string }) => {
    const hasValidTrend = typeof trend === 'number' && isFinite(trend);
    const isPositive = hasValidTrend && trend >= 0;
    const trendText = hasValidTrend ? `${isPositive ? '+' : ''}${trend.toFixed(1)}%` : 'Brak danych';

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <p className="text-sm font-semibold text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 my-2">{value}{unit}</p>
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

export default function AnalyticsPage() {
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [span, setSpan] = useState<Span>('7d');

    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await authenticatedFetch(`/api/v1/analytics?span=${span}`);
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.error || `Błąd serwera: ${response.status}`);
                }
                const data: AnalyticsData = await response.json();
                setAnalyticsData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Wystąpił nieznany błąd');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [span]);

    const chartData = {
        labels: ['Płynność', 'Słownictwo', 'Emocje'],
        datasets: [
            {
                label: 'Średnie wyniki',
                data: [
                    analyticsData?.analytics.averageFluency ?? 0,
                    analyticsData?.analytics.averageWording ?? 0,
                    analyticsData?.analytics.averageEmotion ?? 0,
                ],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                tension: 0.1
            },
        ],
    };
    
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Średnie wyniki w kategoriach',
                font: {
                    size: 16,
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
            },
        },
    };

    if (loading) {
        return (
            <div className="text-center p-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Ładowanie analityki...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-bold text-red-900">Błąd</h3>
                <p className="text-red-800">{error}</p>
            </div>
        );
    }

    if (!analyticsData) {
        return <div className="text-center p-12">Brak danych do wyświetlenia.</div>;
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* ZMIANA: Ulepszona responsywność nagłówka */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Twoja Analityka</h1>
                    <div className="flex items-center bg-gray-100 p-1 rounded-xl w-full sm:w-auto">
                    {(['7d', '30d', '1y'] as Span[]).map(s => (
                        <button
                            key={s}
                            onClick={() => setSpan(s)}
                            className={`flex-1 sm:flex-none text-center px-3 sm:px-4 py-2 text-sm font-semibold rounded-lg transition ${
                                span === s ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {s === '7d' ? '7 Dni' : s === '30d' ? '30 Dni' : '1 Rok'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                 <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center md:col-span-2 lg:col-span-1">
                    <p className="text-sm font-semibold text-gray-600">Passa treningowa</p>
                    <p className="text-4xl font-bold text-blue-600 my-2">{analyticsData.currentStreak}</p>
                    <p className="text-gray-500 text-sm">dni z rzędu</p>
                </div>
            </div>

            <div className="relative w-full min-h-[300px] max-h-[60vh] sm:aspect-2/1 bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
                <Line options={chartOptions} data={chartData} />
            </div>
        </div>
    );
}