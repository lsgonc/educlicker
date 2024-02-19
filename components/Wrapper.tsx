import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";

type props = {
    text: string,
    button_text: string
}

export default function Wrapper(props: { text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; button_text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) {
    return (
        <>
        <div className="flex mx-40 bg-comp_default rounded-md my-20 py-8 flex justify-between items-center px-20">
            <h2>{props.text}</h2>
           <button>
            <div className="bg-bg_default px-10 py-4 rounded-md text-white">
            <p>{props.button_text}</p>
            </div>
        </button>
        </div>
        </>
    );
}