import React, { useState, useRef, useEffect } from 'react';
import './app.css';
import ListItem from './components/ListItem';
import ListHeader from './components/ListHeader';
import ListButtons from './components/ListButtons';
import Loader from './components/Loader';
import searchIcon from './assets/search.png';

function App() {
  const [loading, setLoading] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const listData = useRef([]);
  const collectionSize = useRef(0);
  const listIndex = useRef(0);
  const listType = useRef("");
  const listStep = useRef(0);
  const sortRule = useRef("");
  const sortOrder = useRef(1);
  const searchRef = useRef();
  const dropDownRef = useRef();

  async function handlePagination(action) {
    if(filtering && searchRef.current.value === "") {
      sortRule.current = "";
      sortOrder.current = 1;
      getListData(listType.current);
    }
    else if(listIndex.current + action >= 0 && listIndex.current + action < collectionSize.current) {
      setLoading(true);
      listIndex.current += action;
      const url = parseQuery(`http://localhost:3001/api/journeys/${listIndex.current}?`);
      try {
        const response = await fetch(url);
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

  async function getListData(collection) {
    if(collection !== listType.current) {
      sortRule.current = "";
      sortOrder.current = 1;
      listType.current = "";
      searchRef.current.value = "";
    }
    listIndex.current = 0;
    const url = parseQuery(`http://localhost:3001/api/${collection}?`);
    setLoading(true);
    try {
      const response = await fetch(url);
      if(!response.ok) {
        throw new Error("Fetch failed");
      }
      listType.current = collection;
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

  function parseQuery(baseUrl) {
    setFiltering(false);
    let url = baseUrl;
    if(sortRule.current !== "" && baseUrl.includes("journeys")) {
      url += `sort=${sortRule.current}&order=${sortOrder.current}&`;
    }
    if(searchRef.current.value !== "") {
      setFiltering(true);
      url += `search=${searchRef.current.value}`;
      if(baseUrl.includes("journeys")) {
        url += `&stationType=${dropDownRef.current.value.toLowerCase() + "StationName"}`;
      }
    }
    return url;
  }

  return (
    <div className="container">
      <h1 className="app-header">Helsinki City Bike App</h1>
      <div className="action-buttons">
        <Loader loading={loading} />
        <button hidden={loading} className="action-button" onClick={() => getListData("journeys")}>List Journeys</button>
        <button hidden={loading} className="action-button" onClick={() => getListData("stations")}>List Stations</button>
      </div>
      <div className="search-bar" style={{ display: listType.current === "" || loading ? "none" : "flex" }}>
        <label>Find:</label>
        <input ref={searchRef} placeholder="Station name" onKeyDown={(event) => event.key === "Enter" ? getListData(listType.current, event) : null} />
        <select ref={dropDownRef} hidden={listType.current === "stations"} >
          <option>Departure</option>
          <option>Return</option>
        </select>
        <img src={searchIcon} alt="search" onClick={() => getListData(listType.current)} />
      </div>
      <div className="list">
        <ListHeader listType={listType.current} getListData={getListData} sortRule={sortRule} sortOrder={sortOrder} />
        <div className="journey-list">
          {listData.current.map((data, index) => (
            <ListItem
              key={data._id}
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