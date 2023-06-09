import React, {useEffect} from 'react';
import "./FilterCheckbox.css";
import {useLocation} from "react-router-dom";

function FilterCheckbox({id, checkbox, setCheckbox, label}) {
  const location = useLocation();

  const handleFilterClick = () => {
    setCheckbox((checkbox) => !checkbox);
    if(location.pathname === '/movies')
      localStorage.setItem('isShortMovie', !checkbox);
    if(location.pathname === '/saved-movies')
      localStorage.setItem('isShortSavedMovie', !checkbox);
  }

  useEffect(() => {
    if(location.pathname === '/movies')
      setCheckbox(JSON.parse(localStorage.getItem('isShortMovie')));
    if(location.pathname === '/saved-movies')
      setCheckbox(JSON.parse(localStorage.getItem('isShortSavedMovie')));
  }, [checkbox]);

  return (
    <div className="filter">
      <input className='filter__checkbox' checked={checkbox} onChange={handleFilterClick}
             id={id}
             type="checkbox"
      />
      <label className="filter__label" htmlFor={id}>{label}</label>
    </div>
  )
}

export default FilterCheckbox;
