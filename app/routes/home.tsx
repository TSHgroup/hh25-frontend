import type { Route } from "./+types/home";
import Navbar from "../components/Navbar"
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

export function meta({}: Route.MetaArgs){
    return [
        { title: "TSH's Hackheros - Speaking Asisistant" },
        { name: "description", content: "A speaking assistant for TSH's Hackheros" }
    ];
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <Navbar />

      <main className="grow flex flex-col items-center justify-start w-full px-4 py-8">
        <Hero />
        <Features />
      </main>

      <Footer />
    </div>
  );
}