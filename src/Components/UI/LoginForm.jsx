import { loaderAtom } from 'atoms/loaderAtom';
import { useRecoilState } from 'recoil';
import { SmallSpinner } from '../General/Spinner';

const LoginForm = ({ setForm }) => {
  const [loader, setLoading] = useRecoilState(loaderAtom);
  return (
    <div>
      <form
        className="
      w-full max-w-lg mx-auto mt-4 bg-white rounded-lg shadow-lg p-3 text-gray-700
      "
      >
        <div
          className="
        flex items-center justify-between p-3 border-b border-gray-200
        "
        >
          <h2>
            <span className="font-bold text-2xl">Login</span>
          </h2>
          <button
            onClick={() => setForm('signup')}
            className="button outline outline-2 rounded-lg px-5 py-3 font-semibold font-inter hidden md:block"
          >
            Sign Up
          </button>
        </div>
        <div
          className="
        flex flex-col justify-between p-3 border-b border-gray-200
        "
        >
          <label
            htmlFor="email"
            className="text-md font-semibold text-[#1A1A1A]"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="
          w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline
          "
          />
        </div>
        <div
          className="
        flex flex-col justify-between p-3 border-b border-gray-200
        "
        >
          <label
            htmlFor="password"
            className="text-md font-semibold text-[#1A1A1A]"
          >
            Password
          </label>
          <input
            type="password"
            className="
          w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline
          "
            id="password"
          />
        </div>

        <button
          type="submit"
          className="
        w-full px-3 py-4 text-[#1C1C1C] bg-white rounded-lg focus:bg-[#1A1A1A] focus:outline-none my-1 flex justify-between items-center border border-[#1A1A1A] hover:bg-[#e5e2e2]
        "
        >
          Login <span>{loader.isLoading ? <SmallSpinner /> : null}</span>
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
