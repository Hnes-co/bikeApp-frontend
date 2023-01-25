import React from "react";

function ListItem({ data, index, listType }) {
  const classname = `list-item list-item-${listType} ${index % 2 ? "list-item-even" : "list-item-odd"}`;
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
      <div className={classname}>
        <label>{data}</label>
      </div>
    );
  }
  return null;
}

export default ListItem;