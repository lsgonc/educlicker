import Explore from "@/components/Explore";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Slider from "@/components/Slider";
import Wrapper from "@/components/Wrapper";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import Link from "next/link";
import ScrollAnimation from "@/components/ScrollAnimation";
import Card from "@/components/Card";

export default function Home() {
  return (
    <>
    <Navbar />
    <main>
    <Slider />
    <Explore text="Explore"/>
    <ScrollAnimation inViewClass={"animate-fade-right animate-duration-1000"} outViewClass={""}>
    <div className="font-roboto flex lg:mx-40 bg-comp_default rounded-md my-20 py-8 justify-between items-center px-10 sm:px-20">
      <h2 className="font-bold">É professor? Crie sua sala personalizada!</h2>
      <Link href={"/profile/quiz/"}>
      <button className="hover:animate-jump hover:animate-once hover:animate-duration-1000 relative flex h-[50px] w-40 items-center rounded-md justify-center overflow-hidden bg-[#31363F] text-white shadow transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-bg_dark before:duration-500 before:ease-out hover:shadow-bg_dark hover:before:h-56 hover:before:w-56">
      <span className="relative z-10">Criar sala</span>
      </button>
      </Link>
    </div> 
    </ScrollAnimation>
    <ScrollAnimation inViewClass={"animate-fade-left animate-duration-1000"} outViewClass={""}>
    <div className="font-roboto max-sm:flex-col max-sm:items-start flex md:mx-40 bg-comp_default rounded-md my-20 py-8 justify-between items-center px-10 sm:px-20">
      <h2 className="font-bold">Entrar em uma sala? Digite o PIN</h2>
      <form  className="max-sm:flex-col flex gap-6" action="">
        <input placeholder={"Digite o PIN"} className="focus:outline-none border-2 focus:ring-[#76ABAE] focus:border-[#76ABAE]  rounded-lg p-3 " type="text" name="" id="" />
        <button type="submit" className="hover:animate-jump hover:animate-once hover:animate-duration-1000 relative flex h-[50px] w-40 items-center rounded-md justify-center overflow-hidden bg-[#31363F] text-white shadow transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-bg_dark before:duration-500 before:ease-out hover:shadow-bg_dark hover:before:h-56 hover:before:w-56">
        <span className="relative z-10">Entrar na sala</span>
        </button>
      </form>
    </div> 
    </ScrollAnimation>
    </main>
    <aside className="bg-[#76ABAE] py-2 rounded-lg">
    <Explore text="Sobre nós"/>
    <div className="flex max-lg:flex-col">
     <div id={"sobre"} className="font-roboto text-xl leading-loose  text-justify lg:w-1/2 mx-4 lg:mx-40 my-10 font-light">
        <p className="-">Somos um grupo de estudantes da Universidade Federal de São Carlos apaixonados por educação e tecnologia, unidos pelo objetivo comum de transformar a experiência de ensino em sala de aula. É com grande entusiasmo que apresentamos o EduClicker, nosso projeto inovador desenvolvido durante o curso universitário.</p>
        <p className="">O EduClicker é mais do que apenas um programa de perguntas e respostas, é uma ferramenta projetada para revolucionar a dinâmica de aprendizado em sala de aula. Nosso objetivo é proporcionar uma experiência de ensino mais envolvente, interativa e eficaz para professores e alunos.</p>
        <p className="-">Com o EduClicker, os professores podem criar facilmente quizzes personalizados, adaptados aos conteúdos de suas aulas, e apresentá-los de forma dinâmica aos alunos. Nossa plataforma oferece uma variedade de recursos, desde questões de múltipla escolha até perguntas abertas, permitindo uma abordagem diversificada de avaliação do conhecimento</p>
      </div>
      <div className="max-lg:border-t lg:border-l border-[#222831] flex flex-col gap-10 self-center p-10">
        <Image width={500} height={500} alt="Entrada da Universidade Federal de São Carlos" src={"/ufscar-entrada.jpg"}></Image>
        <Image width={500} height={500} alt="Entrada do Departamento de Computação da Universidade Federal de São Carlos" src={"/dc-ufscar.jpg"}></Image>
      </div>
  </div>
    </aside>
    <Explore text="Depoimentos" />
    <section className="mt-10 depoimentos px-32 sm:flex  gap-10 mb-32 max-sm:flex-col">
      <ScrollAnimation inViewClass="animate-fade-right" outViewClass="">      
        <Card></Card>
      </ScrollAnimation>
      <ScrollAnimation inViewClass="animate-fade-right animate-delay-[500ms]" outViewClass="">      
        <Card></Card>
      </ScrollAnimation>
      <ScrollAnimation inViewClass="animate-fade-right animate-delay-[1000ms]" outViewClass="">      
        <Card></Card>
      </ScrollAnimation>
    </section>
    <ContactForm />
    <Footer />
    
    </>
  );
}
