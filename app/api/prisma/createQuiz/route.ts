import { NextRequest, NextResponse } from "next/server"
import prisma from "../prisma"
import { getServerSession } from "next-auth"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(req:NextRequest)
{
    const session = await getServerSession()


    if(!session)
    {
        return Response.json({message: "Não autorizado"},{status: 401})
    }

    const {titulo, questions} = await req.json()
    
    try{
        const quizAutor = await prisma.user.findUnique({
            where: {
                email: session.user?.email as string
            }
        })

        const quizData = await prisma.quizzes.create({
            data:{
                titulo: titulo,
                dataCriacao: new Date(),
                questions: questions,
                userId: quizAutor!.id 
            }
         })

        return Response.json({message: "Quizz criado com sucesso"},{status: 201})

    } catch (e)
    {
        console.log(e)
        return Response.json({message: e},{status: 500})
    }

    return 
    

}