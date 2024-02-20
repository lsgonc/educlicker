export default function Navbar()
{
    return (
        <>
        <nav>
            <div className="flex bg-comp_default py-6 mb-20 px-20 max-sm:px-5 ">
                <h1 className="font-bold"><a href="">LOGO</a></h1>
                <ul className="flex ml-auto gap-5">
                    <li><a className="hover:text-bg_default" href="">Home</a></li>
                    <li><a className="hover:text-bg_default" href="/login">Login</a></li>
                    <li><a className="hover:text-bg_default" href="">Sobre</a></li>
                    <li><a className="hover:text-bg_default" href="">Contato</a></li>
                </ul>
            </div>
        </nav>
        </>
    );
}