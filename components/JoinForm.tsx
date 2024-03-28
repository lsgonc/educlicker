"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Socket, io } from "socket.io-client"

type FormType = {
    id: number
}

let socket : Socket

export default function JoinForm()
{
    const {register, setError, handleSubmit, formState:{errors}} = useForm<FormType>()
    const router = useRouter()


    const [joining, setJoining] = useState(false)

    useEffect(() => {
        socket = io("https://educlicker-websocket-latest.onrender.com")

        socket.on("usuario-conectado", (data) => {
            router.push(`/quizz/join/${data.gameUrl}?quizId=${data.gameId}`)
        })

        socket.on("pin-invalido", (data) => {
           setJoining((e) => !e)
           setError("root", {type: "custom", message: "PIN inválido, a sala não existe!"}) 
        })

        return () => {
            socket?.disconnect()
        }
    },[])

    const sendSubmit: SubmitHandler<FormType> = async (data) => {
        setJoining((e) => !e)
        socket?.emit("join_game", {roomId: data.id, nickname:"joiningUser"})
    }

    return(
        <form onSubmit={handleSubmit(sendSubmit)} className="max-sm:flex-col flex gap-6">
            <input {...register("id")} placeholder={"Digite o PIN"} className="focus:outline-none border-2 focus:ring-[#76ABAE] focus:border-[#76ABAE]  rounded-lg p-3 " type="text" id="quizId" />
            <button type="submit" className="hover:animate-jump hover:animate-once hover:animate-duration-1000 relative flex h-[50px] w-40 items-center rounded-md justify-center overflow-hidden bg-[#31363F] text-white shadow transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-bg_dark before:duration-500 before:ease-out hover:shadow-bg_dark hover:before:h-56 hover:before:w-56">
            <span className="relative z-10">{joining ? "Entrando..." : "Entrar na sala"}</span>
            </button>
            <div>
            {errors.root && <span className="text-red">{errors.root.message}</span>}
            </div>
        </form>
    )
}