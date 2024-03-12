import ScrollAnimation from "./ScrollAnimation";

export default function Page(props)
{

    return (
        <div className="flex flex-col gap-2 lg:mx-40 mx-5 mt-20">
            <h2 className="text-2xl font-roboto font-bold">{props.text}</h2>
            <ScrollAnimation inViewClass={"animate-fade-right animate-duration-[1000ms]"} outViewClass={""}>
                <div className="border-2 border-[#222831] w-1/4"></div>
            </ScrollAnimation>
        </div>
    )
}
