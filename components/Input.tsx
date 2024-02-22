export default function Input(props: {type: string})
{
    return(
        <input type={props.type} className={`bg-[#D9E0D4] my-4 w-80 h-12 rounded-xl text-black text-xl ps-1`} />
    );
}