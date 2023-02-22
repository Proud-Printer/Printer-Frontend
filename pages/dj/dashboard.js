import { LargeSpinner } from '../../components/General/Spinner';
import Nav from '../../components/Nav/Nav';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookie from 'universal-cookie';
import { FaFlag, FaPlay } from 'react-icons/fa';
import { toast } from 'react-toastify';

const dashboard = () => {
  const [loading, setLoading] = useState(false);
  const cookies = new Cookie();
  const router = useRouter();
  const [djDetails, setDjDetails] = useState({});

  useEffect(() => {
    const token = cookies.get('token');
    if (!token) {
      router.push('/');
    }

    const getDj = async () => {
      try {
        const response = await axios('/api/dj/me/' + cookies.get('id'), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });
        if (response.status === 200) {
          setDjDetails(response.data);
        } else {
          router.push('/');
        }
      } catch (error) {
        console.log(error);
      }
    };

    getDj();

    // Schedule the next data fetch after some time interval
    const interval = setInterval(() => {
      getDj();
    }, 5000); // fetch data every 5 seconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <LargeSpinner />
      </div>
    );
  }

  const handlePlay = async (clubberId) => {
    try {
      const response = await axios.put('/api/dj/play/' + clubberId, {
        djId: cookies.get('id'),
      });

      if (response.status === 200) {
        setDjDetails(response.data);
        toast.success('Song played successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFlag = async (clubberId) => {
    try {
      const response = await axios.put('/api/dj/flag/' + clubberId, {
        djId: cookies.get('id'),
      });

      if (response.status === 200) {
        setDjDetails(response.data);
        toast.success('Song flagged successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Nav />

      <div
        className="
        w-full bg-[#101820FF] min-h-screen py-3
        "
      >
        <header className="flex items-center justify-between w-11/12 mx-auto">
          <div>
            <h1
              className="
              text-3xl font-normal text-[#FEE715FF]
              "
            >
              DJ Dashboard
            </h1>
            <p
              className="
              text-lg font-sm text-[#FEE715FF] 
              "
            >
              Welcome {djDetails?.name}!
            </p>
          </div>
          {djDetails.isDjOnline ? (
            <button
              className="flex items-center ml-auto gap-4 px-4 py-2 text-sm font-medium text-[#101820FF] bg-[#FEE715FF] rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
          "
            >
              Online{' '}
              <span className="lds__ripple">
                <div></div>
                <div></div>
              </span>
            </button>
          ) : (
            <button
              className="flex items-center ml-auto gap-4 px-4 py-2 text-sm font-medium text-[#101820FF] bg-[#FEE715FF] rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
            "
            >
              Offline{' '}
            </button>
          )}
        </header>

        <main>
          <div className="w-11/12 mx-auto">
            <header>
              <h2
                className="
                text-base font-sm text-[#FEE715FF] mt-8
                "
              >
                Here are the list of songs requested by the audience
              </h2>
            </header>
            {djDetails?.clubbers?.length > 0 ? (
              <div>
                {djDetails?.clubbers?.map((clubber) => (
                  <div className="flex items-center justify-between w-full h-16 px-4 mt-4 bg-[#FEE715FF] rounded-md">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-base font-medium text-[#101820FF]">
                          {clubber.song}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        className="flex items-center gap-4 px-4 py-2 text-sm font-medium text-[#101820FF] bg-[#FEE715FF] rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary border border-black
                "
                        onClick={() => handlePlay(clubber.clubberId)}
                      >
                        Played
                        <FaPlay />
                      </button>

                      <button
                        className="flex items-center gap-4 px-4 py-2 text-sm font-medium text-[#101820FF] bg-[#FEE715FF] rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary border border-black
                "
                        onClick={() => handleFlag(clubber.clubberId)}
                      >
                        Flag as unavailable
                        <FaFlag />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-16 mt-4 bg-[#FEE715FF] rounded-md">
                <p className="text-base font-medium text-[#101820FF]">
                  No songs requested yet
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default dashboard;
