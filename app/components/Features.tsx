import React from 'react';
import { Link } from 'react-router';
const Features: React.FC = () => {
    return(
        <div>
            <section id="features" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Jak <span className="text-blue-600">OdpalGadkę</span> Działa?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Zaawansowana analiza mowy i sztuczna inteligencja tworzą realistyczne scenariusze dopasowane do twoich celów
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition">
                            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Realistyczne Scenariusze</h3>
                            <p className="text-gray-600 mb-4">
                                Ćwicz rozmowy z AI, które reaguje jak prawdziwy człowiek – od spotkań biznesowych po randki
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                    </svg>
                                    Wystąpienia publiczne
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                    </svg>
                                    Rozmowy biznesowe
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                    </svg>
                                    Sytuacje społeczne
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border border-purple-100 hover:shadow-xl transition">
                            <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Zaawansowana Analiza</h3>
                            <p className="text-gray-600 mb-4">
                                Otrzymuj szczegółowe metryki po każdej sesji i obserwuj swój postęp w czasie rzeczywistym
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                    </svg>
                                    Analiza pewności głosu
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                    </svg>
                                    Wykrywanie wtrąceń "yyy"
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                    </svg>
                                    Poziom stresu w głosie
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border border-green-100 hover:shadow-xl transition">
                            <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Spersonalizowane Wskazówki</h3>
                            <p className="text-gray-600 mb-4">
                                AI generuje dokładne rady, jak poprawić twój styl komunikacji i eliminować błędy
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                    </svg>
                                    Raporty po każdej sesji
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                    </svg>
                                    Ćwiczenia dopasowane do ciebie
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                    </svg>
                                    Śledzenie postępów
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about" className="py-24 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Zacznij w 3 Prostych Krokach
                        </h2>
                        <p className="text-xl text-gray-600">
                            Od rejestracji do pierwszej sesji w kilka minut
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">

                        <div className="relative">
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                                    1
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Wybierz Scenariusz</h3>
                                <p className="text-gray-600">
                                    Wybierz jeden z gotowych scenariuszy lub stwórz własny – od rozmowy kwalifikacyjnej po trudną rozmowę z rodzicami
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                                    2
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Rozmawiaj z AI</h3>
                                <p className="text-gray-600">
                                    Prowadź realistyczną rozmowę głosową z AI, które dostosowuje się do twojego stylu i emocji
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                                    3
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Otrzymaj Feedback</h3>
                                <p className="text-gray-600">
                                    Dostań szczegółowy raport z metrykami i spersonalizowanymi wskazówkami do poprawy
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Szczegółowe Metryki Komunikacyjne
                            </h2>
                            <p className="text-xl text-gray-600 mb-8">
                                Po każdej sesji otrzymujesz kompleksowy raport analizujący wszystkie aspekty twojej wypowiedzi
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Confidence Score</h4>
                                        <p className="text-gray-600">Analiza stabilności i siły głosu – mierzy, jak pewnie brzmisz</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Speech Rate Score</h4>
                                        <p className="text-gray-600">Tempo mowy i rytm – sprawdź czy mówisz za szybko lub za wolno</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Clarity Score</h4>
                                        <p className="text-gray-600">Zrozumiałość i płynność – ocena artykulacji i jakości wypowiedzi</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Stress Indicator</h4>
                                        <p className="text-gray-600">Wykrywanie stresu na podstawie drżenia i napięcia w głosie</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Filler Detection</h4>
                                        <p className="text-gray-600">Wykrywanie wtrąceń typu "yyy", "eee", "no wiesz"</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl">
                            <div className="bg-white rounded-2xl p-6 shadow-xl">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-900">Raport z Sesji</h3>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                                        Ukończone
                                    </span>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700">Pewność Siebie</span>
                                            <span className="text-sm font-bold text-green-600">87%</span>
                                        </div>
                                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full" style={{ width: '87%' }}></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700">Tempo Mowy</span>
                                            <span className="text-sm font-bold text-blue-600">92%</span>
                                        </div>
                                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{ width: '92%' }}></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700">Klarowność</span>
                                            <span className="text-sm font-bold text-purple-600">78%</span>
                                        </div>
                                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full" style={{ width: '78%' }}></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700">Poziom Stresu</span>
                                            <span className="text-sm font-bold text-orange-600">Niski</span>
                                        </div>
                                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" style={{ width: '25%' }}></div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                                            </svg>
                                            <span className="text-sm font-semibold text-gray-900">Wtrącenia:</span>
                                            <span className="text-sm text-gray-600">3x "yyy", 1x "eee"</span>
                                        </div>

                                        <div className="p-4 bg-blue-50 rounded-xl">
                                            <div className="text-sm text-gray-700">
                                                <strong className="text-blue-700">Wskazówka AI:</strong> Doskonała praca! Spróbuj robić krótkie pauzy zamiast wypełniaczy "yyy" – to zwiększy twoją pewność siebie.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default Features;