import axios from 'axios';
import { useRouter } from 'next/router';
import Cookie from 'universal-cookie';

const Nav = () => {
  const cookies = new Cookie();
  const router = useRouter();

  const user = cookies.get('token');
  const id = cookies.get('id');

  const handleLogout = async () => {
    cookies.remove('token', { path: '/' });
    cookies.remove('id', { path: '/' });
    cookies.remove('email', { path: '/' });

    axios
      .put('/api/dj/logout/' + id)
      .then((res) => {
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <nav className="w-full shadow-sm bg-primary">
      <div className="py-5 flex justify-between items-center navbar mx-auto px-20">
        <div className="nav-link">
          <ul className="hidden md:block">
            <li className="text-xl font-semibold font-montserrat">Home</li>
          </ul>
        </div>
        <div className="logo justify-center">
          <h2 className="italic font-pacifico font-black text-2xl md:text-4xl mx-auto">
            INSTANTTRACKS
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
