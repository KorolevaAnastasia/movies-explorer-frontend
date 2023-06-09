import React, {useEffect, useState} from 'react';
import "./SearchForm.css";
import {useForm} from "react-hook-form";
import searchIcon from '../../images/search.svg';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Button from "../Button/Button";

function SearchForm({onSearchClick, searchKeyword, checkbox, setCheckbox}) {
  const [isError, setIsError] = useState(false);
  const { register, handleSubmit, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      'search': searchKeyword.length ? searchKeyword : ''
    }
  });

  const onSubmit = data => {
    if(getValues().search.length === 0){
      setIsError(true);
    } else {
      setIsError(false);
      onSearchClick(data.search);
    }
  };

  useEffect(() => {
    function searchByEnter(evt) {
      if (evt.code === 'Enter')
        handleSubmit(onSubmit);
    }

    document.addEventListener('keydown', searchByEnter);
    return(() => {
      window.removeEventListener('keydown', searchByEnter);
    })
  }, []);

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
        <span className='search-form__input-error'>{isError && 'Нужно ввести ключевое слово.'}</span>
        <div className="search-form__addition">
          <FilterCheckbox
            id="short-films"
            checkbox={checkbox}
            setCheckbox={setCheckbox}
            label='Короткометражки'
          />
        </div>
      </div>
    </section>
  )
}

export default SearchForm;
