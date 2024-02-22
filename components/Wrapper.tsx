import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";

type props = {
    text: string,
    button_text: string
}

export default function Wrapper(props: { text: string; button_text: string; }) {
    return (
        <>
        <div className="flex md:mx-40 bg-comp_default rounded-md my-20 py-8 justify-between items-center px-10 sm:px-20">
            <h2 className="font-bold">{props.text}</h2>
            <button className="relative flex h-[50px] w-40 items-center rounded-md justify-center overflow-hidden bg-bg_default text-white shadow transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-bg_dark before:duration-500 before:ease-out hover:shadow-bg_dark hover:before:h-56 hover:before:w-56">
            <span className="relative z-10">{props.button_text}</span>
            </button>
         </div> 
        </>
    );
}