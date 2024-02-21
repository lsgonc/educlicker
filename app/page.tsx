import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Slider from "@/components/Slider";
import Wrapper from "@/components/Wrapper";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Navbar />
    <main>
    <Slider />
    <Wrapper text="Entrar em uma sala? Digite o PIN" button_text="Entrar na sala"/>
    <Wrapper text="É professor? Crie sua sala personalizada!" button_text="Criar sala"/>
    </main>
    <Footer />
    </>
  );
}
