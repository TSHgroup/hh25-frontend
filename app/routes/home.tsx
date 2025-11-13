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
    <div className="grow flex flex-col items-center justify-start">
    <Hero />
    <Features />
    </div>
  );
}