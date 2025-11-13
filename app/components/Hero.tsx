import React from 'react';
import { Link } from 'react-router';

const Hero: React.FC = () => {
    return(
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-32 pb-40">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <div className="space-y-8 animate-fade-in-up">
                        <div className="inline-block animate-fade-in">
                            <span className="px-5 py-2.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold shadow-sm">
                                Twój osobisty trener rozmów
                            </span>
                        </div>

                        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                            Odpal<span className="text-blue-600 inline-block hover:scale-105 transition-transform duration-300">Gadkę</span> i mów z pewnością siebie
                        </h1>

                        <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                            Inteligentny trener rozmów, który przygotuje cię do najtrudniejszych sytuacji społecznych – wystąpienie, rozmowa z rodzicami czy pierwsza randka.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link 
                                to="/signup" 
                                className="group px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 text-center relative overflow-hidden">
                                <span className="relative z-10">Zacznij Trening</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                            <a 
                                href="#features" 
                                className="px-8 py-4 bg-white text-gray-700 text-lg font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 hover:shadow-md transition-all duration-300 text-center">
                                Zobacz Jak Działa
                            </a>
                        </div>
                    </div>

                    <div className="relative animate-fade-in-up animation-delay-200">
                        <div className="relative bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                            <div className="bg-white rounded-2xl p-6 shadow-lg backdrop-blur-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center animate-pulse-slow">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">Trening Aktywny</div>
                                        <div className="text-sm text-gray-600">Rozmowa z Menadżerem</div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="animate-slide-in-right animation-delay-300">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-600">Pewność Siebie</span>
                                            <span className="font-bold text-green-600">87%</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-progress-bar" style={{ width: '87%' }}></div>
                                        </div>
                                    </div>

                                    <div className="animate-slide-in-right animation-delay-400">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-600">Tempo Mowy</span>
                                            <span className="font-bold text-blue-600">92%</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-progress-bar animation-delay-200" style={{ width: '92%' }}></div>
                                        </div>
                                    </div>

                                    <div className="animate-slide-in-right animation-delay-500">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-600">Klarowność</span>
                                            <span className="font-bold text-purple-600">78%</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-progress-bar animation-delay-400" style={{ width: '78%' }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-blue-50 rounded-xl animate-fade-in animation-delay-600 hover:bg-blue-100 transition-colors duration-300">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                        </div>
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
        </section>
    );
};

export default Hero;