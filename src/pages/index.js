import Hero from '@/components/Hero/Hero';
import Nav from '@/components/Nav/Nav';
import Modal from '@/components/UI/DjModal';
import { modalAtom } from 'atoms/modalAtom';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Cookie from 'universal-cookie';

export default function Home() {
  const modalState = useRecoilValue(modalAtom);
  const cookie = new Cookie();
  const router = useRouter();

  useEffect(() => {
    const token = cookie.get('token');
    if (token) {
      router.push('/dj/dashboard');
    }
  }, []);
  
  return (
    <>
      {modalState.isOpen && <Modal />}
      <div className="App bg-primary min-h-screen">
        <Nav />
        <Hero />
      </div>
    </>
  );
}
