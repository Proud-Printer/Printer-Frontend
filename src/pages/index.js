import Hero from '@/components/Hero/Hero';
import Nav from '@/components/Nav/Nav';
import Modal from '@/components/UI/DjModal';
import { modalAtom } from 'atoms/modalAtom';
import { useRecoilValue } from 'recoil';

export default function Home() {
  const modalState = useRecoilValue(modalAtom);
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
