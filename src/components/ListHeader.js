import React from 'react';

function ListHeader({ listType }) {
  if(listType === "journeys") {
    return (
      <div className="list-header list-header-journeys">
        <label>Departure Station</label>
        <label>Return Station</label>
        <label>Travelled distance</label>
        <label>Travel duration</label>
      </div>
    );
  }
  else if(listType === "stations") {
    return (
      <div className="list-header list-header-stations">
        <label>Station Name</label>
      </div>
    );
  }
  return null;
}

export default ListHeader;