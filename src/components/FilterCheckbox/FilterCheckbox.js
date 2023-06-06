import React, {useEffect} from 'react';
import "./FilterCheckbox.css";

function FilterCheckbox({id, checkbox, setCheckbox, label}) {

  const handleFilterClick = () => {
    setCheckbox((checkbox) => !checkbox);
    localStorage.setItem('isShortMovie', !checkbox);
  }

  useEffect(() => {
    setCheckbox(JSON.parse(localStorage.getItem('isShortMovie')));
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
