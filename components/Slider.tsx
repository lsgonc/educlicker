import Image from "next/image";
import ScrollAnimation from "./ScrollAnimation";

export default function Slider()
{
    return(
        <>
            <div className="font-roboto max-sm:text-left text-center flex flex-col justify-center items-center gap-3 bg-[#76ABAE] rounded-xl md:p-32 p-20">
            <ScrollAnimation inViewClass={"animate-jump-in animate-once animate-duration-1000" } outViewClass={""}>
                <h2 className="text-black text-5xl font-bold">Seja bem-vindo ao EduClicker</h2> 
                <span className="text-xl">Explore salas de aula interativas, descubra quizzes personalizados e mergulhe no aprendizado de uma forma única. Educação reinventada.</span>
            </ScrollAnimation>
            </div>
        </>
    );
}