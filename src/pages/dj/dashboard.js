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
  }, []);
  return <div>Dj Dashboard</div>;
};

export default dashboard;
