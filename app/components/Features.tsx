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
                            Skupiamy się na tym, co <span className="text-blue-600">najważniejsze</span>
                        </h2>
                        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                            Nasza AI analizuje kluczowe aspekty mowy, dając Ci realne narzędzia do budowania pewności siebie.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                        <div className="group bg-linear-to-br from-blue-50 to-white p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl border border-blue-100 hover:shadow-2xl hover:scale-105 transition-all duration-500">
                            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <svg className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Analiza Emocji</h3>
                            <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                                Zrozum, jak brzmisz dla innych. AI rozpoznaje ton Twojego głosu, pomagając Ci świadomie zarządzać emocjami i unikać nieporozumień.
                            </p>
                        </div>

                        <div className="group bg-linear-to-br from-purple-50 to-white p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl border border-purple-100 hover:shadow-2xl hover:scale-105 transition-all duration-500">
                            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-linear-to-br from-purple-600 to-purple-700 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <svg className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Ocena Płynności</h3>
                            <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                                Koniec z "yyy" i "eee". Monitorujemy płynność Twojej wypowiedzi, identyfikując przerwy i wahania, abyś mówił płynnie i bezstresowo.
                            </p>
                        </div>

                        <div className="group bg-linear-to-br from-green-50 to-white p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl border border-green-100 hover:shadow-2xl hover:scale-105 transition-all duration-500">
                            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-linear-to-br from-green-600 to-green-700 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <svg className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7"/>
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Dobór Słownictwa</h3>
                            <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                                Wyrażaj myśli precyzyjnie. Otrzymasz sugestie dotyczące używanych słów, co pozwoli Ci wzbogacić język i brzmieć bardziej profesjonalnie.
                            </p>
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
                                Po każdej sesji otrzymujesz kompleksowy raport analizujący kluczowe aspekty Twojej wypowiedzi.
                            </p>

                            <div className="space-y-6 md:space-y-8">
                                <div className="flex gap-4 md:gap-5 group">
                                    <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-purple-100 to-purple-50 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-6 h-6 md:w-7 md:h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1 md:mb-2 text-base md:text-lg">Analiza Emocji</h4>
                                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">AI rozpoznaje ton Twojego głosu, pomagając Ci lepiej zrozumieć i kontrolować emocje podczas rozmowy.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 md:gap-5 group">
                                    <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-blue-100 to-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-6 h-6 md:w-7 md:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1 md:mb-2 text-base md:text-lg">Ocena Płynności</h4>
                                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">Monitorujemy płynność Twojej wypowiedzi, identyfikując przerwy i wahania, abyś mówił bardziej płynnie.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 md:gap-5 group">
                                    <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-green-100 to-green-50 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-6 h-6 md:w-7 md:h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1 md:mb-2 text-base md:text-lg">Dobór Słownictwa</h4>
                                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">Otrzymasz sugestie dotyczące używanych słów, co pozwoli Ci wzbogacić język i precyzyjniej wyrażać myśli.</p>
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
                                                <span className="text-sm font-semibold text-gray-700">Emocje</span>
                                                <span className="text-sm font-bold text-green-600">87%</span>
                                            </div>
                                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-linear-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000 group-hover:scale-x-105" style={{ width: '87%' }}></div>
                                            </div>
                                        </div>

                                        <div className="group">
                                            <div className="flex justify-between mb-2 md:mb-3">
                                                <span className="text-sm font-semibold text-gray-700">Płynność</span>
                                                <span className="text-sm font-bold text-blue-600">92%</span>
                                            </div>
                                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-linear-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000 group-hover:scale-x-105" style={{ width: '92%' }}></div>
                                            </div>
                                        </div>

                                        <div className="group">
                                            <div className="flex justify-between mb-2 md:mb-3">
                                                <span className="font-semibold text-gray-700 text-sm md:text-base">Słownictwo</span>
                                                <span className="font-bold text-gray-900 text-sm md:text-base">78%</span>
                                            </div>
                                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-linear-to-r from-green-400 to-green-600 rounded-full animate-progress-bar animation-delay-400" style={{ width: '78%' }}></div>
                                            </div>
                                        </div>

                                        <div className="pt-4 md:pt-6 border-t-2 border-gray-100">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                    </svg>
                                                </div>
                                                <div className="text-sm text-gray-700">
                                                    <strong>Wskazówka AI:</strong> Świetnie! Twoja płynność jest na wysokim poziomie. Spróbuj teraz użyć bardziej zróżnicowanego słownictwa, aby jeszcze lepiej wyrazić swoje myśli.
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