import React from 'react';
import "./SectionTitle.css";

function SectionTitle(props) {
  return (
    <>
      <h2 className='section-title'>{props.title}</h2>
      <div className={`section-line section-line_${props.modifier}`}></div>
    </>
  )
}

export default SectionTitle;
