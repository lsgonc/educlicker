export default function Page(){
    return (
        <>
        <div className="flex flex-col gap-8 text-white items-center font-roboto bg-[#31363F] p-12 rounded-lg">
            <h3 className="text-white font-bold text-5xl">Entre em contado conosco!</h3>
            <form action="" className="flex flex-col w-full md:w-1/2 gap-3">
                <label className="text-xl" htmlFor="">Nome: </label>
                <input placeholder="Digite seu nome" className="text-black focus:outline-none border-2 focus:ring-[#76ABAE] focus:border-[#76ABAE]  rounded-lg p-3 " type="text" name="" id="" />
                <label className="text-xl" htmlFor="">Email: </label>
                <input placeholder="Digite seu email" className="text-black focus:outline-none border-2 focus:ring-[#76ABAE] focus:border-[#76ABAE]  rounded-lg p-3 " type="email" name="" id="" />
                <label className="text-xl" htmlFor="">Mensagem: </label>
                <textarea placeholder="Deixe sua mensagem" className="text-black focus:outline-none border-2 focus:ring-[#76ABAE] focus:border-[#76ABAE]  rounded-lg p-3 " name="" id="" cols={30} rows={10}></textarea>
                <button type="submit" className="self-end flex h-[50px] w-full items-center rounded-md justify-center bg-[#76ABAE] ">
                    <span className="">Enviar</span>
                </button>
            </form>
        </div>
        </>
    )
}