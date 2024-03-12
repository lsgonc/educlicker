"use client"

import Input from "@/components/Input"
import { signIn, useSession } from "next-auth/react";

export default function Login() {
    const { data: session, status } = useSession()


    if(session)
        return (
            <h1>VOCE ESTÁ LOGADO</h1>
        )
    else
        return (
            <main className="w-full min-w-screen h-full min-h-screen bg-[#D9E0D4] flex justify-center items-center">
                <div className="bg-[#2F364D] w-[28rem] h-[32rem] rounded-3xl flex flex-col justify-center items-center ">

                    <label htmlFor="usuario" className="flex flex-col text-white">
                        Nome de usuário
                        <Input type="text"/>
                    </label>
                    <label htmlFor="senha" className="flex flex-col justify-center items-start text-white">
                        Senha
                        <Input type="text"/>
                    </label>
                    <button onClick={() => signIn('github')} className="bg-[#212634] my-4 w-80 h-16 rounded-3xl">
                        <h1 className="text-white">ENTRAR COM O GITHUB</h1>
                    </button>
                    <a href="/cadastro" className="text-white underline">Não possuí cadastro?</a>

                </div>
            </main>
    );
}