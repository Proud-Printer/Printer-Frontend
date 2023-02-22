import React, { useState } from 'react';
import Image from 'next/image';
import HeroMusic from '../../assets/hero-music1.png';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalAtom } from 'atoms/modalAtom';
import { disableButtonAtom } from 'atoms/disableButtonAtom';
import { toast } from 'react-toastify';

const Hero = () => {
  const [_, setModalState] = useRecoilState(modalAtom);
  const disableButton = useRecoilValue(disableButtonAtom);

  const handleDJ = () => {
    setModalState({ isOpen: true, isDJ: true, isClubber: false });
  };
  const handleClubber = () => {
    setModalState({ isOpen: true, isDJ: false, isClubber: true });
  };
  return (
    <section className="Hero my-14 md:my-28 md:px-20">
      <div className="container flex justify-center gap-5 mx-auto">
        <button
          className="button outline outline-2 rounded-lg px-5 py-3 font-semibold font-inter md:block"
          role="button"
          onClick={handleDJ}
        >
          DJ
        </button>
        <button
          className="button outline outline-2 rounded-lg px-5 py-3 font-semibold font-inter  md:block"
          role="button"
          onClick={
            disableButton
              ? () => {
                  toast.error(
                    'You can request for another song after 5 minutes'
                  );
                }
              : handleClubber
          }
        >
          Clubber
        </button>
      </div>
      <div className="block md:flex justify-between py-3 my-6">
        <div className="text-section w-fit mx-auto md:max-w-md">
          <h1 className="text-2xl md:text-3xl lg:text-6xl font-extrabold font-inter tracking-normal uppercase text-center md:text-start mx-auto">
            A place for{' '}
            <span className="bg-black rounded-lg text-white leading-normal p-1">
              Classical
            </span>{' '}
            Music
          </h1>
          <div className="bg-white rounded-full w-fit py-8 px-5 my-3 hidden md:block">
            <p className="text-base text-black font-inter font-semibold">
              Ultra Lo-fi Dreams
            </p>
          </div>
        </div>
        <div className="image-section">
          <Image src={HeroMusic} alt="Hero Music" />
        </div>
        <div className="extra-info w-fit mx-auto px-3">
          <p className="text-base font-semibold font-inter max-w-sm text-center md:text-start">
            Compact and portable record cutter
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
