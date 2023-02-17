import React, { useState } from "react";
import MOCKDATA from "./MOCK_DATA.json";

export default function ClubberComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <div className="justify-center mx-auto my-4">
        <h1 className="font-semibold font-inter flex justify-center mx-auto my-4">
          {" "}
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

        {MOCKDATA.filter((val) => {
          if (searchTerm === "") {
            return null;
          } else if (
            val.first_name.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return val;
          }
        }).map((val, key) => {
          return (
            <div className="justify-center text-center mx-auto my-2 w-1/6 flex">
              <div className="flex justify-center">{val.first_name}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
