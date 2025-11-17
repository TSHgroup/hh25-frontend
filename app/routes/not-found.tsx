import type { Route } from "./+types/not-found";
import { Link } from "react-router";
import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "404 - Strona nie znaleziona | OdpalGadkę" },
        { name: "description", content: "Przepraszamy, strona której szukasz nie istnieje." }
    ];
}

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
                <div className="max-w-2xl mx-auto text-center">

                    <div className="relative mb-8 md:mb-12">
                        <div className="text-6xl sm:text-8xl lg:text-[12rem] font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 animate-pulse">
                            404
                        </div>
                        <div className="absolute inset-0 text-6xl sm:text-8xl lg:text-[12rem] font-extrabold text-gray-100 animate-pulse animation-delay-500">
                            404
                        </div>
                    </div>

                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Ups! Strona nie znaleziona
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed px-4">
                        Przepraszamy, ale strona której szukasz nie istnieje lub została przeniesiona.
                        Sprawdź adres URL lub wróć do strony głównej.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
                        <Link to="/" className="group px-6 py-3 sm:px-8 sm:py-4 bg-linear-to-r from-blue-600 to-blue-700 text-white text-base sm:text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                            <span className="flex items-center gap-2 md:gap-3">
                                Wróć do strony głównej
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                                </svg>
                            </span>
                        </Link>
                    </div>

                    <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-gray-200">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 md:mb-8">
                            Może szukasz jednej z tych stron?
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                            <Link to="/login" className="p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:shadow-md transition-all duration-300 text-left">
                                <div className="font-semibold text-gray-900 text-sm md:text-base">Logowanie</div>
                                <div className="text-xs md:text-sm text-gray-600">Zaloguj się do swojego konta</div>
                            </Link>
                            <Link to="/signup" className="p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:shadow-md transition-all duration-300 text-left">
                                <div className="font-semibold text-gray-900 text-sm md:text-base">Rejestracja</div>
                                <div className="text-xs md:text-sm text-gray-600">Utwórz nowe konto</div>
                            </Link>
                            <Link to="/dashboard" className="p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:shadow-md transition-all duration-300 text-left">
                                <div className="font-semibold text-gray-900 text-sm md:text-base">Dashboard</div>
                                <div className="text-xs md:text-sm text-gray-600">Zobacz swoje treningi</div>
                            </Link>
                            <Link to="/#features" className="p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:shadow-md transition-all duration-300 text-left">
                                <div className="font-semibold text-gray-900 text-sm md:text-base">Funkcje</div>
                                <div className="text-xs md:text-sm text-gray-600">Poznaj możliwości aplikacji</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}