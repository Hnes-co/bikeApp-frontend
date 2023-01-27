import React from "react";

function Loader({ loading, style = null }) {
  if(loading) {
    return (
      <div className="loader-wrapper">
        <div style={style} className="loader"></div>
      </div>
    );
  }
  return null;
}

export default Loader;