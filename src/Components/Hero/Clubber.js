import React, { useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import axios from 'axios';
import Cookie from 'universal-cookie';
import { toast } from 'react-toastify';

export default function ClubberComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [djs, setDjs] = useState([]);

  // clubber details
  const [djId, setDjId] = useState('');
  const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

  const cookies = new Cookie();

  const requestToDj = async (djId, clubberSong) => {
    try {
      const response = await axios.post('/api/clubber/requestToDj', {
        djId,
        clubberSong,
      });
      if (response.status === 200) {
        toast.success('Song requested!');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!');
    }
  };

  useEffect(() => {
    // API Access Token
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: 'grant_type=client_credentials',
      method: 'POST',
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
    }).then((tokenResponse) => {
      console.log(tokenResponse.data.access_token);
      cookies.set('access_token', tokenResponse.data.access_token, {
        path: '/',
      });
    });

    const getDjs = async () => {
      const response = await axios.get('/api/dj/all');
      setDjs(response.data);
    };

    getDjs();
  }, []);

  async function search() {
    // Search for a song
    setLoading(true);
    try {
      const response = await axios(
        `https://api.spotify.com/v1/search?q=${searchTerm}&type=track&limit=10`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + cookies.get('access_token'),
          },
        }
      );
      setLoading(false);
      setSearchResults(response.data);
      toast.success('Song found!');
    } catch (error) {
      console.log(error);
      toast.error('Song not found!');
      setLoading(false);
    }
  }

  return (
    <>
      <div className="justify-center mx-auto my-4 relative">
        <h1 className="font-montserrat flex justify-center mx-auto my-4 text-[#FEE715FF] font-normal">
          {' '}
          Hello DJ, Please play
        </h1>
        <div className="relative focus-within:text-[#FEE715FF] text-[#FEE715FF]">
          <input
            type="text"
            placeholder="Type in song name. . ."
            className="w-full px-3 py-2 text-[#FEE715FF] border rounded-lg focus:outline-none focus:shadow-outline border-[#FEE715FF] bg-transparent placeholder:text-[#FEE715FF]"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          <BiSearchAlt
            className="absolute top-3 right-3 text-[#FEE715FF] text-lg"
            onClick={search}
          />
        </div>
        <div className="mt-3">
          <select className="w-full px-3 py-2 text-[#FEE715FF] border rounded-lg focus:outline-none focus:shadow-outline border-[#FEE715FF] bg-transparent placeholder:text-[#FEE715FF]"
            onChange={(event) => {
              setDjId(event.target.value);
            }}
          >
            <option className="text-[#FEE715FF] bg-[#101820FF]" value="">
              Select a DJ
            </option>
            {djs?.map((val, key) => {
              return (
                <option
                  className="text-[#FEE715FF] bg-[#101820FF]"
                  value={val._id}
                  key={key}
                  onClick={() => setDjId(val._id)}
                >
                  {val.name}
                </option>
              );
            })}
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center my-12">
            <div className="lds__ripple__large">
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <>
            <div
              className="w-full rounded max-h-[240px] overflow-y-auto grid grid-cols-3 gap-4 p-2 bg-[#101820FF]
        md:grid-cols-5 md:gap-4 md:overflow-y-auto md:overflow-x-hidden
        "
            >
              {searchResults?.tracks?.items?.map((val, key) => {
                console.log(val);
                return (
                  <div
                    className="justify-center text-center mx-auto my-2 w-full flex p-2 rounded bg-[#FEE715FF]"
                    key={key}
                    onClick={() => requestToDj(djId, val.name)}
                  >
                    <div
                      className="flex justify-center
                text-[#1E1E1E] font-semibold font-sans text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl
                "
                    >
                      {val.name} - {val.artists[0].name}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
