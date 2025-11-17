import React, { useState } from "react";
import { Link } from "react-router";

const PublicNavbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-gray-50 shadow-sm border-b border-gray-200">
            <div className="px-9">
                <div className="grid grid-cols-2 md:grid-cols-3 items-center h-20 gap-4">
                    
                    <div className="flex items-center justify-start pl-4 pr-4">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-gray-900">OdpalGadke</span>
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center justify-center gap-8 pl-4 pr-4">
                        <Link to="/#features" className="text-base font-medium text-gray-700 hover:text-blue-600 transition">
                            Features
                        </Link>
                        <Link to="/#about" className="text-base font-medium text-gray-700 hover:text-blue-600 transition">
                            How it works
                        </Link>
                        <Link to="/#detailed-info" className="text-base font-medium text-gray-700 hover:text-blue-600 transition">
                            More Info
                        </Link>
                    </nav>

                    <div className="flex items-center justify-end pl-4 pr-4">
                        <div className="hidden md:flex items-center gap-3 lg:gap-4">
                            <Link to="/login" className="text-base font-medium text-gray-700 px-4 py-2 hover:text-blue-600 transition">
                                Login
                            </Link>
                            <Link to="/signup">
                                <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-blue-700 transition">
                                    Get Started
                                </button>
                            </Link>
                        </div>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
                            aria-label="Toggle menu">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <div className="md:hidden border-t border-gray-200 bg-white">
                        <div className="px-4 py-4 space-y-4">
                            <nav className="flex flex-col space-y-2">
                                <Link to="#features" className="px-4 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-50 transition">
                                    Features
                                </Link>
                                <Link to="#about" className="px-4 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-50 transition">
                                    How it works
                                </Link>
                                <Link to="#pricing" className="px-4 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-50 transition">
                                    More Info
                                </Link>
                            </nav>
                            <div className="pt-4 border-t border-gray-200 space-y-3">
                                <Link to="/login">
                                    <button className="w-full px-4 py-2.5 text-base font-semibold text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition mb-5">
                                        Login
                                    </button>
                                </Link>
                                <Link to="/signup">
                                    <button className="w-full px-4 py-2.5 text-base font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition">
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default PublicNavbar;