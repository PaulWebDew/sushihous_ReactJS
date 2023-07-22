import React, { useEffect } from 'react';
import {useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentPage, setPagesCount } from '../../storage/slices/pagesSlice';

import style from './style.module.scss';

type IPagination = {
  totalItems: number,
}

const Pagination: React.FC <IPagination> =({ totalItems }) => {
  const dispatch = useAppDispatch();
  const itemsOnPage = useAppSelector((state) => state.pages.itemsOnPage);
  const currentPage = useAppSelector((state) => state.pages.currentPage);
  const countPages = Math.ceil(totalItems / itemsOnPage);

  const pagArr = () => {
    const res = [];
    for (let i = 1; i <= countPages; i++) {
      res.push(i);
    }
    return res;
  };

  const pagesArr = pagArr();
  useEffect(() => {
    dispatch(setPagesCount(pagesArr.length));
  }, [dispatch, pagesArr]);
  return (
    <div>
      <div className={style.pagination}>
        <button onClick={() => dispatch(setCurrentPage(currentPage > 1 ? currentPage - 1 : 1))}>
          <svg viewBox="0 0 448 512">
            <path d="M77.25 256l137.4-137.4c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0l-160 160c-12.5 12.5-12.5 32.75 0 45.25l160 160C175.6 444.9 183.8 448 192 448s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L77.25 256zM269.3 256l137.4-137.4c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0l-160 160c-12.5 12.5-12.5 32.75 0 45.25l160 160C367.6 444.9 375.8 448 384 448s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L269.3 256z" />
          </svg>
        </button>
        <ul className={style.pagination_list}>
          {pagesArr.map((item, ind) => {
            return (
              <li
                onClick={() => dispatch(setCurrentPage(ind + 1))}
                key={ind}
                className={
                  currentPage - 1 === ind
                    ? style.pagination_item + ' ' + style.pagination_item__active
                    : style.pagination_item
                }>
                {item}
              </li>
            );
          })}
        </ul>
        <button
          onClick={() =>
            dispatch(setCurrentPage(currentPage < countPages ? currentPage + 1 : countPages))
          }>
          <svg viewBox="0 0 448 512">
            <path d="M246.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L178.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C47.63 444.9 55.81 448 64 448s16.38-3.125 22.62-9.375l160-160C259.1 266.1 259.1 245.9 246.6 233.4zM438.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L370.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C239.6 444.9 247.8 448 256 448s16.38-3.125 22.62-9.375l160-160C451.1 266.1 451.1 245.9 438.6 233.4z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
