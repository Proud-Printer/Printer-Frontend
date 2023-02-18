import Button from "@/Snippets/Buttton/Button";
const Nav = () => {
  return (
    <nav className="w-full shadow-sm">
      <div className="py-5 flex justify-between items-center navbar mx-auto px-20">
        <div className="nav-link">
          <ul className="hidden md:block">
            <li className="text-xl font-semibold font-montserrat">Home</li>
          </ul>
        </div>
        <div className="logo justify-center">
          <h2 className="text-black italic font-pacifico font-black text-4xl">
            INSTANTTRACKS
          </h2>
        </div>
        <Button
          className="hidden md:block font-montserrat"
          title={'CONTACT US'}
        />
      </div>
    </nav>
  );
};

export default Nav;
