import React from 'react';
import { Link } from 'react-router';

const PublicFooter: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return(
        <footer className="mt-auto w-full bg-linear-to-br from-gray-900 to-gray-800 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-12 lg:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 mb-6 md:mb-8 lg:mb-12">

                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                                </svg>
                            </div>
                            <span className="text-2xl font-bold text-white">OdpalGadke</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-3 md:mb-4 lg:mb-6">
                            Inteligentny trener rozmów, który uczy mówić pewnie i swobodnie w każdej sytuacji.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-sm md:text-base lg:text-lg mb-3 md:mb-4 lg:mb-6">Produkt</h3>
                        <ul className="space-y-2 md:space-y-3 lg:space-y-4">
                            <li>
                                <Link to="/#features" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base">
                                    Funkcje
                                </Link>
                            </li>
                            <li>
                                <Link to="/scenarios" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base">
                                    Scenariusze
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/mobile" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base flex items-center gap-2">
                                    Aplikacja mobilna
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Firma</h3>
                        <ul className="space-y-2 md:space-y-3 lg:space-y-4">
                            <li>
                                <Link to="/team" className="text-gray-400 hover:text-white transition-colors duration-300">
                                    Zespół
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
                        <div className="text-gray-400 text-xs md:text-sm text-center md:text-left">
                            © {currentYear} <span className="font-semibold text-white">OdpalGadke</span>. Wszystkie prawa zastrzeżone.
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-400">Stworzone z</span>
                            <svg className="w-3 h-3 md:w-4 md:h-4 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                            </svg>
                            <span className="text-gray-400">przez</span>
                            <a href="https://hackheroes.pl" target="_blank" rel="noopener noreferrer" className="font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 transition-all duration-300">
                                TSH HackHeroes 2025
                            </a>
                        </div>

                        <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-400">
                            <span className="hidden md:inline">🇵🇱 Polska</span>
                            <button className="hover:text-white transition-colors duration-300">
                                Polski
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default PublicFooter;