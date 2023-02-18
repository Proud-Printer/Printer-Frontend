import React, { useState } from 'react';
import MOCKDATA from './MOCK_DATA.json';

export default function ClubberComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <>
      <div className="justify-center mx-auto my-4 relative">
        <h1 className="font-semibold font-inter flex justify-center mx-auto my-4">
          {' '}
          Hello DJ, Please play
        </h1>
        <input
          type="text"
          placeholder="search"
          className="outline outline-2 rounded-lg px-5 py-3 font-semibold font-inter flex justify-center mx-auto"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />

        <div className="fixed top-0 left-0 w-full rounded h-[170px] overflow-y-auto p-3 grid grid-cols-5 gap-4">
          {MOCKDATA.filter((val) => {
            if (searchTerm === '') {
              return null;
            } else if (
              val.first_name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          }).map((val, key) => {
            return (
              <div className="justify-center text-center mx-auto my-2 w-full flex bg-white p-3 rounded">
                <div className="flex justify-center
                text-[#1E1E1E] font-semibold font-montserrat 
                ">{val.first_name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
