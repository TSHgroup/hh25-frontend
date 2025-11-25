import { useState, useEffect } from 'react';
import { authenticatedFetch } from '../../utils/api';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, RadialLinearScale, Filler, BarController } from 'chart.js';
import { Radar, Chart } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, BarController, RadialLinearScale, Title, Tooltip, Legend, Filler);

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

const SkeletonMetricCard = () => (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-28"></div>
            <div className="h-9 bg-gray-200 rounded w-24"></div>
            <div className="h-3 bg-gray-200 rounded w-36"></div>
        </div>
    </div>
);

const SkeletonStreakCard = () => (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center md:col-span-2 lg:col-span-1">
        <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
            <div className="h-11 bg-gray-200 rounded w-20 mx-auto"></div>
            <div className="h-3 bg-gray-200 rounded w-24 mx-auto"></div>
        </div>
    </div>
);

const SkeletonChart = () => (
    <div className="relative w-full min-h-[300px] bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="animate-pulse h-full flex flex-col">
            <div className="h-6 bg-gray-200 rounded w-52 mb-8 mx-auto"></div>
            <div className="flex-1 flex items-end justify-around gap-8 pb-4">
                <div className="flex-1 bg-gray-200 rounded-t-lg" style={{ height: '65%' }}></div>
                <div className="flex-1 bg-gray-200 rounded-t-lg" style={{ height: '82%' }}></div>
                <div className="flex-1 bg-gray-200 rounded-t-lg" style={{ height: '48%' }}></div>
            </div>
            <div className="flex justify-around pt-4 border-t border-gray-200">
                <div className="h-3 bg-gray-200 rounded w-20"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
        </div>
    </div>
);

const SkeletonRadarChart = () => (
    <div className="relative w-full min-h-[300px] bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="animate-pulse h-full flex flex-col">
            <div className="h-6 bg-gray-200 rounded w-52 mb-8 mx-auto"></div>
            <div className="flex-1 flex items-center justify-center">
                <div className="relative w-48 h-48">
                    <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                    <div className="absolute inset-8 border-4 border-gray-200 rounded-full"></div>
                    <div className="absolute inset-16 border-4 border-gray-200 rounded-full"></div>
                </div>
            </div>
        </div>
    </div>
);

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

    const radarData = {
        labels: ['Płynność', 'Słownictwo', 'Emocje'],
        datasets: [
            {
                label: 'Średni wynik',
                data: [56, 62, 59],
                borderColor: 'rgba(34, 197, 94, 0.8)',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0,
            },
            {
                label: 'Obecne wyniki',
                data: [
                    analyticsData?.analytics.averageFluency ?? 0,
                    analyticsData?.analytics.averageWording ?? 0,
                    analyticsData?.analytics.averageEmotion ?? 0,
                ],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderWidth: 2,
                pointBackgroundColor: 'rgb(59, 130, 246)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(59, 130, 246)',
            },
        ],
    };
    
    const radarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Twoje wyniki vs Średnia',
                font: {
                    size: 16,
                }
            },
        },
        scales: {
            r: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    stepSize: 20,
                },
            },
        },
    };

    const mixedChartData = {
        labels: ['Emocje', 'Płynność', 'Słownictwo'],
        datasets: [
            {
                type: 'bar' as const,
                label: 'Obecne wartości',
                data: [
                    analyticsData?.analytics.averageEmotion ?? 0,
                    analyticsData?.analytics.averageFluency ?? 0,
                    analyticsData?.analytics.averageWording ?? 0,
                ],
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 1,
                yAxisID: 'y',
            },
            {
                type: 'line' as const,
                label: 'Trend (%)',
                data: [
                    analyticsData?.trends.fluencyScore ?? 0,
                    analyticsData?.trends.wordingScore ?? 0,
                    analyticsData?.trends.emotionScore ?? 0,
                ],
                borderColor: 'rgb(34, 197, 94)',
                backgroundColor: 'rgba(34, 197, 94, 0.5)',
                borderWidth: 2,
                tension: 0.4,
                yAxisID: 'y1',
                pointRadius: 5,
                pointHoverRadius: 7,
            },
        ],
    };
    
    const mixedChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Wyniki i trendy',
                font: {
                    size: 16,
                }
            },
        },
        scales: {
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Wynik',
                },
            },
            y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                min: 0,
                max: 100,
                title: {
                    display: true,
                    text: 'Trend (%)',
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    if (loading) {
        return (
            <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Twoja Analityka</h1>
                    <div className="flex items-center bg-gray-100 p-1 rounded-xl w-full sm:w-auto">
                        {(['7d', '30d', '1y'] as Span[]).map(s => (
                            <button
                                key={s}
                                onClick={() => setSpan(s)}
                                className={`flex-1 sm:flex-none text-center px-3 sm:px-4 py-2 text-sm font-semibold rounded-lg transition ${
                                    span === s ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:bg-gray-200'
                                }`}>
                                {s === '7d' ? '7 Dni' : s === '30d' ? '30 Dni' : '1 Rok'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <SkeletonMetricCard />
                    <SkeletonMetricCard />
                    <SkeletonStreakCard />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <SkeletonRadarChart />
                    <SkeletonChart />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Twoja Analityka</h1>
                    <div className="flex items-center bg-gray-100 p-1 rounded-xl w-full sm:w-auto">
                        {(['7d', '30d', '1y'] as Span[]).map(s => (
                            <button
                                key={s}
                                onClick={() => setSpan(s)}
                                className={`flex-1 sm:flex-none text-center px-3 sm:px-4 py-2 text-sm font-semibold rounded-lg transition ${
                                    span === s ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:bg-gray-200'
                                }`}>
                                {s === '7d' ? '7 Dni' : s === '30d' ? '30 Dni' : '1 Rok'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-2xl shadow-lg">
                    <div className="flex items-start gap-4">
                        <svg className="w-8 h-8 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-red-900 mb-2">Błąd ładowania danych</h3>
                            <p className="text-red-800">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition">
                                Odśwież stronę
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!analyticsData) {
        return <div className="text-center p-12">Brak danych do wyświetlenia.</div>;
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Twoja Analityka</h1>
                    <div className="flex items-center bg-gray-100 p-1 rounded-xl w-full sm:w-auto">
                    {(['7d', '30d', '1y'] as Span[]).map(s => (
                        <button
                            key={s}
                            onClick={() => setSpan(s)}
                            className={`flex-1 sm:flex-none text-center px-3 sm:px-4 py-2 text-sm font-semibold rounded-lg transition ${
                                span === s ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:bg-gray-200'
                            }`}>
                            {s === '7d' ? '7 Dni' : s === '30d' ? '30 Dni' : '1 Rok'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <StatCard 
                    title="Liczba rozmów" 
                    value={analyticsData.analytics.conversations} 
                    trend={analyticsData.trends.conversations} />
                <StatCard 
                    title="Łączny czas rozmów" 
                    value={(analyticsData.analytics.totalLength / 60).toFixed(1)} 
                    trend={analyticsData.trends.totalLength}
                    unit=" min" />
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center md:col-span-2 lg:col-span-1">
                    <p className="text-sm font-semibold text-gray-600">Passa treningowa</p>
                    <p className="text-4xl font-bold text-blue-600 my-2">{analyticsData.currentStreak}</p>
                    <p className="text-gray-500 text-sm">dni z rzędu</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="relative w-full min-h-[350px] sm:min-h-[400px] bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
                    <Radar options={radarOptions} data={radarData} />
                </div>

                <div className="relative w-full min-h-[300px] bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
                    <Chart type="bar" options={mixedChartOptions} data={mixedChartData} />
                </div>
            </div>
        </div>
    );
}