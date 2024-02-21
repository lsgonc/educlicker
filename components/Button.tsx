export default function Button(props: {text: string})

{
    return(
      <button className="bg-[#212634] my-4 w-80 h-16 rounded-3xl">
        <h1 className="text-white">{props.text}</h1>
      </button>
    );
}
/*
Botão à ser
*/