import Button from "@/components/Button";

export default function Login() {
    return (
        <main className="w-full min-w-screen h-full min-h-screen bg-[#D9E0D4] flex justify-center items-center">
            <div className="bg-[#2F364D] w-[28rem] h-[32rem] rounded-3xl flex flex-col justify-center items-center ">

                <label htmlFor="usuario" className="flex flex-col justify-center items-start text-white">
                    Nome de usuário
                    <Button nome="usuario" text="" tipo_input="text" color="bg-[#D9E0D4]" valor=""/>
                </label>
                <label htmlFor="senha" className="flex flex-col justify-center items-start text-white">
                    Senha
                    <Button nome="senha" text="" tipo_input="text" color="bg-[#D9E0D4]" valor=""/>
                </label>

            </div>
        </main>
    );
}