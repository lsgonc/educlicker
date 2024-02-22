import Button from "@/components/Button";
import Input from "@/components/Input"

export default function Login() {
    return (
        <main className="w-full min-w-screen h-full min-h-screen bg-[#D9E0D4] flex justify-center items-center">
            <div className="bg-[#2F364D] w-[28rem] h-[32rem] rounded-3xl flex flex-col justify-center items-center ">

                <label htmlFor="usuario" className="flex flex-col text-white">
                    Nome de usuário
                    <Input type="text"/>
                </label>
                <label htmlFor="senha" className="flex flex-col justify-center items-start text-white">
                    Senha
                    <Input type="text"/>
                </label>
                <Button text="ENTRAR" />
                <a href="/cadastro" className="text-white underline">Não possuí cadastro?</a>

            </div>
        </main>
    );
}