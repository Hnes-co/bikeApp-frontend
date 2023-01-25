import React from "react";

function ListItem({ data, index }) {

  let minutes = Math.floor(data.duration / 60);
  let seconds = data.duration - minutes * 60;
  return (
    <div className={index % 2 ? "list-item list-item-even" : "list-item list-item-odd"}>
      <label>{data.departureStationName}</label>
      <label>{data.returnStationName}</label>
      <label>{data.distance / 1000}km</label>
      <label>{minutes}min {seconds}s</label>
    </div>
  );
}

export default ListItem;