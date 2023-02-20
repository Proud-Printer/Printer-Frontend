import { modalAtom } from 'atoms/modalAtom';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import ClubberComponent from '../Hero/Clubber';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Modal = () => {
  const [form, setForm] = useState('signup');
  const [modalState, setModalState] = useRecoilState(modalAtom);
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-50 overflow-hidden flex justify-center items-center bg-black bg-opacity-50 transition duration-300 ease-in-out backdrop-filter backdrop-blur-sm
    "
      onClick={() => setModalState({ isDJ: false, isClubber: false })}
    >
      <div
        className="w-11/12 md:w-3/4 lg:w-1/2 bg-[#101820FF] rounded shadow-lg z-50 overflow-y-auto transition duration-300 ease-in-out p-3"
        onClick={(e) => e.stopPropagation()}
      >
        {modalState.isDJ ? (
          <>
            <div
              className="
            flex items-center justify-between p-2 border-b border-[#FEE715FF]
            "
            >
              <h2
                className="
              text-2xl font-semibold text-[#FEE715FF]
              "
              >
                DJ
              </h2>
              <button
                className="border border-[#FEE715FF] rounded-lg px-5 py-3 font-semibold text-[#FEE715FF] font-inter md:block"
                role="button"
                onClick={() => setModalState({ isDJ: false, isClubber: false })}
              >
                X
              </button>
            </div>
            <div className="modal-body">
              {form === 'signup' ? (
                <SignupForm setForm={setForm} />
              ) : (
                <LoginForm setForm={setForm} />
              )}
            </div>
          </>
        ) : modalState.isClubber ? (
          <>
            <div
              className="
            flex items-center justify-between p-4 border-b border-[#FEE715FF]
            "
            >
              <h2
                className="
              text-2xl font-semibold text-[#FEE715FF]
              "
              >
                Clubber
              </h2>
              <button
                className="border border-[#FEE715FF] rounded-lg px-5 py-3 font-semibold font-inter text-[#FEE715FF] md:block"
                role="button"
                onClick={() => setModalState({ isDJ: false, isClubber: false })}
              >
                X
              </button>
            </div>
            <div className="modal-body">
              <form>
                <ClubberComponent />
              </form>
            </div>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Modal;
