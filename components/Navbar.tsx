"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import { IoMenu } from "react-icons/io5";
import SessionWrapper from "./SessionWraper"
import { useState } from "react";

export default function Navbar()
{
    const { data: session, status } = useSession()
    const [clicked, setClicked] = useState(false)

        return(
            <nav>
                <div className="bg-[#31363F] text-white font-roboto flex items-center justify-between px-5 md:px-24 lg:px-32  py-6 mb-20   max-sm:px-5 ">
                    <h1 className="text-4xl font-bold font-anton"><a href="/">EduClicker</a></h1>
                    <ul className="max-sm:hidden flex text-base font-normal  gap-5">
                        <li><a className="hover:text-[#76ABAE]" href="/">Home</a></li>

                        {session ? <li><a className="hover:text-[#76ABAE]" href="/profile">Meu Perfil</a></li> : <li><a href="/login" className="hover:text-bg_default">Login</a></li> } 
                        
                        <li><a className="hover:text-[#76ABAE]" href="#sobre">Sobre</a></li>
                        <li><a className="hover:text-[#76ABAE]" href="">Contato</a></li>
                    </ul>
                    <IoMenu onClick={() => setClicked((prev) => !prev )} size={50} className="hover:cursor-pointer sm:hidden"></IoMenu>
                    <ul className={`text-white font-roboto w-1/2 flex p-10 flex-col absolute z-10 right-0 bg-[#222831] opacity-80 top-24 ${clicked ? `visible ` : `hidden`}`}>
                    <li className="p-5"><a className="hover:bg-[#] hover:text-[#76ABAE]" href="">Home</a></li>
                         {session ? <li><a className="hover:text-[#76ABAE]" href="/profile">Meu Perfil</a></li> : <li><a href="/login" className="hover:text-bg_default">Login</a></li> }           
                        <li className="p-5"><a className="hover:text-[#76ABAE]" href="#sobre">Sobre</a></li>
                        <li className="p-5"><a className="hover:text-[#76ABAE]" href="">Contato</a></li>
                    </ul>
                </div>
               
            </nav>
        )
        
}
/*
<input type={props.tipo_input} className={`${props.color} my-4 w-80 h-16 rounded-3xl text-center text-white`} placeholder={props.text} value={props.valor} />
    );
*/