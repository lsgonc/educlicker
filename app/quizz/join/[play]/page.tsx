
"use client"

import { useSession } from "next-auth/react";
import { setConfig } from "next/config";
import Image from "next/image"
import { useEffect, useState } from "react"
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Socket, io } from "socket.io-client";
import { useRouter, useSearchParams } from "next/navigation";
import { getServerSideProps, getStaticProps } from "next/dist/build/templates/pages";
import { FaUser } from "react-icons/fa";
import useSWR, { preload } from "swr";
import { SubmitHandler, useForm } from "react-hook-form";
import PreviousMap from "postcss/lib/previous-map";

interface Question {
    question: string;
    respostaCorreta: string;
    respostas: string[];
  }
  
  interface QuizData extends Array<QuizData>{
    titulo: string
    dataCriacao: Date,
    id: string;
    questions: Question[];
  }
  
  interface Player {
    nome: string;
    score: number;
  }
  
  interface GameHost {
    gameHost: string;
    connectedPlayers: number;
  }

  type formData = {
    message: string
} 

  type chatData = {
    message: string 
    gamePin: string,
    name: string,
  }
  
  let socket: Socket;
  
  async function fetcher(id: string): Promise<QuizData> {
    const res = await fetch(`/api/prisma/joinQuiz/`, {
      method: "POST",
      body: JSON.stringify({ id: id })
    });
  
    const quizz = await res.json();
  
    return quizz;
  }
  
  export default function Page({
    params
  }: {
    params: { play: string };
  }): JSX.Element {
    const { data, error, isLoading } = useSWR<QuizData>(
      `/api/prisma/joinQuiz/id`,
      () => fetcher(params.play)
    );

  
    const searchParam = useSearchParams();
    const gamePin = searchParam.get("quizId");
    
    //Chat form
    const {register, formState: {errors}, handleSubmit } = useForm<formData>()
    const [chatData , setChatData] = useState<chatData []>([])

  
    const [pinInvalido, setPinInvalido] = useState<boolean>(false);
    const [host, setHost] = useState<string | undefined>();
    const [vencedores, setVencedores] = useState<Player[] | null>(null);
    const [connectedPlayers, setConnectedPlayer] = useState<number>(1);
    const [shuffled, setShuffled] = useState<string[]>([]);
    const [timer, setTimer] = useState<number | undefined>();
    const [resetTimer, setResetTimer] = useState<number>(0);
    const [iniciar, setIniciar] = useState<boolean>(false);
    const [acabou, setAcabou] = useState<boolean>(false);
    const [questaoAtiva, setAtiva] = useState<number>(0);
    const [atual, setAtual] = useState<Question | null>();
    const [resultado, setResultado] = useState<{
      totalAcertos: number;
      totalErradas: number;
      score: number;
    }>({
      totalAcertos: 0,
      totalErradas: 0,
      score: 0
    });
  
    const { data: session, status } = useSession();
  
    let user = "anonimo";
  
    if (session) user = session.user?.name as string;
  
    useEffect(() => {
      socket = io("https://educlicker-websocket-latest.onrender.com", {
        secure: true
      });
  
      socket.emit("join_game", { roomId: gamePin, nickname: user });

  
      socket.on("pin-invalido", () => {
        setPinInvalido(true);
      });
  
      socket.on("disconnected", (data) => {
        setConnectedPlayer(data);
      });
  
      socket.on("usuario-conectado", (data: GameHost) => {
        setHost(data.gameHost);
        setConnectedPlayer(data.connectedPlayers);
      });
  
      socket.on("troca-questao", (res) => {
        setAtiva(res.gameActiveQuestion);
        setDisable(false);
        setResetTimer((e) => e + 1);
      });
  
      socket.on("quiz-acabou", () => {
        setAcabou(true);
      });
  
      socket.on("quiz-terminou", (resultado: Player[]) => {
        setVencedores(resultado);
      });
  
      socket.on("update", (data) => {
        setIniciar(data.gameStarted);
        setUpdate(data.gameTimer);
        setAtiva(data.gameActiveQuestion);
        setConnectedPlayer(data.connectedPlayers);
        setTimer(data.gameTimer);
      });

      //atualiza as mensagens do chat
      socket.on("messages", (data) => {
        
        setChatData(prev => [...prev, data])
      }) 
  
      return () => {
        socket?.disconnect();
      };
    }, []);
  
    const colorVariants = {
      padrao: "bg-bg_dark",
      desativado: "disabled:opacity-50 disabled:hover:bg-bg_dark",
      resposta_correta: "bg-green",
      resposta_incorreta: "bg-red"
    };
  
    const [corBtn, setCor] = useState<string>("padrao");
    const [btnSelected, setSelected] = useState<number>(0);
    const [btnSelectedId, setSelectedId] = useState<string>("");
    const router = useRouter();
    const [choice, setChoice] = useState<string>("");
    const [respostas, setRespostas] = useState<number>(0);
    const [btnDisable, setDisable] = useState<boolean | undefined>();
    const [mostrarCorreta, setCorreta] = useState<boolean>(false);
    const [timerUpdate, setUpdate] = useState<number>(20);
  
    useEffect(() => {
      setCorreta((e) => !e);
      if (data) setAtual(data.questions[questaoAtiva]);
    }, [questaoAtiva]);
  
    useEffect(() => {
      if (choice === atual?.respostaCorreta) {
        setResultado((prev) => {
          const novoR = { ...prev };
          novoR.totalAcertos += 1;
          return novoR;
        });
      }
    }, [choice]);
  
    useEffect(() => {
      if (data!=undefined)
      {
        console.log(data)
        setAtual(data.questions[questaoAtiva]);
      }
    }, [data]);
  
    useEffect(() => {
      if (atual) {
        setShuffled([...atual.respostas].sort(() => Math.random() - 0.5));
      }
    }, [atual]);
  
    useEffect(() => {
      if (acabou) socket?.emit("terminou", { nome: user, score: resultado.totalAcertos, roomId: gamePin });
    }, [acabou]);

    //manda mensagem pro socket
    const sendMessage: SubmitHandler<formData> = (data) => {
      socket?.emit("chat-message", {message: data.message, gamePin: gamePin, name: user })
    }
  
    function initQuiz() {
      if(data){
        socket?.emit("start-game", gamePin, data.questions.length);
        setIniciar(true);
        setAtiva(0);
     }
    }
  
    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      setCorreta((e) => !e);
      setDisable(true);
      setSelected(1);
      setSelectedId(e.currentTarget.id);
      
      if(data)
        if (questaoAtiva === (data.questions.length ?? 0)) setAtiva(0);
  
      setChoice(e.currentTarget.id);
    }
  
    if (error) return <h1>Ocorreu um erro</h1>;
    if (isLoading) return <h1>Loading</h1>;
  


    if (pinInvalido) {
      return (
        <main className="w-full h-screen font-roboto flex flex-col justify-center items-center bg-[#76ABAE] p-5">
          <div className="flex flex-col items-center gap-10">
            <div>
              <h1 className="text-4xl text-center font-bold">Voce digitou um PIN invalido!</h1>
              <span>Confira se não houve um erro de digitação ou se a sala já foi criada</span>
            </div>
            <div className="flex flex-col gap-4">
              <button disabled={false} className="relative flex h-[50px] w-40 items-center rounded-md justify-center overflow-hidden bg-bg_default text-white shadow transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-bg_dark before:duration-500 before:ease-out hover:shadow-bg_dark hover:before:h-56 hover:before:w-56">
                <span className="relative z-10">Voltar</span>
              </button>
            </div>
          </div>
        </main>
      );
    }
  
    if (host === session?.user?.name) {
      if (!iniciar) {
        return (
          <main className="w-full h-screen font-roboto flex flex-col justify-between items-center gap-32 bg-[#76ABAE] p-5">
            <div className="flex justify-center w-full ">
              <div className="polygon-1 justify-center p-12 items-center bg-white flex w-1/4 h-24 rounded-md shadow-lg">
                <h1 className="">Entre em <strong>www.educlicker.com/quiz</strong></h1>
              </div>
              <div className="polygon-2 justify-center bg-white flex flex-col w-1/4 h-24 rounded-lg shadow-lg">
                <span className="text-sm text-left text-center">Game pin: <br /></span>
                <span className="self-center text-xl"><strong>{gamePin}</strong></span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-10">
              <div>
                <h1 className="text-4xl text-center font-bold">VOCE É O HOST</h1>
                {connectedPlayers >= 2 ?
                  <span>Jogadores já conectaram! Inicie quando quiser!</span> :
                  <span>Aguarde pelos menos mais um jogador para iniciar o jogo!</span>
                }
              </div>
              <div className="flex flex-col gap-4">
                <button disabled={connectedPlayers >= 2 ? false : true} onClick={initQuiz} className={`${connectedPlayers >= 2 ? "" : "hover:animate-shake"} relative flex h-[50px] w-40 items-center rounded-md justify-center overflow-hidden bg-bg_default text-white shadow transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-bg_dark before:duration-500 before:ease-out hover:shadow-bg_dark hover:before:h-56 hover:before:w-56`}>
                  <span className="relative z-10">Iniciar Quiz</span>
                </button>
              </div>
            </div>
            <div className="flex bg-[#31363F] py-2 px-4  rounded-md opacity-80 justify-center gap-3">
              <FaUser className="fill-white" size={30} />
              <h3 className="text-white">{connectedPlayers}</h3>
            </div>
          </main>
        );
      }
    } else {
      if (!iniciar) {
        return (
          <main className="w-full h-screen font-roboto flex flex-col justify-between items-center gap-32 bg-[#76ABAE] p-5">
            <div className="flex justify-center w-full ">
              <div className="polygon-1 justify-center p-12 items-center bg-white flex w-1/4 h-24 rounded-md shadow-lg">
                <h1 className="">Entre em <strong>www.educlicker.com/quiz</strong></h1>
              </div>
              <div className="polygon-2 justify-center bg-white flex flex-col w-1/4 h-24 rounded-lg shadow-lg">
                <span className="text-sm text-left text-center">Game pin: <br /></span>
                <span className="self-center text-xl"><strong>{gamePin}</strong></span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-10">
              <div>
                <h1 className="text-4xl text-center font-bold">Aguarde o host iniciar o quiz!</h1>
              </div>
              <div className="flex flex-col gap-4">
                <button disabled={true} onClick={initQuiz} className="relative flex h-[50px] w-40 items-center rounded-md justify-center overflow-hidden bg-bg_default text-white shadow transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-bg_dark before:duration-500 before:ease-out hover:shadow-bg_dark hover:before:h-56 hover:before:w-56">
                  <span className="relative z-10">Aguarde</span>
                </button>
              </div>
            </div>
            <div className="flex bg-[#31363F] py-2 px-4  rounded-md opacity-80 justify-center gap-3">
              <FaUser className="fill-white" size={30} />
              <h3 className="text-white">{connectedPlayers}</h3>
            </div>
          </main>
        );
      }
    }
  
    if (acabou && data) {
      return (
        <div className="px-80 w-full min-w-screen h-full min-h-screen h-full w-full bg-comp_default flex justify-center">
          <main className="w-full h-80 mb-32 flex flex-col items-start justify-between gap-3 bg-[#bcc2b8] p-5">
            <h1 className="text-center font-bold text-4xl">Estatisticas: </h1>
            <h1 className="text-center font-bold text-4xl">Overall: {Math.floor((resultado.totalAcertos / data.questions.length) * 100)}%</h1>
            <span className="self-start font-bold">Total de questões: {data.questions.length}</span>
            <span className="self-start font-bold">Total acertos: {resultado.totalAcertos}</span>
            <span className="self-start font-bold">Erros: {data.questions.length - resultado.totalAcertos}</span>
            <span className="self-start font-bold">Vencedores: </span>
            <ol>
              {vencedores ? vencedores.map((e, index) => <li key={index} className="self-start">{index + 1}º Lugar: {e.nome}, Pontuação: {e.score} </li>)
                : "Espere o resultado"}
            </ol>
          </main>
        </div>
      );
    } else if (data) {
      return (
        <div className="px-80 w-full min-w-screen h-full min-h-screen h-full w-full bg-comp_default flex flex-col justify-center">
          <main className="w-full h-80 mb-32 flex items-center justify-between gap-10">
            <CountdownCircleTimer
              isPlaying
              key={resetTimer}
              initialRemainingTime={timerUpdate}
              duration={20}
              size={100}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[7, 5, 2, 0]}
              onComplete={() => {
                return { shouldRepeat: true }
              }}
            >
              {({ remainingTime }) => remainingTime = timer ?? 0}
            </CountdownCircleTimer>
            <div className=" bg-[#bcc2b8] h-full flex flex-col gap-2 justify-center items-center px-10">
              <span className="self-start font-bold">Acertos: {resultado.totalAcertos}</span>
              <h1 className="text-center font-bold text-4xl">{atual?.question}</h1>
              <span className="self-start">{questaoAtiva + 1}/{data.questions.length}</span>
            </div>
            <div className="flex flex-col">
            <div className='flex flex-col items-start justify-between p-4 bg-white h-72 rounded-lg'>
              <ul>
                {chatData.map((e,index) => (
                  <li key={index}><span>{e.name}:</span> {e.message}</li>
                ))}
              </ul>
                <div className="self-start">
                <form onSubmit={handleSubmit(sendMessage)} >
                  <input
                    {...register("message")}
                    className='flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2'
                    placeholder="Digite sua mensagem..."
                  ></input>
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none mt-3 bg-black hover:bg-[#111827E6] h-10 px-4 py-2" type="submit">Enviar</button>
                </form>
                </div>
              </div>
            </div>
          </main>
  
          <aside className="w-full bg-comp_default grid grid-cols-2 gap-5 max-sm:grid-cols-1">
            {shuffled.map((res, index) => (
              <button key={index} id={res} disabled={btnDisable} onClick={handleClick} className={`${btnSelectedId == res ? 'opacity-50' : ''} ${(choice === atual?.respostaCorreta && btnSelectedId == res) ? 'bg-green' : ''} ${(choice != atual?.respostaCorreta && btnSelectedId == res) ? 'bg-red' : ''}  bg-bg_dark relative p-5 text-white w-25 rounded-md justify-center  ${btnDisable ? '' : 'hover:bg-[#bcc2b8]'}`} type="button">{res}</button>
            ))}
          </aside>
        </div>
      );
    }

    return (<h1>Erro</h1>)
  }