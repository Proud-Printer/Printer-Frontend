import React, { useState } from 'react';
import DJComponent from './Hero/DJ';
import ClubberComponent from './Hero/Clubber';
import { useRecoilValue } from 'recoil';
import { disableButtonAtom } from 'atoms/disableButtonAtom';
import { toast } from 'react-toastify';

export default function First() {
  const [isClubber, setIsClubber] = useState();
  const [isDJ, setIsDJ] = useState();
  const disableButton = useRecoilValue(disableButtonAtom);

  const handleClubber = () => {
    setIsClubber(true);
    setIsDJ(false);
  };

  const handleDJ = () => {
    setIsDJ(true);
    setIsClubber(false);
  };
  return (
    <>
      <div className>
        <button
          onClick={
            disableButton
              ? () =>
                  toast.error(
                    'You can request for another song after 5 minutes'
                  )
              : handleClubber
          }
          disabled={disableButton}
          // apply cursor not allowed if disableButton is true
          className={disableButton ? 'cursor-not-allowed' : ''}
        >
          Clubber
        </button>
        <button onClick={handleDJ}>DJ</button>
      </div>
      {isDJ && <DJComponent />}
      {isClubber && <ClubberComponent />}
    </>
  );
}
