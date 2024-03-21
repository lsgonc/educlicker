import { getServerSession } from "next-auth"
import prisma from "../prisma"


export async function DELETE(req : any)
{
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    try{
        const quizzData = await prisma.quizzes.delete({
            where: {
                id: id
            }
        })
        return Response.json({msg: "Quizz deletado com sucesso!"},{status:200})
    } catch(e)
    {
        return Response.json({msg: "Falha ao deletar quizz!"},{status:500})
    }


    
}