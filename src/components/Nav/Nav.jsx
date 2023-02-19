import { useRouter } from 'next/router';
import Cookie from 'universal-cookie';

const Nav = () => {
  const cookies = new Cookie();
  const router = useRouter();

  const user = cookies.get('token');

  const handleLogout = () => {
    cookies.remove('token');
    window.location.href = '/';
  };
  return (
    <nav className="w-full shadow-sm">
      <div className="py-5 flex justify-between items-center navbar mx-auto px-20">
        <div className="nav-link">
          <ul className="hidden md:block">
            <li className="text-xl font-semibold">Home</li>
          </ul>
        </div>
        <div className="logo justify-center">
          <h2 className="text-black font-inter font-black text-4xl">
            OPERATIC
          </h2>
        </div>
        {user ? (
          <div className="nav-link">
            <ul className="hidden md:block">
              <li
                className="text-xl text-[#fff] font-semibold py-2 px-4 bg-red-500 hover:bg-red-700 cursor-pointer rounded-lg
              "
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <button
            className="button  rounded-lg px-5 py-3 font-semibold font-inter hidden md:block"
            role="button"
          >
            CONTACT US
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
