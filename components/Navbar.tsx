"use client"

import { signOut, useSession } from "next-auth/react";
import SessionWrapper from "./SessionWraper"

export default function Navbar()
{
    const { data: session, status } = useSession()

        return(
            <nav>
                    <div className="bg-[#31363F] text-white font-roboto flex items-center justify-between px-5 md:px-24 lg:px-32  py-6 mb-20   max-sm:px-5 ">
                        <h1 className="text-4xl font-bold font-anton"><a href="">EduClicker</a></h1>
                        <ul className="flex text-base font-normal  gap-5">
                            <li><a className="hover:text-[#76ABAE]" href="">Home</a></li>

                            {session ? <li><a onClick={() => signOut()} className="hover:text-[#76ABAE]" href="/profile">Meu Perfil</a></li> : <li><a className="hover:text-bg_default" href="/login">Login</a></li> } 
                           
                            <li><a className="hover:text-[#76ABAE]" href="#sobre">Sobre</a></li>
                            <li><a className="hover:text-[#76ABAE]" href="">Contato</a></li>
                        </ul>
                    </div>
                </nav>
        )
        
}
/*
<input type={props.tipo_input} className={`${props.color} my-4 w-80 h-16 rounded-3xl text-center text-white`} placeholder={props.text} value={props.valor} />
    );
*/