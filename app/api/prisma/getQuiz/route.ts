import { getServerSession } from "next-auth"
import prisma from "../prisma"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'
export const revalidate = 1

export async function GET()
{
    const session = await getServerSession()

    if(session) {
        if(session.user!.name){
            const quizzData = await prisma.quizzes.findMany({
                where: {
                    autor: session.user?.name
                }
            })
            let res = Response.json(quizzData)
        
            //Para garantir que o next chame sempre o GET sem usar o SWR
            res.headers.set("Cache-Control", "s-maxage=1, stale-while-revalidate") 

            return res
        }

        
    }
    
    return Response.json({message: "Voce precisa estar logado!"})
}

export async function POST(req : any)
{
    const body = await req.json()
    
    console.log(body.id)

    const quizzData = await prisma.quizzes.findMany({
        where: {
            id: body.id
        }
    })


    return Response.json(quizzData)
}