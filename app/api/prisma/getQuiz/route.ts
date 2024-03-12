import { getServerSession } from "next-auth"
import prisma from "../route"

export const dynamic = 'force-dynamic'
export const revalidate = 1

export async function GET()
{

    const quizzData = await prisma.quizzes.findMany()

    let res = Response.json(quizzData)
    
    //Para garantir que o next chame sempre o GET sem usar o SWR
    res.headers.set("Cache-Control", "s-maxage=1, stale-while-revalidate") 

    return res
}

export async function POST(req)
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