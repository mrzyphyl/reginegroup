import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import './Welcome.css';

const Welcome = () => {
  const [crimeData, setCrimeData] = useState([]);
  const [accidentData, setAccidentData] = useState([]);
  const [solvedCrime, setSolvedCrimeData] = useState([]);
  const [unSolvedCrime, setUnSolvedCrimeData] = useState([]);
  useEffect(() => {
    getUser();
    getCrimes()
    getAccidents()
    getUnsolvedCrime()
    getSolvedCrime()
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

  const getUnsolvedCrime = () => {
    axios.get(`http://localhost:5000/api/solved-crime/unsolved-crime`)
      .then(result => {
        console.log('Unsolved Crime:', result.data)
        setUnSolvedCrimeData(result.data)
      })
      .catch(err => console.log(err));
  }

  const getSolvedCrime = () => {
    axios.get(`http://localhost:5000/api/solved-crime/solved-crime`)
      .then(result => {
        console.log('Solved  Crime: ',result.data)
        setSolvedCrimeData(result.data)
      })
      .catch(err => console.log(err));
  }

  return (
    <main >
        <div className="welcome-container">
        <h3 className="welcome-text">
  Hello there, report a crime today <br /> 
  to make the community safer!
</h3>
</div>
    <div className="user-card-container">
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
          <h1 className="text-2xl font-bold">{solvedCrime.length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3 className="text-lg font-bold">Ongoing Crimes</h3>
            <BsFillBellFill className='card_icon' />
          </div>
          <h1 className="text-2xl font-bold">{unSolvedCrime.length}</h1>
        </div>
      </div>
      </div>
    </main>
    
  );
};

export default Welcome;
