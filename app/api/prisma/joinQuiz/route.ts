import { getServerSession } from "next-auth"
import prisma from "../prisma"

export async function POST(req : any)
{
    const body = await req.json()
    
    try{

        const quizzData = await prisma.quizzes.findMany({
            where: {
                id: body.id
            }
        })

        return Response.json(quizzData, {status:200})
    } catch (e)
    {
        return Response.json({message:e },{status:500})
    }

}