import { NextRequest } from "next/server"
import prisma from "../prisma"
import { getSession } from "next-auth/react"
import { getServerSession } from "next-auth"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(req:NextRequest)
{
    let {author, questions} = await req.json()
    
    try{
        const quizData = await prisma.quizzes.create({
                data:{
                    dataCriacao: new Date(),
                    autor: author,
                    questions: questions
                }
        })
        return Response.json({msg: "Quizz criado com sucesso"})
    } catch (e)
    {
        console.log("Erro ao criar quiz", e)
        Response.json({error: "Nao foi possivel criar o Quiz"})
    }

    
    

}