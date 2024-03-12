
"use client"

import MessageList from "@/components/MessageList";
import { useSession } from "next-auth/react";
import { setConfig } from "next/config";
import Image from "next/image"
import { useEffect, useState } from "react"
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Socket, io } from "socket.io-client";
import { useRouter, useSearchParams } from "next/navigation";
import { getServerSideProps, getStaticProps } from "next/dist/build/templates/pages";
import useSWR from "swr";
import Chat from "@/components/Chat";

let socket: Socket | undefined

async function fetcher(id : string)
{
    const res = await fetch(`http://localhost:3000/api/prisma/getQuiz/`, {
        method: "POST",
        body: JSON.stringify({id: id})
    })

    
    const quizz = await res.json()


    return quizz
}

export default function Page({params} : {params : {id:string}})
{
    //Usando SWR para pegar todos os quizzes
    const {data, error} = useSWR(`/api/prisma/getQuiz/id`, () => fetcher(params.id)) 

    //pega o gamePin pra conectar na sala
    const searchParam = useSearchParams()
    const gamePin = searchParam.get("quizId")


    const [pinInvalido, setPinInvalido] = useState(false) //por padrão, o quiz existe, a n ser que o server emita o evento pin-invalido
    const [host, setHost] = useState() //por padrão, que entra NÃO é o host do quiz

    const { data: session, status } = useSession()
   
    const [vencedores, setVencedores] = useState(null)

    const [connectedPlayers, setConnectedPlayer] = useState(1)


    let user = "anonimo"

    if(session)
        user=session.user?.name

    useEffect(() => {
        socket = io("http://localhost:8080")

        socket.emit("join_game", {roomId: gamePin, nickname: user} )
        
        socket.on("joined",() => {
            console.log("JOINEDD")
        })

        //Verifica se o game existe em primeiro lugar, se não, renderiza pagina de game inexistente
        socket.on("pin-invalido", () => {
            console.log("pin-invalido")
            setPinInvalido(true)
        })        

        socket.on("disconnected", (data) => {
            setConnectedPlayer((e) => data)
        })

        //Seta o host do game
        socket.on("usuario-conectado", (data) => {
            console.log("emitiu um evento pra sala")
            console.log("O host desse game é: ", data.gameHost)
            setHost((e) => data.gameHost)
            setConnectedPlayer((e) => data.connectedPlayers)
        })

        socket.on("troca-questao", (res) => {
            setAtiva((e) => res.gameActiveQuestion) //passa pra proxima
            setDisable((e) => 0) //reativa o botao
            
            
        })

        //server emite => quiz acabou => client manda os resultados
        socket.on("quiz-acabou", () => {
            setAcabou((e) => true)
        } )

        //server devolve os vencedores
        socket.on("quiz-terminou", (resultado) => {
            console.log("O quiz acabou em")
            setVencedores((e) => resultado)
            
        })


        //atualiza o estado do quiz
        socket.on("update", (data) => {
            console.log(data.gameStarted)
            setIniciar((e) => data.gameStarted) 
            setUpdate((e) => data.gameTimer)
            setAtiva((e) => data.gameActiveQuestion)
            setConnectedPlayer((e) => data.connectedPlayers)
            console.log("game ta sendo uptadted")
        })

        return (() => {
            socket?.disconnect()
        })
    }, [])


    
  

    //Cores possiveis para o background do botai
    const colorVariants = {
        padrao: 'bg-bg_dark',
        desativado: 'disabled:opacity-50 disabled:hover:bg-bg_dark',
        resposta_correta: 'bg-green',
        resposta_incorreta: 'bg-red',
      }
      
    const [corBtn, setCor] = useState("padrao")
    const [btnSelected, setSelected] = useState(0)
    const [btnSelectedId, setSelectedId] = useState("")
    const router = useRouter()
    const [choice, setChoice] = useState("");
    const [respostas, setRespostas] = useState(0);
    const [btnDisable, setDisable] = useState()
    const [mostrarCorreta, setCorreta] = useState(false)
    const [timerUpdate, setUpdate] = useState(20)//remaining time no comeco = timer

    //Variaveis de estado do Quizz

    const [iniciar, setIniciar] = useState(false)
    const [acabou, setAcabou] = useState(false)
    const [btnCor, setBtn] = useState("padrao")
    const [questaoAtiva, setAtiva] = useState(0)
    const [atual, setAtual] = useState(null)
    const [alternativaSel, setAl] = useState()
    const [resultado, setResultado] = useState({
        totalAcertos: 0,
        totalErradas: 0,
        score: 0
    })


    //Sempre que  troca de questão reseta o MOSTRA CORRETA
    useEffect(() => {
        setCorreta((e)=>!e)
        if(data)
            setAtual((e) => data[0].questions[questaoAtiva])
    },[questaoAtiva])

    useEffect(() => {
        if(choice === atual?.respostaCorreta){
            setResultado((prev) => {
                const novoR = Object.assign({},prev)
                novoR.totalAcertos+=1 //incrementa o numero de acertos totais
                return novoR
            })
        }
    },[choice])
    
    useEffect(() => {
        console.log(timerUpdate)
        socket?.emit("timer-atualizou",timerUpdate)
    }, [timerUpdate])

    useEffect(() => {
        if(data)
            setAtual((e) => data[0].questions[questaoAtiva])
    },[data])

    useEffect(() => {
        //emitir o score só uma vez => quando o quiz tiver acabado
        if(acabou)
            socket?.emit("terminou", {nome: user, score: resultado.totalAcertos, roomId: gamePin})
    },[acabou])

    function initQuiz()
    {
        console.log("init quiz com pin", gamePin)
        socket?.emit("start-game", gamePin, data[0].questions.length)
        setIniciar(true)   
        setAtiva((e) => 0) 
    
    }
 
    function handleClick(e) {
        setCorreta((e)=>!e)
        setDisable(1)
        setSelected(1)
        setSelectedId(e.target.id)
        
        if(questaoAtiva == data[0].questions.length)
            setAtiva(0)

        setChoice(e.target.id)
        

    }

    if(error) return <h1>Ocorreu um erro</h1>
    if(!data) return <h1>Loading</h1>

    //PIN INVALIDO => MOSTRA PAGINA DE PIN INVALIDO
    if(pinInvalido)
        return(
            <div className="w-screen h-screen flex justify-center items-center">
                <div className="rounded-xl bg-comp_default flex justify-center items-center w-6/12 h-1/2">
                    <h1 className="text-lg font-bold">VOCE DIGITOU UM PIN INVALIDO</h1>
                </div>
            </div>
        )

    //USUARIO É O HOST => MOSTRA A PAGINA DE HOST
    console.log(session?.user?.name)
    if(host===session?.user?.name){
        //É O HOST => FORNECE AS OPÇÕES PARA CONTROLAR O QUIZ
        if(!iniciar){
        return(
            <main className="w-full h-screen flex flex-col justify-center items-center gap-3 bg-[#bcc2b8] p-5">
                <h1>VOCE É O HOST</h1>
                <button disabled={(connectedPlayers>=2) ? false : true} onClick={initQuiz}  className="relative flex h-[50px] w-40 items-center rounded-md justify-center overflow-hidden bg-bg_default text-white shadow transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-bg_dark before:duration-500 before:ease-out hover:shadow-bg_dark hover:before:h-56 hover:before:w-56">
                <span className="relative z-10">Iniciar Quiz</span>
                </button>
                <h2 className="text-lg font-bold">Compartilhe o GAME PIN: {gamePin}</h2>
                <h3>Players online: {connectedPlayers}</h3>
            </main>
        )    
        }
    } else {
        //Jogo ainda n startou
        if(!iniciar)
        {
            return (
                <main className="w-full h-screen flex flex-col justify-center items-center gap-3 bg-[#bcc2b8] p-5">
                <button disabled={true} className="relative flex h-[50px] w-40 items-center rounded-md justify-center overflow-hidden bg-bg_default text-white shadow transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-bg_dark before:duration-500 before:ease-out hover:shadow-bg_dark hover:before:h-56 hover:before:w-56">
                <span className="relative z-10">Aguarde o HOST iniciar o jogo!</span>
                </button>
                <h3>Players online: {connectedPlayers}</h3>
                </main>
            )
        }

    }

    
    
    
      if(acabou){
        return(
            <div className="px-80 w-full min-w-screen h-full min-h-screen h-full w-full bg-comp_default flex justify-center">
            <main className="w-full h-80 mb-32 flex flex-col items-start justify-between gap-3 bg-[#bcc2b8] p-5">
                <h1 className="text-center font-bold text-4xl">Estatisticas: </h1>
                <h1 className="text-center font-bold text-4xl">Overall: {Math.floor((resultado.totalAcertos/data[0].questions.length)*100)}%</h1>
                <span className="self-start font-bold">Total de questões: {data[0].questions.length}</span>
                <span className="self-start font-bold">Total acertos: {resultado.totalAcertos}</span>
                <span className="self-start font-bold">Erros: {data[0].questions.length - resultado.totalAcertos}</span>
                <span className="self-start font-bold">Vencedores: </span>
                <ol>
                {
                    vencedores ? vencedores.map((e,index) =>  <li key={index} className="self-start">{index+1}º Lugar: {e.nome}, Pontuação: {e.score} </li>)
                     : "Espere o resultado"
                }
                </ol>
            </main> 
        </div>
        )
    }
    else{
    return (
        <>
        <div className="px-80 w-full min-w-screen h-full min-h-screen h-full w-full bg-comp_default flex flex-col justify-center">
            <main className="w-full h-80 mb-32 flex items-center justify-between gap-10">
            <CountdownCircleTimer
                isPlaying
                initialRemainingTime={timerUpdate}
                duration={20}
                size={100}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
                onUpdate={(remainingTime) => {
                    
                }}
                onComplete={() => {
                    
                    //emitindo evento para trocar de  pergunta
                    

                    
                    
                    
                    return { shouldRepeat: true, delay: 0.5}
                  }}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
            <div className=" bg-[#bcc2b8] h-full flex flex-col gap-2 justify-center items-center px-10">
            <span className="self-start font-bold">Acertos: {resultado.totalAcertos}</span>
            <h1 className="text-center font-bold text-4xl">{atual.question}</h1>
            <span className="self-start">{questaoAtiva+1}/{data[0].questions.length}</span>
            </div>
            <div className="flex flex-col">
            <Chat />
            </div>
            </main> 

            
            <aside className="w-full bg-comp_default grid grid-cols-2 gap-5 max-sm:grid-cols-1">
                {//Gerando os botoes para cada resposta
                atual.respostas.map((res,index) => (
                <button key={index} id={res} disabled={btnDisable} onClick={handleClick} className={`${btnSelectedId == res ? 'opacity-50' : ''} ${(res===atual.respostaCorreta) && mostrarCorreta ? 'bg-green' : 'bg-bg_dark'} relative p-5 text-white w-25 rounded-md justify-center  ${btnDisable ? '' : 'hover:bg-[#bcc2b8]'}`} type="button">{res}</button>
                ))
                }
                
            </aside>
        </div>
        </>
    )
    }
   
  }
      