

const Nav = () => {
  return (
    <nav className="w-full">
        <div className="py-5 flex justify-between items-center navbar mx-auto px-20">
            <div className="nav-link">
                <ul className="hidden md:block">
                    <li className="text-xl font-semibold">Home</li>
                </ul>
            </div>
            <div className="logo justify-center">
                <h2 className="text-black font-inter font-black text-4xl">OPERATIC</h2>
            </div>
            <button className="button outline outline-2 rounded-lg px-5 py-3 font-semibold font-inter hidden md:block" role="button">
                CONTACT US
            </button>
        </div>
    </nav>
  
  )
};

export default Nav;
