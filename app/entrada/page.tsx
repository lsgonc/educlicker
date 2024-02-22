import Button from "@/components/Button";


export default function Home() {
  return (
   <main className="w-full min-w-screen h-full min-h-screen bg-[#D9E0D4] flex justify-center items-center">
    <div className="bg-[#2F364D] w-[28rem] h-[32rem] rounded-3xl flex flex-col justify-start items-center gap-8">
      <h1 className="text-white mt-12 text-3xl font-semibold">BEM-VINDO</h1>

      <p className="text-white my-4">O QUE DESEJA FAZER?</p>

      <Button text="ENTRAR EM UMA SALA"/>
      <Button text="LOGIN"/>
      
    </div>
   </main> 
  );
}
 