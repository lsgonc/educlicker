"use client"
import {Schema, ZodError, ZodIssue, z} from "zod"
import { useSession } from "next-auth/react";
import { ChangeEvent, ChangeEventHandler, FormEvent, Fragment, useEffect, useState } from "react";
import {SubmitHandler, useFieldArray, useForm, useFormContext} from "react-hook-form"
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";


type FormTypes = {
    titulo: string, 
    quizData: {
        question: string,
        respostaCorreta: string ,
        respostas: string[]
    }[] | undefined
}


  

async function fetcher(id: string){
    const res = await fetch(`/api/prisma/getQuiz/`, {
        method: "POST",
        body: JSON.stringify({ id: id })
    });

    const quizz = await res.json();

    return quizz;
}
  

export default function Page({params} : {params: {edit: string}}) {
    
    const {data: session, status} = useSession() //pra verificar se o usuario ta logado
    const router = useRouter()

    const {data, error, mutate} = useSWR('/api/prisma/getQuiz', () => fetcher(params.edit), {
        refreshInterval: 100
    } )  

    const quizId = useParams<{edit: string}>()

    useEffect(() => {
        data?.questions?.forEach((e:any) => {
            e.respostas.pop()
        })
        setValue("titulo",data?.titulo)
        setValue("quizData",data?.questions)
    },[data])
    


    const { register, control, setValue, handleSubmit, formState: {errors, isSubmitting,  isSubmitSuccessful}, reset } = useForm<FormTypes>(
    {
        values: {titulo: data?.titulo || "", quizData: data?.questions}
    }
    )
    
    const { fields, append, prepend, remove } = useFieldArray({
        name: "quizData",
        control
    })
    



    const sendSubmit:SubmitHandler<FormTypes> = async (data) => {

        data.quizData?.forEach((e,index) => {
            e.respostas.push(e.respostaCorreta)
        })


        try {
            
            const res = await fetch(`/api/prisma/updateQuiz`, {
                method: "PUT",
                body: JSON.stringify({titulo: data.titulo, questions: data.quizData, id: quizId.edit})
            })
    
            const ver = await res.json()
        } catch (error : any) {
            console.log(error)
        }
        
    };

    useEffect(() => {
        if(isSubmitSuccessful){
            reset()
            alert("Quiz atualizado com sucesso!")
        }
    },[isSubmitSuccessful])


    if(session){
        return (
            <div className="bg-[#76ABAE] w-screen h-screen overflow-auto font-roboto">
            <div className="w-1/2 mx-auto bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold mb-4">Editar - <span className="font-normal italic">{session.user?.name}</span></h2>
                <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(sendSubmit)}>
                <div className="col-span-2">
                        <input  {...register(`titulo`, {
                            required: "Digite um título",
                            minLength: {
                                value: 3,
                                message: "O título deve ter no mínimo 3 caractéres"
                            }
                        })} className=" w-full text-black focus:outline-none border-2 focus:ring-[#76ABAE] focus:border-[#76ABAE]  rounded-lg p-3" type="text" placeholder={`Digite o título`}/>
                        {errors.titulo?.message && <div className="text-red">{errors.titulo?.message}</div>}
                    </div>
                    {
                        fields.map((field,index) => {
                            return (
                                <div className="col-span-2 grid grid-cols-2 gap-4 py-3" key={field.id}>
                                 <h1 className="font-bold text-lg">Questão {index+1}</h1>
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
                                        question: "",
                                        respostaCorreta: "",
                                        respostas: ["","",""]
                                    })}>Adicionar questão</button>  
                                    <button className="h-[40px] bg-red rounded-md" onClick={() => remove(index)}>Remover questão</button>  
                                    </div>
                                            )
                                        })
                                    }
                        <button className="text-white col-span-2 h-[40px] rounded-md bg-[#31363F]" type="submit">
                            {isSubmitting ? "Enviando..." : "Editar"}
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
