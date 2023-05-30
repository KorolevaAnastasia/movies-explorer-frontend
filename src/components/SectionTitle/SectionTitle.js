import React from 'react';
import "./SectionTitle.css";

function SectionTitle(props) {
  return (
    <>
      <h2 className="section__title">{props.title}</h2>
      <div className={`section__line section__line_${props.modifier}`}></div>
    </>
  )
}

export default SectionTitle;
