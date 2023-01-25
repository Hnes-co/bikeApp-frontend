import React, { useState, useRef, useEffect } from 'react';
import './app.css';
import ListItem from './components/ListItem';
import arrowBack from './assets/arrow_back.png';
import arrowForward from './assets/arrow_forward.png';

function App() {
  const [journeys, setJourneys] = useState([]);
  const journeyIndex = useRef(0);

  useEffect(() => {
    try {
      fetch('http://localhost:3001/api/journeys/0')
        .then((response) => {
          if(!response.ok) {
            throw new Error("Fetch failed");
          }
          response.json().then((resJson) => setJourneys(resJson));
        });
    }
    catch(error) {
      console.log(error);
    }
  }, []);

  async function handlePagination(action) {
    if(journeyIndex.current + action >= 0) {
      journeyIndex.current += action;
      try {
        const response = await fetch(`http://localhost:3001/api/journeys/${journeyIndex.current}`);
        if(!response.ok) {
          throw new Error("Fetch failed");
        }
        setJourneys(await response.json());
      }
      catch(error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="container">
      <div className="list">
        <div className="list-header">
          <label>Departure Station</label>
          <label>Return Station</label>
          <label>Travelled distance</label>
          <label>Travel duration</label>
        </div>
        <div className="journey-list">
          {journeys.map((journey, index) => (
            <ListItem key={journey._id} data={journey} index={index} />
          ))}
        </div>
        <div className="list-buttons">
          <button className="list-button" title="Previous page" onClick={() => handlePagination(-journeys.length)} ><img src={arrowBack} alt="arrowBack" /></button>
          <label>{`Showing results ${journeyIndex.current}-${journeyIndex.current + journeys.length}`}</label>
          <button className="list-button" title="Next page" onClick={() => handlePagination(journeys.length)}><img src={arrowForward} alt="arrowForward" /></button>
        </div>
      </div>
    </div>
  );
}

export default App;