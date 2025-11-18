import { useState } from "react";
import { Link } from "react-router";

export function meta() {
    return [
        { title: "Wszystkie Scenariusze - OdpalGadkę" },
        { name: "description", content: "Przeglądaj wszystkie dostępne scenariusze treningowe" }
    ];
}

export default function Scenarios() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedDifficulty, setSelectedDifficulty] = useState("all");

    const categories = [
        { id: "all", label: "Wszystkie", count: 24 },
        { id: "business", label: "Biznes", count: 8 },
        { id: "social", label: "Społeczne", count: 10 },
        { id: "personal", label: "Osobiste", count: 6 },
    ];

    const scenarios = [
        {
            id: 1,
            title: "Rozmowa Kwalifikacyjna",
            description: "Przygotuj się do rozmowy o pracę z HR i przyszłym przełożonym. Naucz się odpowiadać na trudne pytania i prezentować swoje kompetencje.",
            category: "business",
            difficulty: "medium",
            duration: "15-20 min",
            participants: "2-3 osoby",
            scenarios: 5,
            color: "blue",
            icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
            tags: ["Kariera", "HR", "Rekrutacja"]
        },
        {
            id: 2,
            title: "Prezentacja Sprzedażowa",
            description: "Zaprezentuj produkt klientowi biznesowemu. Naucz się budować wartość, odpowiadać na obiekcje i finalizować sprzedaż.",
            category: "business",
            difficulty: "hard",
            duration: "20-30 min",
            participants: "2-4 osoby",
            scenarios: 4,
            color: "purple",
            icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
            tags: ["Sprzedaż", "B2B", "Negocjacje"]
        },
        {
            id: 3,
            title: "Pierwsza Randka",
            description: "Nawiąż rozmowę i zbuduj connection podczas pierwszej randki. Bądź naturalny, ciekawy i autentyczny.",
            category: "social",
            difficulty: "easy",
            duration: "10-15 min",
            participants: "2 osoby",
            scenarios: 6,
            color: "pink",
            icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
            tags: ["Randka", "Relacje", "Small Talk"]
        },
        {
            id: 4,
            title: "Trudna Rozmowa z Szefem",
            description: "Omów trudny temat z przełożonym - podwyżkę, konflikt w zespole lub niezadowolenie z projektu.",
            category: "business",
            difficulty: "hard",
            duration: "15-20 min",
            participants: "2 osoby",
            scenarios: 4,
            color: "red",
            icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
            tags: ["Asertywność", "Feedback", "Konflikt"]
        },
        {
            id: 5,
            title: "Networking Event",
            description: "Nawiązuj kontakty biznesowe podczas wydarzenia networkingowego. Przedstaw się skutecznie i zbuduj relacje.",
            category: "social",
            difficulty: "medium",
            duration: "15-20 min",
            participants: "3-5 osób",
            scenarios: 3,
            color: "orange",
            icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
            tags: ["Networking", "Biznes", "Small Talk"]
        },
        {
            id: 6,
            title: "Rozmowa z Rodzicami",
            description: "Porozmawiaj z rodzicami o trudnym temacie. Wyrażaj swoje zdanie z szacunkiem i znajdź kompromis.",
            category: "personal",
            difficulty: "medium",
            duration: "15-20 min",
            participants: "2-3 osoby",
            scenarios: 5,
            color: "green",
            icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
            tags: ["Rodzina", "Emocje", "Kompromis"]
        },
    ];

    const colorClasses: Record<string, { bg: string; badge: string; border: string }> = {
        blue: { bg: "from-blue-500 to-blue-600", badge: "bg-blue-100 text-blue-700", border: "border-blue-200" },
        purple: { bg: "from-purple-500 to-purple-600", badge: "bg-purple-100 text-purple-700", border: "border-purple-200" },
        pink: { bg: "from-pink-500 to-pink-600", badge: "bg-pink-100 text-pink-700", border: "border-pink-200" },
        red: { bg: "from-red-500 to-red-600", badge: "bg-red-100 text-red-700", border: "border-red-200" },
        orange: { bg: "from-orange-500 to-orange-600", badge: "bg-orange-100 text-orange-700", border: "border-orange-200" },
        green: { bg: "from-green-500 to-green-600", badge: "bg-green-100 text-green-700", border: "border-green-200" },
    };

    const difficultyLabels: Record<string, string> = {
        easy: "Łatwy",
        medium: "Średni",
        hard: "Trudny"
    };

    const filteredScenarios = scenarios.filter(s => {
        const categoryMatch = selectedCategory === "all" || s.category === selectedCategory;
        const difficultyMatch = selectedDifficulty === "all" || s.difficulty === selectedDifficulty;
        return categoryMatch && difficultyMatch;
    });

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
            <section className="relative overflow-hidden pt-32 pb-16">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-200"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            Nasze{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                                Scenariusze
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                            Wybierz spośród wszelkiego rodzaju treningów. Od rozmów biznesowych po życie osobiste.
                        </p>
                        <Link to="/signup">
                            <button className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
                                Rozpocznij Za Darmo
                            </button>
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Kategoria</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={`px-4 py-2 rounded-lg font-semibold transition ${
                                                selectedCategory === cat.id
                                                    ? 'bg-blue-600 text-white shadow'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {cat.label}
                                            <span className="ml-1 text-xs">({cat.count})</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Poziom trudności</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {["all", "easy", "medium", "hard"].map(diff => (
                                        <button
                                            key={diff}
                                            onClick={() => setSelectedDifficulty(diff)}
                                            className={`px-4 py-2 rounded-lg font-semibold transition ${
                                                selectedDifficulty === diff
                                                    ? 'bg-purple-600 text-white shadow'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {diff === "all" ? "Wszystkie" : difficultyLabels[diff]}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredScenarios.map(scenario => (
                            <div key={scenario.id} className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${colorClasses[scenario.color].border} group`}>
                                <div className={`h-2 bg-linear-to-r ${colorClasses[scenario.color].bg}`}></div>
                                
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-14 h-14 bg-linear-to-br ${colorClasses[scenario.color].bg} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={scenario.icon}/>
                                            </svg>
                                        </div>
                                        <span className={`px-3 py-1 ${colorClasses[scenario.color].badge} rounded-full text-xs font-bold`}>
                                            {difficultyLabels[scenario.difficulty]}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                                        {scenario.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                                        {scenario.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {scenario.tags.map((tag, i) => (
                                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-200">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                            {scenario.duration}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                                            </svg>
                                            {scenario.participants}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                                            </svg>
                                            {scenario.scenarios} warianty
                                        </div>
                                    </div>

                                    <Link to="/signup">
                                        <button className={`w-full px-4 py-3 bg-linear-to-r ${colorClasses[scenario.color].bg} text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2`}>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                            Rozpocznij Trening
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredScenarios.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Nie znaleziono scenariuszy</h3>
                            <p className="text-gray-600">Spróbuj zmienić filtry wyszukiwania</p>
                        </div>
                    )}
                </div>
            </section>
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Gotowy na Pierwszy Trening?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Wypróbuj OdpalGadke!
                    </p>
                    <Link to="/signup">
                        <button className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
                            Rozpocznij Za Darmo
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}