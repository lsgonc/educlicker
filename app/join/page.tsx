import Image from "next/image"

export default function Page()
{
    return (
        <>
        <main className="w-full min-w-screen h-full min-h-screen bg-[#D9E0D4] flex justify-center items-center">
            <div className="bg-[#2F364D] w-[28rem] h-lg rounded-3xl flex flex-col justify-start py-20 px-10 gap-5">
            
            <Image src="/reset_icon.svg" alt="Icone de reset" width={30} height={30} ></Image>
            <input className="rounded-3xl p-2 text-center" type="text" placeholder="GAME PIN" name="" id="" />
            
            </div>
        </main> 
        </>
    )
}