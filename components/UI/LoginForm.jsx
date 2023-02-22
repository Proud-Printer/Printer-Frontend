import { detailsAtom } from 'atoms/detailsAtom';
import { loaderAtom } from 'atoms/loaderAtom';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { SmallSpinner } from '../General/Spinner';
import Cookie from 'universal-cookie';

const LoginForm = ({ setForm }) => {
  const [loader, setLoading] = useRecoilState(loaderAtom);
  const [details, setDetails] = useRecoilState(detailsAtom);
  const router = useRouter();
  const cookie = new Cookie();

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading({
      isLoading: true,
    });
    try {
      const response = await axios.post('/api/dj/login', {
        email: details.email,
        password: details.password,
      });

      if (response.status === 200) {
        toast.success('Login Successful');
        setLoading({
          isLoading: false,
        });
        router.push('/dj/dashboard');
        cookie.set('token', response.data.token, { path: '/' });
        cookie.set('id', response.data.user.id, { path: '/' });
        cookie.set('djOnline', response.data.user.isDjOnline, { path: '/' });
        cookie.set('djName', response.data.user.name, { path: '/' });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading({
        isLoading: false,
      });
    }
  };
  return (
    <div>
      <form
        className="
      w-full max-w-lg mx-auto rounded-lg p-3 text-gray-700
      "
        onSubmit={handleSubmit}
      >
        <div
          className="
        flex items-center justify-between p-3 border-b border-[#FEE715FF]
        "
        >
          <h2>
            <span className="font-bold text-2xl text-[#FEE715FF]"> Login</span>
          </h2>
          <button
            onClick={() => setForm('signup')}
            className="border border-[#d2601a] text-[#FEE715FF] rounded-lg px-5 py-2 font-semibold font-inter md:block"
            type="button"
          >
            Sign Up
          </button>
        </div>
        <div
          className="
        flex flex-col justify-between p-3 border-b border-[#FEE715FF]
        "
        >
          <label
            htmlFor="email"
            className="text-md font-semibold text-[#FEE715FF]"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 text-[#FEE715FF] border rounded-lg focus:outline-none focus:shadow-outline border-[#FEE715FF] bg-transparent
          "
            name="email"
            value={details.email}
            onChange={handleChange}
          />
        </div>
        <div
          className="
        flex flex-col justify-between p-3 border-b border-[#FEE715FF]
        "
        >
          <label
            htmlFor="password"
            className="text-md font-semibold text-[#FEE715FF]"
          >
            Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 text-[#FEE715FF] border rounded-lg focus:outline-none focus:shadow-outline border-[#FEE715FF] bg-transparent"
            id="password"
            name="password"
            value={details.password}
            onChange={handleChange}
          />
        </div>
        {details.password.length > 5 && (
          <button
            type="submit"
            className={`
        w-full px-3 py-3 text-[#FEE715FF] border border-[#FEE715FF] rounded-lg font-semibold font-inter focus:outline-none focus:shadow-outline mt-1 flex items-center justify-between transition duration-300 ease-in-out ${
          loader.isLoading ? 'opacity-20 cursor-not-allowed' : ''
        }
        `}
            disabled={loader.isLoading}
          >
            Submit <span>{loader.isLoading ? <SmallSpinner /> : null}</span>
          </button>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
