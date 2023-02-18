import Nav from '@/components/Nav/Nav';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookie from 'universal-cookie';

const dashboard = () => {
  const cookies = new Cookie();
  const router = useRouter();

  useEffect(() => {
    const token = cookies.get('token');
    if (!token) {
      router.push('/');
    }

    const fetchUser = async () => {
      const res = await fetch('/api/dj/me/' + token);
      const data = await res.json();
      console.log(data);
    };
  }, []);
  return (
    <div>
      <Nav />

      <div
        className="
        w-full bg-[#101820FF] min-h-screen
        "
      >
        <header className="flex items-center justify-between w-11/12 mx-auto">
          <div>
            <h1>DJ Dashboard</h1>
            <p>Welcome {cookies.get('djName')}!</p>
          </div>
          {cookies.get('djOnline') ? (
            <button
              className="flex items-center ml-auto gap-4 px-4 py-2 text-sm font-medium text-[#101820FF] bg-[#FEE715FF] rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
          "
            >
              Online{' '}
              <span className="lds__ripple">
                <div></div>
                <div></div>
              </span>
            </button>
          ) : (
            <button
              className="flex items-center ml-auto gap-4 px-4 py-2 text-sm font-medium text-[#101820FF] bg-[#FEE715FF] rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
            "
            >
              Offline{' '}
            </button>
          )}
        </header>
      </div>
    </div>
  );
};

export default dashboard;
