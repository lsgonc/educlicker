"use client"
import {Schema, ZodError, ZodIssue, z} from "zod"
import { useSession } from "next-auth/react";
import { ChangeEvent, ChangeEventHandler, FormEvent, Fragment, useEffect, useState } from "react";
import {SubmitHandler, useFieldArray, useForm} from "react-hook-form"
import { useRouter } from "next/navigation";


type FormTypes = {
    quizData: {
        id: number,
        question: string,
        respostaCorreta: string,
        respostas: string[]
    }[]
    
}

export default function Page() {
    
    const {data: session, status} = useSession() //pra verificar se o usuario ta logado
    const router = useRouter()
    const [nextId, setNextId] = useState<number>(1);

    const { register, control, handleSubmit, formState: {errors, isSubmitting,  isSubmitSuccessful}, reset } = useForm<FormTypes>(
        {
            defaultValues: {
                quizData: [{
                    id: 0,
                    question: "",
                    respostaCorreta: "",
                    respostas: ["","",""]
                }]
            }
        }
    )



    const { fields, append, prepend, remove } = useFieldArray({
        name: "quizData",
        control
    })



    const sendSubmit:SubmitHandler<FormTypes> = async (data) => {

        data.quizData.forEach((e,index) => {
            e.id = index+1
            e.respostas.push(e.respostaCorreta)
        })

        console.log(data)
        

        try {
            const res = await fetch("/api/prisma/createQuiz", {
                method: "POST",
                body: JSON.stringify({author: session?.user?.name, questions: data.quizData})
            })
    
            const ver = await res.json()
        } catch (error : any) {
            console.log(error)
        }
        
    };

    useEffect(() => {
        if(isSubmitSuccessful){
            reset()
            alert("Quiz criado com sucesso!")
        }
    },[isSubmitSuccessful])


    if(session){
        return (
            <div className="bg-[#76ABAE] w-screen h-screen">
            <div className="w-1/2 mx-auto bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-4">Criar Quizz - <span className="font-normal italic">{session.user?.name}</span></h2>
                <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(sendSubmit)}>
                    {
                        fields.map((field,index) => {
                            return (
                                <Fragment key={field.id}>
                                 <div className="col-span-2">
                                    <input  {...register(`quizData.${index}.question`, {
                                        required: "Digite uma questão",
                                        minLength: {
                                            value: 6,
                                            message: "A questão deve ter no mínimo 6 caractéres"
                                        }
                                    })} className=" w-full text-black focus:outline-none border-2 focus:ring-[#76ABAE] focus:border-[#76ABAE]  rounded-lg p-3" type="text" placeholder={`Questão ${index+1}`}/>
                                    {errors.quizData?.[index]?.question?.message && <div className="text-red">{errors.quizData[index]?.question?.message}</div>}
                                    </div>

                                    <div>
                                    <input {...register(`quizData.${index}.respostaCorreta`, {
                                        required: "Digite a resposta correta"
                                    })} className="w-full text-black focus:outline-none border-2 focus:ring-[#76ABAE] focus:border-[#76ABAE]  rounded-lg p-3" type="text" placeholder="Resposta Correta"/>
                                    {errors.quizData?.[index]?.respostaCorreta?.message && <div className="text-red">{errors.quizData[index]?.respostaCorreta?.message}</div>}
                                    </div>

                                    <div>
                                    <input {...register(`quizData.${index}.respostas.${0}`, {
                                        required: "Digite as respostas"
                                    })} className="w-full text-black focus:outline-none border-2 focus:ring-[#76ABAE] focus:border-[#76ABAE]  rounded-lg p-3" type="text" placeholder="Resposta 1"/>
                                     {errors.quizData?.[index]?.respostas?.[0]?.message && <div className="text-red">{errors.quizData?.[index]?.respostas?.[0]?.message}</div>}
                                    </div>

                                    <div>
                                    <input {...register(`quizData.${index}.respostas.${1}`, {
                                        required: "Digite as respostas"
                                    })} className="w-full text-black focus:outline-none border-2 focus:ring-[#76ABAE] focus:border-[#76ABAE]  rounded-lg p-3" type="text" placeholder="Resposta 2"/>
                                    {errors.quizData?.[index]?.respostas?.[1]?.message && <div className="text-red">{errors.quizData?.[index]?.respostas?.[1]?.message}</div>}
                                    </div>

                                    <div>
                                    <input {...register(`quizData.${index}.respostas.${2}`, {
                                        required: "Digite as respostas"
                                    })} className="w-full text-black focus:outline-none border-2 focus:ring-[#76ABAE] focus:border-[#76ABAE]  rounded-lg p-3" type="text" placeholder="Resposta 3"/>
                                    {errors.quizData?.[index]?.respostas?.[2]?.message && <div className="text-red">{errors.quizData?.[index]?.respostas?.[2]?.message}</div>}
                                    </div>
                                    <button className="h-[40px] bg-green rounded-md" onClick={() => append({
                                        id: 0,
                                        question: "",
                                        respostaCorreta: "",
                                        respostas: ["","",""]
                                    })}>Adicionar questão</button>  
                                    <button className="h-[40px] bg-red rounded-md" onClick={() => remove(index)}>Remover questão</button>  
                                    </Fragment>
                                            )
                                        })
                                    }
                        <button className="text-white col-span-2 h-[40px] rounded-md bg-[#31363F]" type="submit">
                            {isSubmitting ? "Enviando..." : "Criar Quiz"}
                        </button>
                </form>   
            </div>
            </div>
        );
    } else {
        return (
            router.push("/")
        )
    }
}
