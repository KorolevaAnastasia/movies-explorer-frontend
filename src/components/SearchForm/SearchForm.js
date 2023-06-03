import React, {useState} from 'react';
import "./SearchForm.css";
import {useForm} from "react-hook-form";
import searchIcon from '../../images/search.svg';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Button from "../Button/Button";

function SearchForm() {
  const [isChecked, setIsChecked] = useState(false);
  const { register, handleSubmit } = useForm({
    mode: "onChange"
  });

  const onSubmit = data => {
    //console.log(data);
  };

  function handleChangeCheckbox() {
    setIsChecked(!isChecked);
  }

  return (
    <section className="search">
      <div className="search-form">
        <form className="search-form__content" name='search' onSubmit={handleSubmit(onSubmit)}>
          <img src={searchIcon} className="search-form__icon" alt="search"/>
          <input className="search-form__input" type="text" placeholder="Фильм"
          {...register('search')}/>
          <Button
            name=''
            type='submit'
            className='button_find'
          />
        </form>
        <div className="search-form__addition">
          <FilterCheckbox
            id="short-films"
            checked={isChecked}
            onChange={handleChangeCheckbox}
            label='Короткометражки'
          />
        </div>
      </div>
    </section>
  )
}

export default SearchForm;
