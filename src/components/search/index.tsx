import React, { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import debounce from 'lodash.debounce';

import Nav from '../nav';
import { setSearch } from '../../storage/slices/searchSlice';

import style from './style.module.scss';

const  Search:React.FC = () => {
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>();
  const [activeCategory, setActiveCategory] = useState<number>(0); /*состояние активной категориии поиска*/
  const [activeSearch, setActiveSearch] = useState<boolean>(false); /* состояние vivsible для поиска */


  const chActiveCat = (ind:number) => {
    setActiveCategory(ind);
  }; /* функция для изменения индекса активной категории*/
  const clearInput = () => {
    setSearchValue('');
    dispatch(setSearch(''));
    inputRef.current?.focus();
  };


  // eslint-disable-next-line
  const updatedSarchValue = useCallback(debounce((val) => dispatch(setSearch(val)), 500),[]
  );

  const inputHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    updatedSarchValue(event.target.value);
  };

  const clickSearch = () => {
    setActiveSearch(!activeSearch);
    setSearchValue('');
    dispatch(setSearch(''));
  };

  return (
    <div className={style.search}>
      <div
        className={activeSearch ? style.search_icon + ' ' + style.active : style.search_icon}
        onClick={clickSearch}>
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <title />
          <g id="search">
            <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
          </g>
        </svg>
      </div>

      <div className={style.wrapper}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: activeSearch ? 1 : 0 }}
          transition={{
            duration: 1,
          }}
          className={
            activeSearch ? style.search_field + ' ' + style.activeSearch_field : style.search_field
          }>


          <input
            ref={inputRef}
            className={style.search_field__input}
            type="text"
            value ={searchValue}
            onChange={(event) => inputHandler(event)}
            placeholder="Поиск по сайту"
          />

          {searchValue && (
            <button className={style.search_field__button} onClick={clearInput}>
              <svg viewBox="0 0 24 24">
                <g />
                <g id="icon">
                  <path d="M22.124,6.055c0.501-0.502,0.501-1.318,0-1.82l-2.357-2.357c-0.486-0.486-1.335-0.485-1.82,0l-5.742,5.742   c-0.112,0.111-0.294,0.111-0.406,0L6.055,1.877c-0.486-0.486-1.334-0.487-1.821,0L1.876,4.234c-0.501,0.502-0.501,1.318,0,1.82   l5.742,5.742c0.112,0.112,0.112,0.294,0,0.406l-5.743,5.742c-0.501,0.502-0.501,1.318,0,1.82l2.357,2.357   c0.487,0.487,1.336,0.486,1.82,0l5.742-5.742c0.112-0.111,0.294-0.111,0.406,0l5.742,5.742c0.243,0.243,0.566,0.377,0.911,0.377   c0.344,0,0.667-0.134,0.91-0.377l2.358-2.357c0.501-0.502,0.501-1.318,0-1.82l-5.742-5.742c-0.112-0.112-0.112-0.294,0-0.406   L22.124,6.055z M15.673,12.91C15.674,12.91,15.674,12.91,15.673,12.91l5.742,5.742c0.112,0.112,0.112,0.294,0,0.406l-2.357,2.357   c-0.108,0.109-0.298,0.109-0.406,0l-5.742-5.742c-0.251-0.251-0.581-0.376-0.91-0.376s-0.659,0.125-0.91,0.376l-5.743,5.742   c-0.107,0.109-0.297,0.109-0.406,0l-2.357-2.357c-0.112-0.112-0.112-0.294,0-0.406l5.743-5.742c0.501-0.502,0.501-1.318,0-1.82   L2.584,5.348c-0.112-0.112-0.112-0.294,0-0.406l2.357-2.357c0.108-0.109,0.298-0.109,0.406,0l5.742,5.742   c0.502,0.502,1.318,0.502,1.82,0l5.743-5.742c0.107-0.109,0.297-0.109,0.406,0l2.357,2.357c0.112,0.112,0.112,0.294,0,0.406   l-5.743,5.742C15.172,11.592,15.172,12.408,15.673,12.91z" />
                </g>
              </svg>
            </button>
          )}
        </motion.div>
      </div>
      <Nav activeSearch={activeSearch} />
    </div>
  );
}

export default Search;
