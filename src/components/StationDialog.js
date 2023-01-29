import React from "react";
import closeIcon from '../assets/close.png';
import locationIcon from '../assets/location.png';
import lineStartIcon from '../assets/line_start_circle.png';
import lineEndIcon from '../assets/line_end_circle.png';
import Loader from "./Loader";
import { Map, Marker } from "pigeon-maps";


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
          <label>{station.Nimi.toUpperCase()}</label>
          <img onClick={() => dialogRef.current.close()} src={closeIcon} alt="closeIcon"></img>
        </div>
        <div className="dialog-content">
          <div className="dialog-content-item">
            <div className="station-info list-item-odd">
              <img className="dialog-icon" src={locationIcon} alt="location"></img>
              <label>{station.Osoite ?? station.Adress}</label>
            </div>
            <div className="station-info">
              <img className="dialog-icon" src={lineStartIcon} alt="start"></img>
              <label>Journeys started: {stationJourneys.starts ?? <Loader loading={true} style={loaderStyle} />}</label>
            </div>
            <div className="station-info list-item-odd">
              <img className="dialog-icon" src={lineEndIcon} alt="end"></img>
              <label>Journeys ended: {stationJourneys.ends ?? <Loader loading={true} style={loaderStyle} />}</label>
            </div>
          </div>
          <div className="dialog-content-item dialog-map">
            {dialogRef.current?.open ?
              <Map defaultCenter={[station.y, station.x]} defaultZoom={15}>
                <Marker width={50} anchor={[station.y, station.x]} color="rgb(1, 94, 141)" />
              </Map>
              :
              null
            }
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default StationDialog;