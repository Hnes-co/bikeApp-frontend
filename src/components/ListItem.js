import React, { useState, useRef } from "react";
import StationDialog from './StationDialog';

function ListItem({ data, index, listType }) {
  const [stationJourneys, setStationJourneys] = useState({ starts: undefined, ends: undefined });
  const dialogRef = useRef();
  const classname = `list-item list-item-${listType} ${index % 2 ? "list-item-even" : "list-item-odd"}`;

  async function handleStationDialog() {
    console.log(data.ID);
    dialogRef.current.showModal();
    try {
      const response = await fetch(`http://192.168.10.56:3001/api/stations/${data.ID}`);
      if(response.ok) {
        const resJson = await response.json();
        setStationJourneys({ starts: resJson.journeyStarts, ends: resJson.journeyEnds });
      }
      else throw new Error("station journeys fetch failed");
    }
    catch(error) {
      console.log(error);
    }
  }

  if(listType === "journeys") {
    let minutes = Math.floor(data.duration / 60);
    let seconds = data.duration - minutes * 60;
    return (
      <div className={classname}>
        <label>{data.departureStationName}</label>
        <label>{data.returnStationName}</label>
        <label>{data.distance / 1000}km</label>
        <label>{minutes}min {seconds}s</label>
      </div>
    );
  }
  else if(listType === "stations") {
    return (
      <>
        <StationDialog dialogRef={dialogRef} station={data} stationJourneys={stationJourneys} />
        <div className={classname} onClick={handleStationDialog}>
          <label>{data.Nimi}</label>
        </div>
      </>
    );
  }
  return null;
}

export default ListItem;