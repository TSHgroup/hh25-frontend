import { Link } from "react-router";

export function meta() {
    return [
        { title: "Pobierz Aplikację - OdpalGadke" },
        { name: "description", content: "Pobierz aplikację OdpalGadke na Androida i trenuj swoje umiejętności komunikacyjne, gdziekolwiek jesteś." }
    ];
}

export default function MobilePage() {
    return (
        <div className="min-h-screen w-full bg-linear-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative flex flex-col items-center justify-center min-h-screen p-6 text-center">
                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-7xl mx-auto">
                    
                    <div className="relative animate-float">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 rounded-[3rem] blur-2xl opacity-40"></div>
                            
                            <div className="relative w-[280px] h-[570px] bg-linear-to-br from-gray-900 to-gray-800 rounded-[3rem] p-3 shadow-2xl">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-20">
                                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-700 rounded-full"></div>
                                </div>

                                 <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden shadow-inner">
                                    <div className="w-full h-full bg-linear-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-6 text-center">
                                        <div className="mb-6 flex flex-col items-center">
                                            <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl mb-3">
                                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">OdpalGadke</h3>
                                        </div>
                                        
                                        <div className="space-y-3 w-full">
                                            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                                                <div className="flex items-center justify-center gap-2 mb-2">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <span className="text-xs font-semibold text-gray-600">Trening aktywny</span>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-gray-500">Emocje</span>
                                                        <span className="font-bold text-green-600">87%</span>
                                                    </div>
                                                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-linear-to-r from-green-400 to-green-600 rounded-full" style={{ width: '87%' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                                                <p className="text-xs text-gray-700 text-center">
                                                    <strong className="text-blue-600">Wskazówka AI:</strong> Świetnie! Utrzymuj spokojny ton głosu...
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="absolute right-0 top-32 w-1 h-16 bg-gray-700 rounded-l-lg"></div>
                                
                                <div className="absolute left-0 top-28 w-1 h-8 bg-gray-700 rounded-r-lg"></div>
                                <div className="absolute left-0 top-40 w-1 h-8 bg-gray-700 rounded-r-lg"></div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-xl text-left">
                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                            </svg>
                            Dostępne na Androida
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Trenuj, gdziekolwiek jesteś
                        </h1>
                        
                        <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                            Pobierz naszą aplikację mobilną, aby mieć swojego trenera AI zawsze pod ręką. Ćwicz komunikację w drodze do pracy, w przerwie kawowej lub przed ważnym spotkaniem.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Trening offline</h3>
                                    <p className="text-sm text-gray-600">Ćwicz nawet bez połączenia z internetem</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Przypomnienia</h3>
                                    <p className="text-sm text-gray-600">Nie zapomnij o codziennym treningu</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Postępy na bieżąco</h3>
                                    <p className="text-sm text-gray-600">Śledź swoje wyniki w czasie rzeczywistym</p>
                                </div>
                            </div>
                        </div>

                        <a 
                            href="https://odpalgadke.q1000q.cc/download/android"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4483-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993 0 .5511-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503c-1.6116-.7446-3.4241-1.1611-5.3531-1.1611s-3.7415.4165-5.3531 1.1611l-2.0223-3.503a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592c-2.9292 1.4983-4.9504 4.4937-5.1568 7.9474h17.8441c-.2064-3.4537-2.2276-6.4491-5.1568-7.9474"/>
                            </svg>
                            Pobierz na Androida
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                            </svg>
                        </a>

                        <Link to="/" className="block mt-6 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                            ← Wróć do strony głównej
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}