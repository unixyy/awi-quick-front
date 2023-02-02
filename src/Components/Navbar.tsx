
function Navbar() {
    return (
        <nav className="flex bg-white px-2 sm:px-4 py-6 dark:bg-emerald-800 fixed w-full z-20 top-0 left-0">
            <div className="container flex">
                <a href="/" className="flex-wrap flex items-center justify-between text-white text-2xl font-bold my-auto cursor-pointer ml-5 bezier-scale hover:text-white">Festival du Jeu !</a>
                <div className="ml-10 border-r-2"></div>
                <a className="ml-10 my-auto cursor-pointer text-xl text-white hover:text-orange-500 bezier-scale">Jeux</a>
                <a className="ml-10 my-auto cursor-pointer text-xl text-white hover:text-orange-500 bezier-scale">Zones</a>
            </div>
            <div className="container flex flex-row-reverse">
                <a className="mx-10 my-auto cursor-pointer text-xl text-white hover:text-orange-500 bezier-scale">Gestion</a>
                <button className="mx-2.5 my-auto cursor-pointer text-sm text-white hover:border-orange-500 bezier-scale">Sign In</button>
                <button className="mx-2.5 my-auto cursor-pointer text-sm text-white hover:border-orange-500 bezier-scale">Sign Up</button>
            </div>
        </nav>
    )
}

export default Navbar