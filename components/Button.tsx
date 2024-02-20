export default function Button(props: {button_text: string})
{
    return(
        <button>
            <div className="bg-bg_default px-10 py-4 rounded-md text-white">
            <p>{props.button_text}</p>
            </div>
        </button>
    );
}