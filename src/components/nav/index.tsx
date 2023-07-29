import React from 'react';

import { setSelectedCategory } from '../../storage/slices/categorySlice';
import { setCurrentPage } from '../../storage/slices/pagesSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';

import style from './style.module.scss';

type Inav = {
  activeSearch: boolean
}

type ICategoriesItem = {
  _id:string
  categoryId:number
  categoryValue:string
  categoryName:string
}

const  Nav: React.FC<Inav> = ({ activeSearch }) => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state) => state.category.categories);
  const selectedCategory = useAppSelector((state) => state.category.selectedCategoryId);

  const clickHandler = (categoryId:number) => {
    dispatch(setCurrentPage(1));
    dispatch(setSelectedCategory(categoryId));
  };

  return (
    <nav className={activeSearch ? style.nav + ' ' + style.activeSearch : style.nav}>
      <ul className={style.nav_list}>
        {categories.length !== 0 &&
          categories.map((item:ICategoriesItem, ind:number) => (
            <li
              className={item.categoryId === selectedCategory ? style.activCategory : ''}
              key={ind}
              onClick={() => clickHandler(item.categoryId)}>
              {item.categoryName}
            </li>
          ))}
      </ul>
    </nav>
  );
}

export default Nav;
