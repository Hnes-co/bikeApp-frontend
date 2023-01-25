import React from 'react';
import arrowBack from '../assets/arrow_back.png';
import arrowForward from '../assets/arrow_forward.png';

function ListButtons({ handlePagination, current, step, listType, collectionSize }) {
  if(listType === "journeys") {
    return (
      <div className="list-buttons">
        <button className="list-button" title="Previous page" onClick={() => handlePagination(-step)} ><img src={arrowBack} alt="arrowBack" /></button>
        <label>{`Showing results ${current} - ${Math.min(current + step, collectionSize)} of ${collectionSize}`}</label>
        <button className="list-button" title="Next page" onClick={() => handlePagination(step)}><img src={arrowForward} alt="arrowForward" /></button>
      </div>
    );
  }
  else if(listType === "stations") {
    return (
      <div className="list-buttons">
        <label className="result-indices">{`Showing results ${current} - ${current + step} of ${collectionSize}`}</label>
      </div>
    );
  }
  return null;
}

export default ListButtons;