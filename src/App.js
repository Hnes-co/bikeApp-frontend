import React, { useState, useRef, useEffect } from 'react';
import './app.css';
import ListItem from './components/ListItem';
import ListHeader from './components/ListHeader';
import ListButtons from './components/ListButtons';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(false);
  const listData = useRef([]);
  const collectionSize = useRef(0);
  const listIndex = useRef(0);
  const listType = useRef("");
  const listStep = useRef(0);

  async function handlePagination(action) {
    if(listIndex.current + action >= 0 && listIndex.current + action < collectionSize.current) {
      setLoading(true);
      listIndex.current += action;
      try {
        const response = await fetch(`http://192.168.10.56:3001/api/journeys/${listIndex.current}`);
        if(!response.ok) {
          throw new Error("Fetch failed");
        }
        const resJson = await response.json();
        listData.current = resJson.data;
      }
      catch(error) {
        console.log(error);
      }
      setLoading(false);
    }
  }

  async function getListData(action) {
    listData.current = [];
    listType.current = "";
    listIndex.current = 0;
    setLoading(true);
    try {
      const response = await fetch(`http://192.168.10.56:3001/api/${action}`);
      if(!response.ok) {
        throw new Error("Fetch failed");
      }
      listType.current = action;
      const resJson = await response.json();
      collectionSize.current = resJson.size;
      listData.current = resJson.data;
      listStep.current = listData.current.length;
    }
    catch(error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div className="container">
      <h1>Helsinki City Bike App</h1>
      <div className="action-buttons">
        <button className="action-button" onClick={() => getListData("journeys")}>List Journeys</button>
        <button className="action-button" onClick={() => getListData("stations")}>List Stations</button>
      </div>
      <div className="list">
        <Loader loading={loading} />
        <ListHeader listType={listType.current} />
        <div className="journey-list">
          {listData.current.map((data, index) => (
            <ListItem
              key={listType.current === "journeys" ? data._id : index}
              data={data}
              index={index}
              listType={listType.current}
            />
          ))}
        </div>
        <ListButtons
          handlePagination={handlePagination}
          current={listIndex.current}
          step={listStep.current}
          listType={listType.current}
          collectionSize={collectionSize.current}
        />
      </div>
    </div>
  );
}

export default App;