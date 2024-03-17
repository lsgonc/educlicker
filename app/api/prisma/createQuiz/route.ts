import { NextRequest } from "next/server"
import prisma from "../prisma"
import { getSession } from "next-auth/react"
import { getServerSession } from "next-auth"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(req:NextRequest)
{
    let {id, author, questions} = await req.json()

   const quizData = await prisma.quizzes.create({
        data:{
            id: id,
            dataCriacao: new Date(),
            autor: author,
            questions: questions
        }
   })

    
    return Response.json({msg: "Quizz criado com sucesso"})

}