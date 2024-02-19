import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";

type props = {
    text: string,
    button_text: string
}

export default function Wrapper(props: { text: string; button_text: string; }) {
    return (
        <>
        <div className="flex md:mx-40 bg-comp_default rounded-md my-20 py-8 flex justify-between items-center px-10 sm:px-20">
            <h2 className="font-bold">{props.text}</h2>
           <button>
            <div className="bg-bg_default w-44 py-4 rounded-md text-white">
            <p>{props.button_text}</p>
            </div>
        </button>
        </div>
        </>
    );
}