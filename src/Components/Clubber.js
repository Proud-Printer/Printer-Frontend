import React, { useState } from 'react';
import MOCKDATA from "./MOCK_DATA.json";


export default function ClubberComponent() {
  const [searchTerm, setSearchTerm] = useState('')
    return (
      <>
        <h1> Hello Clubber, search for {searchTerm}</h1>
        <input type="text" placeholder='search' onChange={(event) => {
          setSearchTerm(event.target.value)}}/>


        {MOCKDATA.filter((val) => {
          if (searchTerm === "") {
            return val
          } else if (val.first_name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
          }
          })
        .map((val, key) => {
          return (<div>{val.first_name}</div>);
        })}
      </>
    );
    
}