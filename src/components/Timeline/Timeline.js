import React from 'react';
import "./Timeline.css";

function Timeline() {

  return (
    <>
      <div className="timeline">
        <div className="timeline__block">
          <p className="timeline__cell timeline__cell_colored">1 неделя</p>
          <p className="timeline__title">Back-end</p>
        </div>
        <div className="timeline__block">
          <p className="timeline__cell">4 недели</p>
          <p className="timeline__title">Front-end</p>
        </div>
      </div>
    </>
  )
}

export default Timeline;
