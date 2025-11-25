import type { Route } from "./+types/home";
import Hero from "../components/Hero";
import Features from "../components/Features";
import ForWho from "../components/ForWho";
import Gif from "../components/Gif";

export function meta({}: Route.MetaArgs){
    return [
        { title: "OdpalGadkę - Trenuj Komunikację z AI" },
        { name: "description", content: "Przełam bariery w komunikacji. OdpalGadkę to Twój osobisty trener AI, który pomoże Ci mówić pewniej i swobodniej, analizując emocje, płynność i słownictwo." }
    ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
            <Hero />
            <ForWho />
            <Features />
            <Gif />
    </div> 
  );
}