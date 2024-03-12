import Image from "next/image"

export default function Card()
{
    return (
        <div className="border-2 rounded-3xl flex flex-col w-1/3 font-roboto text-center items-center p-10">
            <Image width={300} height={300} className="w-44 h-44 rounded-full flex justify-center items-center"  alt="Foto de pessoas que deram depoimentos sobre o site" src={"/dc-ufscar.jpg"}></Image>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus non lorem aliquam volutpat.</p>
            <cite className="self-end mt-3">-Lucas Sciarra</cite>
        </div>
   )
}