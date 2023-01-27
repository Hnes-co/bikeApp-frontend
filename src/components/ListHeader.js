import React from 'react';
import arrowDownIcon from '../assets/arrow_down.png';
import arrowUpIcon from '../assets/arrow_up.png';

function ListHeader({ listType, getListData, sortRule, sortOrder }) {

  function sortJourneys(rule) {
    if(rule === sortRule.current) {
      sortOrder.current = sortOrder.current === 1 ? -1 : 1;
    }
    else {
      sortOrder.current = 1;
    }
    sortRule.current = rule;
    getListData("journeys");
  }

  function handleSortIcons(title) {
    if(sortRule.current === title && sortOrder.current === 1) {
      return arrowUpIcon;
    }
    return arrowDownIcon;
  }

  if(listType === "journeys") {
    return (
      <div className="list-header list-header-journeys">
        <label title="Sort by departure station" onClick={() => sortJourneys("departureStationName")}>
          Departure Station
          <img className="sortIcon" src={handleSortIcons("departureStationName")} alt="sortIcon" />
        </label>
        <label title="Sort by return station" onClick={() => sortJourneys("returnStationName")}>
          Return Station
          <img className="sortIcon" src={handleSortIcons("returnStationName")} alt="sortIcon" />
        </label>
        <label title="Sort by distance" onClick={() => sortJourneys("distance")}>
          Travelled distance
          <img className="sortIcon" src={handleSortIcons("distance")} alt="sortIcon" />
        </label>
        <label title="Sort by duration" onClick={() => sortJourneys("duration")}>
          Travel duration
          <img className="sortIcon" src={handleSortIcons("duration")} alt="sortIcon" />
        </label>
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