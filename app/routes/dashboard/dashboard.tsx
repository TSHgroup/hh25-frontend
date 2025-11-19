import { Link } from "react-router";
import StatsCard from "../../components/dashboard/StatsCard";

export function meta() {
    return [
        { title: "Dashboard - OdpalGadkę" },
        { name: "description", content: "Your personal training dashboard" }
    ];
}

export default function Dashboard() {
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

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
                <StatsCard
                    title="Ukończone Sesje"
                    value="24"
                    icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    trend={{ value: 12, isPositive: true }}
                    color="blue"
                />
                <StatsCard
                    title="Średnia Pewność"
                    value="87%"
                    icon="M13 10V3L4 14h7v7l9-11h-7z"
                    trend={{ value: 5, isPositive: true }}
                    color="green"
                />
                <StatsCard
                    title="Czas Treningów"
                    value="12.5h"
                    icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    trend={{ value: 8, isPositive: true }}
                    color="purple"
                />
                <StatsCard
                    title="Streak"
                    value="7 dni"
                    icon="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    color="orange"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Ostatnie Sesje</h2>
                    <div className="space-y-3 sm:space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow shrink-0">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">Rozmowa z X</h3>
                                    <p className="text-xs sm:text-sm text-gray-600">2 godziny temu</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="text-xl sm:text-2xl font-bold text-green-600">87%</div>
                                    <p className="text-xs text-gray-500">Pewność</p>
                                </div>
                            </div>
                        ))}
                    </div>
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