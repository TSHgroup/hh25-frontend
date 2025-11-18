import { useState } from "react";

export function meta() {
    return [
        { title: "Nasz Zespół - OdpalGadkę" },
        { name: "description", content: "Poznaj zespół tworzący OdpalGadkę" }
    ];
}

export default function Team() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const teamMembers = [
        {
            name: "Karol Gajda",
            role: "Mobile Developer",
            bio: "Fullstack mobile dev",
            image: "KG",
            color: "from-blue-500 to-cyan-600",
        },
        {
            name: "Dawid Wdowin",
            role: "Backend Developer",
            bio: "Fullstack backend dev",
            image: "DW",
            color: "from-purple-500 to-pink-600",
        },
        {
            name: "Michał Jendrzejczyk",
            role: "Backend Developer",
            bio: "Fullstack backend dev",
            image: "MJ",
            color: "from-green-500 to-emerald-600",
        },
        {
            name: "Mateusz Makaryk",
            role: "Frontend Developer",
            bio: "Frontend dev",
            image: "MM",
            color: "from-orange-500 to-red-600",
        },
        {
            name: "Bartosz Kłos",
            role: "Frontend Developer",
            bio: "Frontend dev",
            image: "BK",
            color: "from-indigo-500 to-purple-600",
        },
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="absolute bottom-40 right-40 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
            </div>
            <section className="relative pt-32 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-20 animate-fade-in-up">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce-slow">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                            Poznaj Nasz{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
                                Zespół
                            </span>
                        </h1>
                    </div>

                    <div className="relative">
                        <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style={{ zIndex: 0 }}>
                            <defs>
                                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                                    <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
                                </linearGradient>
                            </defs>
                            <path 
                                d="M 200 150 Q 400 250 600 150 T 1000 150 Q 1200 250 1400 150" 
                                stroke="url(#lineGradient)" 
                                strokeWidth="2" 
                                fill="none"
                                strokeDasharray="5,5"
                                className="animate-dash"
                            />
                        </svg>
                        <div className="space-y-12 relative">
                            {teamMembers.map((member, index) => {
                                const isLeft = index % 2 === 0;
                                const animationDelay = `${index * 150}ms`;
                                
                                return (
                                    <div
                                        key={index}
                                        className={`flex items-center justify-center lg:justify-${isLeft ? 'start' : 'end'} animate-fade-in-up`}
                                        style={{ animationDelay }}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    >
                                        <div className={`w-full max-w-md lg:max-w-lg ${isLeft ? 'lg:ml-0 lg:mr-auto' : 'lg:ml-auto lg:mr-0'}`}>
                                            <div className={`group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-gradient ${
                                                hoveredIndex === index ? 'scale-105' : 'scale-100'
                                            }`}>
                                                <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-sm -z-10"></div>
                                                <div className="relative bg-white rounded-3xl p-8">
                                                    <div className="flex items-center gap-6 mb-6">
                                                        <div className="relative">
                                                            <div className={`w-24 h-24 md:w-28 md:h-28 bg-linear-to-br ${member.color} rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-2xl transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 relative z-10`}>
                                                                {member.image}
                                                                <div className={`absolute inset-0 bg-linear-to-br ${member.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
                                                            </div>
                                                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-100 group-hover:scale-125 transition-transform duration-300">
                                                                <span className="text-lg">🚀</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                                                                {member.name}
                                                            </h3>
                                                            <p className={`text-sm md:text-base font-semibold bg-linear-to-r ${member.color} bg-clip-text text-transparent mb-2`}>
                                                                {member.role}
                                                            </p>
                                                            <div className={`h-1 bg-linear-to-r ${member.color} rounded-full transition-all duration-500 ${
                                                                hoveredIndex === index ? 'w-full' : 'w-12'
                                                            }`}></div>
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
                                                        {member.bio}
                                                    </p>
                                                    <div className="absolute top-4 right-4 flex gap-1 opacity-20 group-hover:opacity-40 transition-opacity">
                                                        <div className={`w-2 h-2 rounded-full bg-linear-to-r ${member.color}`}></div>
                                                        <div className={`w-2 h-2 rounded-full bg-linear-to-r ${member.color}`}></div>
                                                        <div className={`w-2 h-2 rounded-full bg-linear-to-r ${member.color}`}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}