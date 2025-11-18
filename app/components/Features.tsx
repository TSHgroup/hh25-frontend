import React from 'react';
import { Link } from 'react-router';

const Features: React.FC = () => {
    return(
        <div>
            <section id="features" className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-blue-50/30 to-white pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12 md:mb-16 lg:mb-20">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                            Jak <span className="text-blue-600">OdpalGadkę</span> Działa?
                        </h2>
                        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                            Zaawansowana analiza mowy i sztuczna inteligencja tworzą realistyczne scenariusze dopasowane do twoich celów
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                        <div className="group bg-linear-to-br from-blue-50 to-white p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl border border-blue-100 hover:shadow-2xl hover:scale-105 transition-all duration-500">
                            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <svg className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Realistyczne Scenariusze</h3>
                            <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                                Ćwicz rozmowy z AI, które reaguje jak prawdziwy człowiek – od spotkań biznesowych po randki
                            </p>
                            <ul className="space-y-2 md:space-y-3 text-sm text-gray-600">
                                <li className="flex items-center gap-2 md:gap-3">
                                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-sm md:text-base">Wystąpienia publiczne</span>
                                </li>
                                <li className="flex items-center gap-2 md:gap-3">
                                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-sm md:text-base">Rozmowy biznesowe</span>
                                </li>
                                <li className="flex items-center gap-2 md:gap-3">
                                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-sm md:text-base">Sytuacje społeczne</span>
                                </li>
                            </ul>
                        </div>

                        <div className="group bg-linear-to-br from-purple-50 to-white p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl border border-purple-100 hover:shadow-2xl hover:scale-105 transition-all duration-500">
                            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-linear-to-br from-purple-600 to-purple-700 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <svg className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Zaawansowana Analiza</h3>
                            <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                                Otrzymuj szczegółowe metryki po każdej sesji i obserwuj swój postęp w czasie rzeczywistym
                            </p>
                            <ul className="space-y-2 md:space-y-3 text-sm text-gray-600">
                                <li className="flex items-center gap-2 md:gap-3">
                                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-sm md:text-base">Analiza pewności głosu</span>
                                </li>
                                <li className="flex items-center gap-2 md:gap-3">
                                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-sm md:text-base">Wykrywanie wtrąceń "yyy"</span>
                                </li>
                                <li className="flex items-center gap-2 md:gap-3">
                                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-sm md:text-base">Poziom stresu w głosie</span>
                                </li>
                            </ul>
                        </div>

                        <div className="group bg-linear-to-br from-green-50 to-white p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl border border-green-100 hover:shadow-2xl hover:scale-105 transition-all duration-500">
                            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-linear-to-br from-green-600 to-green-700 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <svg className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Spersonalizowane Wskazówki</h3>
                            <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                                AI generuje dokładne rady, jak poprawić twój styl komunikacji i eliminować błędy
                            </p>
                            <ul className="space-y-2 md:space-y-3 text-sm text-gray-600">
                                <li className="flex items-center gap-2 md:gap-3">
                                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-sm md:text-base">Raporty po każdej sesji</span>
                                </li>
                                <li className="flex items-center gap-2 md:gap-3">
                                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-sm md:text-base">Ćwiczenia dopasowane do ciebie</span>
                                </li>
                                <li className="flex items-center gap-2 md:gap-3">
                                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-sm md:text-base">Śledzenie postępów</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about" className="py-16 md:py-24 lg:py-32 bg-linear-to-br from-gray-50 via-white to-blue-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-16 lg:mb-20">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                            Zacznij w 3 Prostych Krokach
                        </h2>
                        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Od rejestracji do pierwszej sesji w kilka minut
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
                        <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-blue-200 to-transparent"></div>
                        <div className="relative group animate-fade-in-up animation-delay-200">
                            <div className="bg-white p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-linear-to-br from-blue-500 to-blue-700 rounded-xl md:rounded-2xl flex items-center justify-center text-white text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    1
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Wybierz Scenariusz</h3>
                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                    Wybierz jeden z gotowych scenariuszy lub stwórz własny – od rozmowy kwalifikacyjnej po trudną rozmowę z rodzicami
                                </p>
                            </div>
                        </div>

                        <div className="relative group animate-fade-in-up animation-delay-400">
                            <div className="bg-white p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-linear-to-br from-purple-500 to-purple-700 rounded-xl md:rounded-2xl flex items-center justify-center text-white text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    2
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Rozmawiaj z AI</h3>
                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                    Prowadź realistyczną rozmowę głosową z AI, które dostosowuje się do twojego stylu i emocji
                                </p>
                            </div>
                        </div>

                        <div className="relative group animate-fade-in-up animation-delay-600">
                            <div className="bg-white p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-linear-to-br from-green-500 to-green-700 rounded-xl md:rounded-2xl flex items-center justify-center text-white text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    3
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Otrzymaj Feedback</h3>
                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                    Dostań szczegółowy raport z metrykami i spersonalizowanymi wskazówkami do poprawy
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="detailed-info" className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                        <div className="animate-fade-in-left">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 lg:mb-8 leading-tight">
                                Szczegółowe Metryki Komunikacyjne
                            </h2>
                            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 md:mb-12 leading-relaxed">
                                Po każdej sesji otrzymujesz kompleksowy raport analizujący wszystkie aspekty twojej wypowiedzi
                            </p>

                            <div className="space-y-6 md:space-y-8">
                                <div className="flex gap-4 md:gap-5 group">
                                    <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-green-100 to-green-50 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-6 h-6 md:w-7 md:h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1 md:mb-2 text-base md:text-lg">Pewność siebie</h4>
                                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">Analiza stabilności i siły głosu – mierzy, jak pewnie brzmisz</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 md:gap-5 group">
                                    <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-blue-100 to-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-6 h-6 md:w-7 md:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1 md:mb-2 text-base md:text-lg">Prędkość i rytm mowy</h4>
                                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">Tempo mowy i rytm – sprawdź czy mówisz za szybko lub za wolno</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 md:gap-5 group">
                                    <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-purple-100 to-purple-50 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-6 h-6 md:w-7 md:h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1 md:mb-2 text-base md:text-lg">Klarowność mowy</h4>
                                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">Zrozumiałość i płynność – ocena artykulacji i jakości wypowiedzi</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 md:gap-5 group">
                                    <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-red-100 to-red-50 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-6 h-6 md:w-7 md:h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1 md:mb-2 text-base md:text-lg">Zestresowanie</h4>
                                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">Wykrywanie stresu na podstawie drżenia i napięcia w głosie</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 md:gap-5 group">
                                    <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-orange-100 to-orange-50 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-6 h-6 md:w-7 md:h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1 md:mb-2 text-base md:text-lg">Wykrywanie wtrąceń "yyy" itp.</h4>
                                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">Wykrywanie wtrąceń typu "yyy", "eee", "no wiesz"</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative animate-fade-in-right">
                            <div className="bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl">
                                <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl">
                                    <div className="flex items-center justify-between mb-6 md:mb-8">
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">Raport z Sesji</h3>
                                        <span className="px-3 py-1 md:px-4 md:py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold shadow-sm">
                                            ✓ Ukończone
                                        </span>
                                    </div>

                                    <div className="space-y-6 md:space-y-8">
                                        <div className="group">
                                            <div className="flex justify-between mb-2 md:mb-3">
                                                <span className="text-sm font-semibold text-gray-700">Pewność Siebie</span>
                                                <span className="text-sm font-bold text-green-600">87%</span>
                                            </div>
                                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-linear-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000 group-hover:scale-x-105" style={{ width: '87%' }}></div>
                                            </div>
                                        </div>

                                        <div className="group">
                                            <div className="flex justify-between mb-2 md:mb-3">
                                                <span className="text-sm font-semibold text-gray-700">Tempo Mowy</span>
                                                <span className="text-sm font-bold text-blue-600">92%</span>
                                            </div>
                                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-linear-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000 group-hover:scale-x-105" style={{ width: '92%' }}></div>
                                            </div>
                                        </div>

                                        <div className="group">
                                            <div className="flex justify-between mb-2 md:mb-3">
                                                <span className="text-sm font-semibold text-gray-700">Klarowność</span>
                                                <span className="text-sm font-bold text-purple-600">78%</span>
                                            </div>
                                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-linear-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-1000 group-hover:scale-x-105" style={{ width: '78%' }}></div>
                                            </div>
                                        </div>

                                        <div className="group">
                                            <div className="flex justify-between mb-2 md:mb-3">
                                                <span className="text-sm font-semibold text-gray-700">Poziom Stresu</span>
                                                <span className="text-sm font-bold text-orange-600">Niski (25%)</span>
                                            </div>
                                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-linear-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-1000 group-hover:scale-x-105" style={{ width: '25%' }}></div>
                                            </div>
                                        </div>

                                        <div className="pt-4 md:pt-6 border-t-2 border-gray-100">
                                            <div className="flex items-start gap-2 md:gap-3 mb-4">
                                                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center shrink-0">
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                                                    </svg>
                                                </div>
                                                <div className="text-sm text-gray-700 mt-2">
                                                    <strong>Wtrącenia:</strong> 3x "yyy", 1x "eee"
                                                </div>
                                            </div>

                                            <div className="p-4 md:p-5 bg-blue-50 rounded-xl md:rounded-2xl border border-blue-200">
                                                <div className="text-sm text-gray-700">
                                                    <strong>Wskazówka AI:</strong> Świetnie! Mów wolniej przy kluczowych argumentach, to da Ci więcej pewności.
                                                </div>
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