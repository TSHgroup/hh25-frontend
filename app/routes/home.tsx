import type { Route } from "./+types/home";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/PublicFooter";

export function meta({}: Route.MetaArgs){
    return [
        { title: "TSH's Hackheros - Speaking Asisistant" },
        { name: "description", content: "A speaking assistant for TSH's Hackheros" }
    ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <Hero />

            <div className="h-32 bg-linear-to-b from-blue-50 to-white"></div>

            <Features />
    </div>
  );
}