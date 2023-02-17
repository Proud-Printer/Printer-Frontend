import React, {useState} from 'react';
import DJComponent from './Hero/DJ';
import ClubberComponent from './Hero/Clubber';
// import MOCKDATA from "./MOCK_DATA.json";


export default function First() {
    // const [musicChoice, setMusicChoice] = useState('davido')
    const [isClubber, setIsClubber] = useState()
    const [isDJ, setIsDJ] = useState()


    const handleClubber = () => {
        setIsClubber(true)
        setIsDJ(false)
    }

    const handleDJ = () => {
      setIsDJ(true)
      setIsClubber(false)
    };
    return (
      <>
        <div className>
          <button onClick={handleClubber}>Clubber</button>
          <button onClick={handleDJ}>DJ</button>
        </div>
        {isDJ && <DJComponent />}
        {isClubber && <ClubberComponent />}

        {/* {MOCKDATA.map((val, key) => {
          return <div>{val.first_name}</div>;
        })} */}
      </>
    );
}