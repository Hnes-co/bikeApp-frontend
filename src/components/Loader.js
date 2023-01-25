import React from "react";

function Loader({ loading }) {
  if(loading) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }
  return null;
}

export default Loader;