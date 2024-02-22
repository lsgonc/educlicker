import Button from "@/components/Button";
import Input from "@/components/Input"

export default function Cadastro() {
    return (
        <main className="w-full min-w-screen h-full min-h-screen bg-[#D9E0D4] flex justify-center items-center">

            <form className="bg-[#2F364D] w-[28rem] h-fit rounded-3xl flex flex-col justify-center items-center py-4">
                <label htmlFor="usuario" className="flex flex-col text-white"> Nome de usuário </label>
                <Input type="text"/>
                
                <label htmlFor="usuario" className="flex flex-col text-white"> Email </label>
                <Input type="text"/>

                <label htmlFor="usuario" className="flex flex-col text-white"> Data </label>
                <Input type="date"/>

                <label htmlFor="usuario" className="flex flex-col text-white"> Senha </label>
                <Input type="password"/>

                <input type="radio" name="Professor_Aluno" className="w-[1.5rem] h-[1.5rem]" value="Professor"/>
                <label htmlFor="Professor_Aluno">Professor</label>
                <input type="radio" name="Professor_Aluno" className="w-[1.5rem] h-[1.5rem]" value="Aluno"/>
                <label htmlFor="Professor_Aluno">Aluno</label>

                <Button text="CADASTRAR"/>

                
            </form>

        </main>
    );
}