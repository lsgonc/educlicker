"use client"

import Input from "@/components/Input"
import { signIn, useSession } from "next-auth/react";
import { MouseEventHandler, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { error } from "console";
import {ZodType, z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"


type FormFype = {
    username: string,
    email: string,
    fullname: string,
    password: string,
    confirmpassword: string
}

const schema : ZodType<FormFype> = z.object({
    username: z.string().min(1, {message: "Digite o nome de usuário"}),
    email: z.string().email({message: "Digite um email válido"}),
    fullname: z.string().min(1, {message: "Digite seu nome completo!"}),
    password: z.string().min(6, {message: "A senha deve conter no mínimo 6 caractéres"}),
    confirmpassword: z.string()
}).refine((data) => data.password === data.confirmpassword, {
    message: "As senhas não  batem!",
    path: ["confirmpassword"]
})

export default function Login() {
    const { data: session, status } = useSession()
    const  router = useRouter()

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<FormFype>({resolver: zodResolver(schema)})

    const sendSubmit: SubmitHandler<FormFype> = async (data) =>
    {
        console.log(data)
    }

    const [visiblePassword, setVisiblePassword] = useState(false)

    function toogleVisibility(ev:React.MouseEvent<HTMLButtonElement, MouseEvent>)
    {
        ev.preventDefault()
        setVisiblePassword((e) => !e )
    }

    useEffect(() => {
        if(session)
        {
            router.push("/")
        }
    },[session])
    
    return (
        <div className="font-roboto flex justify-center items-center w-screen h-screen bg-[#76ABAE]">
            <div className="shadow-lg w-full md:w-3/4 md:py-10 max-md:py-10 px-10 shadow lg:px-40 rounded-lg bg-[#fff] flex flex-col justify-center gap-5">
                <h1 className="text-4xl text-center mb-4">Cadastro</h1>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit(sendSubmit)}>

                <input {...register("username")} key={"name"} placeholder="Digite seu nome de usuário" className="text-black focus:outline-none border-2 focus:ring-[#76ABAE] focus:border-[#76ABAE]  rounded-lg p-3 " type="text" id="username" />
                {errors.username && <div className="text-red">{errors.username.message}</div>}
                
                <input {...register("email")} key={"email"} placeholder="Digite seu email" className="text-black focus:outline-none border-2 focus:ring-[#76ABAE] focus:border-[#76ABAE]  rounded-lg p-3 " type="text" id="email" />
                {errors.email && <div className="text-red">{errors.email.message}</div>}
                
                <input {...register("fullname")} key={"fullname"} placeholder="Digite seu nome completo" className="text-black focus:outline-none border-2 focus:ring-[#76ABAE] focus:border-[#76ABAE]  rounded-lg p-3 " type="text" id="fullname" />
                {errors.fullname && <div className="text-red">{errors.fullname.message}</div>}
                
                <div className="flex gap-3 w-full">
                <div className="relative w-full">
                    <input {...register("password")} key={"password"} placeholder="Digite sua senha" className="w-full text-black focus:outline-none border-2 focus:ring-[#76ABAE] focus:border-[#76ABAE]  rounded-lg p-3 " type={visiblePassword ? "text" : "password"} id="password" />
                    {errors.password && <div className="text-red">{errors.password.message}</div>}    
                        <button
                        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                        onClick={(e) => toogleVisibility(e)}
                    >
                        {visiblePassword ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                        </svg>
                        ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        )}
                        
                    </button>
                </div>
                <div className="relative w-full">
                    <input {...register("confirmpassword")} key={"confirmpassword"} placeholder="Confirme sua senha" className="w-full text-black focus:outline-none border-2 focus:ring-[#76ABAE] focus:border-[#76ABAE]  rounded-lg p-3 " type={visiblePassword ? "text" : "password"} id="confirmpassword" />
                    {errors.confirmpassword && <div className="text-red">{errors.confirmpassword.message}</div>}    
                        <button
                        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                        onClick={(e) => toogleVisibility(e)}
                    >
                        {visiblePassword ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                        </svg>
                        ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        )}
                    </button>
                </div>

                </div>
                
                <button type="submit" className="text-white self-end flex h-[50px] w-full items-center rounded-md justify-center bg-[#31363F] ">
                    <span className="">{isSubmitting ? "Cadastrando..." : "Cadastro"}</span>
                </button>
                </form>
            </div>
        </div>
);
}