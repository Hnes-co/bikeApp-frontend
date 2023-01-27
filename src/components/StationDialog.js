import React from "react";
import closeIcon from '../assets/close.png';
import locationIcon from '../assets/location.png';
import lineStartIcon from '../assets/line_start_circle.png';
import lineEndIcon from '../assets/line_end_circle.png';
import Loader from "./Loader";

function StationDialog({ dialogRef, station, stationJourneys }) {

  const loaderStyle = {
    margin: 0,
    marginLeft: "1rem",
    width: "24px",
    height: "24px",
    borderWidth: "4px",
    borderTopWidth: "4px"
  };

  return (
    <dialog ref={dialogRef}>
      <div className="dialog">
        <div className="dialog-header">
          <label>{station.Nimi}</label>
          <img onClick={() => dialogRef.current.close()} src={closeIcon} alt="closeIcon"></img>
        </div>
        <div className="dialog-content">
          <div className="dialog-content-item list-item-odd">
            <img src={locationIcon} alt="location"></img>
            <label >Address: {station.Osoite ?? station.Adress}</label>
          </div>
          <div className="dialog-content-item">
            <img src={lineStartIcon} alt="start"></img>
            <label>Number of journeys started: {stationJourneys.starts ?? <Loader loading={true} style={loaderStyle} />}</label>
          </div>
          <div className="dialog-content-item list-item-odd">
            <img src={lineEndIcon} alt="end"></img>
            <label className="list-item-odd">Number of journeys ended: {stationJourneys.ends ?? <Loader loading={true} style={loaderStyle} />}</label>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default StationDialog;