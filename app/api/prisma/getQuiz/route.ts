import { getServerSession } from "next-auth"
import prisma from "../prisma"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'
export const revalidate = 1

export async function GET()
{

    const session = await getServerSession()

    if(!session)
    {
        return Response.json({message: "Não autorizado"},{status: 401}) 
    }

    try {
        const quizAutor = await prisma.user.findUnique({
            where: {
                email: session.user?.email as string
            }
        })

        const quizzData = await prisma.quizzes.findMany({
            where: {
                userId: quizAutor!.id
            }
        })

        return Response.json(quizzData)
    } catch(e)
    {
        Response.json({message: e},{status: 500})
    }


    return 
}

export async function POST(req : any)
{
    const session = await getServerSession()

    if(!session)
    {
        return Response.json({message: "Não autorizado"},{status: 401}) 
    }

    const body = await req.json()
    
    try{
        const quizAutor = await prisma.user.findUnique({
            where: {
                email: session.user?.email as string
            }
        })

        const quizzData = await prisma.quizzes.findMany({
            where: {
                userId: quizAutor!.id,
                id: body.id
            }
        })

        return Response.json(quizzData, {status:200})
    } catch (e)
    {
        return Response.json({message:e },{status:500})
    }

}