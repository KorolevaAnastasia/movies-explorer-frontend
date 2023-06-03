import React from 'react';
import "./FilterCheckbox.css";

function FilterCheckbox(props) {

  return (
    <div className="filter">
      <input className='filter__checkbox' checked={props.checked} onChange={props.onChange}
             id={props.id}
             type="checkbox"
      />
      <label className="filter__label" htmlFor={props.id}>{props.label}</label>
    </div>
  )
}

export default FilterCheckbox;
