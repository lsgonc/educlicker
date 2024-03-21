import { getServerSession } from "next-auth"
import prisma from "../prisma"

export async function PUT(req : any)
{

    const session = await getServerSession()

    if(!session)
    {
        return Response.json({message: "Não autorizado"},{status: 401}) 
    }

    const {titulo, questions, id} = await req.json()
    
    
    try{
        const quizAutor = await prisma.user.findUnique({
            where: {
                email: session.user?.email as string,
            }
        })

        const quizzData = await prisma.quizzes.update({
            where: {
                userId: quizAutor!.id,
                id: id
            },
            data: {
                titulo: titulo,
                questions: questions
            }
        })


        return Response.json({msg: "Quiz atualizado com sucesso!"}, {status:200})
    } catch (e)
    {
        return Response.json({message:e },{status:500})
    }

}