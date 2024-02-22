"use client"

import { setConfig } from "next/config";
import Image from "next/image"
import { useState } from "react"

export default function Page()
{
    const [choice, setChoice] = useState("sim");
 
    return (
        <>
        <div className="w-full min-w-screen h-full min-h-screen h-full w-full bg-comp_default flex-col justify-center">
            <main className="bg-[#D9E0D4]">
                <div className="bg-[#2F364D] w-[28rem] h-lg rounded-3xl flex flex-col justify-start py-20 px-10 gap-5">
                
                <p className="text-white text-xl">Qual a capital do Brasil?</p>
                <button className="relative p-2  rounded-md justify-center bg-comp_default hover:bg-[#bcc2b8]" type="button">Brasília</button>
                <button className="relative p-2  rounded-md justify-center bg-comp_default hover:bg-[#bcc2b8]" type="button">Rio de Janeiro</button>
                <button className="relative p-2 rounded-md justify-center bg-comp_default hover:bg-[#bcc2b8]" type="button">Se quiser sim mano</button>
                
                </div>
            </main> 

            
            <aside className=" bg-comp_default">
                <p className="">Pessoas conectadas</p>
                <ul className="">
                    <li className="">
                    <figure>
                        <Image src="/default-profile-picture.svg" alt="Icone de reset" width={30} height={30} ></Image>
                        <figcaption>User1</figcaption>
                    </figure>
                    </li>
                    <li className="">
                    <figure>
                        <Image src="/default-profile-picture.svg" alt="Icone de reset" width={30} height={30} ></Image>
                        <figcaption>User1</figcaption>
                    </figure>
                    </li>
                    <li className="">
                    <figure>
                        <Image src="/default-profile-picture.svg" alt="Icone de reset" width={30} height={30} ></Image>
                        <figcaption>User1</figcaption>
                    </figure>
                    </li>
                    
                </ul>
            </aside>
        </div>
        </>
    )
}