import Image from "next/image";

export default function Home() {
  return (
   <main className="w-full min-w-screen h-full min-h-screen bg-[#D9E0D4] flex justify-center items-center">
    <div className="bg-[#2F364D] w-[28rem] h-[32rem] rounded-3xl flex flex-col justify-start items-center gap-8">
      <h1 className="text-white mt-12 text-3xl font-semibold">BEM-VINDO</h1>

      <p className="text-white my-4">O QUE DESEJA FAZER?</p>

      <button className="bg-[#212634] my-4 w-80 h-16 rounded-3xl">
        <h1 className="text-white">ENTRAR EM UMA CLASSE</h1>
      </button>

      <button className="bg-[#212634] my-4 w-80 h-16 rounded-3xl">
        <h1 className="text-white">LOGIN</h1>
      </button>
      
    </div>
   </main> 
  );
}
 