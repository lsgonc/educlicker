"use client"
import { useSession } from "next-auth/react";
import { useState } from "react";


export default function Page() {
    
    const {data: session, status} = useSession() //pra verificar se o usuario ta logado
    const [nextId, setNextId] = useState(1);

    const initialQuestion = {
        id: nextId,
        question: '',
        respostaCorreta: '',
        respostas: ['', '', ''] // Initialize with three empty strings
    };

    const [questions, setQuestions] = useState([initialQuestion]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedQuestions = [...questions];
        updatedQuestions[index][name] = value;
        setQuestions(updatedQuestions);
    };

    const handleWrongAnswerChange = (index, subIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].respostas[subIndex] = value;
        setQuestions(updatedQuestions);
    };

    const addQuestion = () => {
        setNextId((e) => e+1)
        setQuestions([...questions, { ...initialQuestion, id: nextId }]);    
    };

    const removeQuestion = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedQuestions = questions.map(question => ({
            ...question,
            respostas: [...question.respostas, question.respostaCorreta]
        }));
        
        // Here you can handle form submission, e.g., send the data to a server
        const res = await fetch("/api/prisma/createQuiz", {
            method: "POST",
            body: JSON.stringify({author: session?.user?.name, questions: updatedQuestions})
        })

        const ver = await res.json()

        setQuestions([initialQuestion])
    };

    if(session){
        return (
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-4">Criar Quizz - <span className="font-normal italic">{session.user?.name}</span></h2>
                <form onSubmit={handleSubmit}>
                    {questions.map((question, index) => (
                        <div key={index} className="mb-8">
                            <div className="mb-4">
                                <label htmlFor={`question-${index}`} className="block text-gray-700 font-semibold mb-2">Pergunta {index + 1}</label>
                                <input
                                    type="text"
                                    id={`question-${index}`}
                                    name="question"
                                    placeholder="Qual a capital do Brasil?"
                                    value={question.question}
                                    onChange={(e) => handleChange(e, index)}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor={`respostaCorreta-${index}`} className="block text-gray-700 font-semibold mb-2">Resposta correta</label>
                                <input
                                    type="text"
                                    id={`respostaCorreta-${index}`}
                                    name="respostaCorreta"
                                    placeholder="Brasília"
                                    value={question.respostaCorreta}
                                    onChange={(e) => handleChange(e, index)}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 font-semibold mb-2">Respostas erradas</label>
                                {question.respostas.map((answer, subIndex) => (
                                    <input
                                        key={subIndex}
                                        type="text"
                                        placeholder={`Resposta errada ${subIndex + 1}`}
                                        value={answer}
                                        onChange={(e) => handleWrongAnswerChange(index, subIndex, e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500 mb-2"
                                    />
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <button type="button" onClick={() => removeQuestion(index)} className="text-red">Remove Question</button>
                                <button type="button" onClick={addQuestion} className="text-green">Add Question</button>
                            </div>
                            
                        </div>
                    ))}
                    <div className="text-center">
                        
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none ml-4">Submit</button>
                    </div>
                </form>
            </div>
        );
    } else {
        return (<h1>VOCE PRECISA ESTAR LOGADO PARA CRIAR UM QUIZZ</h1>)
    }
}
