import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';

const Welcome = () => {
  const [crimeData, setCrimeData] = useState([]);
  const [accidentData, setAccidentData] = useState([]);
  useEffect(() => {
    getUser();
    getCrimes()
    getAccidents()
  }, []);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/api/user`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const users = response.data.data.name;
      setName(users);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getCrimes = () => {
    axios.get(`http://localhost:5000/api/crime-report`)
      .then(result => {
        setCrimeData(result.data)
      })
      .catch(err => console.log(err));
  };

  const getAccidents = () => {
    axios.get(`http://localhost:5000/api/accident-report`)
      .then(result => {
        setAccidentData(result.data)
      })
      .catch(err => console.log(err));
  };

  return (
    <main >
        
      <h3 className="text-5xl font-bold">Hello there, report a crime today to make the community safer!</h3>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3 className="text-lg font-bold">Total Crime Reported</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1 className="text-2xl font-bold">{crimeData.length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3 className="text-lg font-bold">Total Accident Reported</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1 className="text-2xl font-bold">{accidentData.length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3 className="text-lg font-bold">Total Crime Solved</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1 className="text-2xl font-bold">159</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3 className="text-lg font-bold">Ongoing Crimes</h3>
            <BsFillBellFill className='card_icon' />
          </div>
          <h1 className="text-2xl font-bold">42</h1>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
