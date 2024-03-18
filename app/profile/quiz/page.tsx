"use client"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"
import prisma from "@/app/api/prisma/prisma"
import { quizzes } from "@prisma/client"
import useSWR from "swr"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"

let socket : Socket

async function fetcher()
{
    const res = await fetch(`api/prisma/getQuiz`, {
        method: "GET"
    })


    const quizz = await res.json()

    return quizz
}

export default function Page()
{

    //SWR => stale-while-revalidade => hook pra fazer o fetch dos dados na API e atualizar a UI
    const {data, error, mutate} = useSWR('/api/prisma/getQuiz', fetcher) 
    const {data: session, status} = useSession()


    const router = useRouter()

    const hostA = (session?.user?.name) ? session?.user.name : "host"
    const [gamePin, setGamePin] = useState(null)
    const [buttonClicked, setButtonClicked] = useState("")


    useEffect(() => {
        socket = io("http://localhost:8080")

        
        return (() => {
            socket.disconnect()
        })
    },[])

    useEffect(() => {
        socket?.on("game_criado",(data) => {
            router.push(`/quizz/join/${buttonClicked}?quizId=${data.id}`)
        })
    },[buttonClicked,router])


    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id:string) {
        e.preventDefault()


        const res = await fetch(`api/prisma/deleteQuiz/?id=${id}`,{
            method: "DELETE"
        })

        const r = await res.json()

        mutate()//"força" o reload da UI

    }

    function handleCreate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) {
        e.preventDefault()
        console.log(id)
        setButtonClicked((e) => id)
        socket.emit("create_game", {host: hostA,gameUrl: id})
    }

    
    
    if(error) return <h1>Ocorreu um erro</h1>
    if(!data) return <h1>Loading</h1>
    if(!session) return (router.push("/"))

   
    return(
        <>
            <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
            <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
                <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">

                    <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>

                    <a href="/profile/" className="flex items-center px-3 py-2.5 font-bold bg-white  hover:text-indigo-900 hover:border hover:rounded-full">
                        Pubic Profile
                    </a>
                    <a href=""
                        className="flex items-center px-3 py-2.5 font-semibold  text-indigo-900 border rounded-full">
                        Meus quizzes
                    </a>

                    <a href="/quizz/create"
                        className="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full">
                        Criar Quizz
                    </a>

                </div>
            </aside>
            <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                <div className="p-2 md:p-4">
                    <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                        <h2 className="pl-6 text-2xl font-bold sm:text-xl mb-3">Meus quizzes</h2>
                        
                        <div className="flex flex-col gap-5">
                        {
                            data.map( (i : quizzes, index: number) => (
                                <>
                                {console.log(`i[${index}] = `,i)}
                                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
                                    <a href="#">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{i.questions[0]?.question}</h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-700">{i.autor}</p>
                                    <div className="flex gap-3">
                                    <button onClick={(e) => handleCreate(e, i.id)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600">
                                    Criar sala
                                    </button>
                                    <button onClick={(e) => handleSubmit(e, i.id)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#FE0000] rounded-lg hover:bg-bg-red focus:ring-4 focus:outline-none focus:ring-blue-300">
                                    Deletar quizz
                                    </button>
                                    </div>
                                </div>
                                </>
                            ))
                            
                        }
                        </div>
                        
                    </div>
                </div>
            </main>
        </div>
        </>
    )

}