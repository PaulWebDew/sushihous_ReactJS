import React, { useEffect, useRef } from 'react';
import {useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import qs, { ParsedQs } from 'qs';

import ProductCard from '../../components/productCard';
import Sceleton from '../../components/productCard/sceleton';
import Pagination from '../../components/pagination';
import { setCurrentPage } from '../../storage/slices/pagesSlice';
import { setSearch } from '../../storage/slices/searchSlice';
import { setSelectedCategory} from '../../storage/slices/categorySlice';
import { fetchGoods } from '../../storage/slices/goodsSlice';

import style from './style.module.scss';

const Main:React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isFilters = useRef(false); /*запрещаем повторный запрос при рендере*/
  const isMounted = useRef(false); /*запрещаем создание строки запроса*/

  const goods = useAppSelector((state) => state.goods.items);
  const status = useAppSelector((state) => state.goods.status);
  const selectedCategory = useAppSelector((state) => state.category.selectedCategoryId);
  const searchValue = useAppSelector((state) => state.search.searchValue);
  const { currentPage, itemsOnPage } = useAppSelector((state) => state.pages);



  const getGoods = async () => {
    dispatch(fetchGoods({ searchValue, selectedCategory }));
  };
  useEffect(() => {
    /* диспатчим данные фильтра из строки поиска при наличии данных фильтрации*/
    if (window.location.search) {
      const params:ParsedQs = qs.parse(window.location.search.substring(1));
      dispatch(setCurrentPage(Number(params.currentPage)));
      dispatch(setSelectedCategory(Number(params.selectedCategory)));
      dispatch(setSearch(String(params.searchValue)));
      isFilters.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

    window.scrollTo(0, 0);
    /* делаем запрос при первом рендере*/
    if (!isFilters.current) {
      getGoods();
    }
    isFilters.current = false; /*запрещаем повторный запрос*/
    /*создание строки запроса при повторном рендере */
    if (isMounted.current) {
      const queryString = qs.stringify({
        searchValue,
        selectedCategory,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true; /*разрешаем создание строки запроса*/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, selectedCategory, currentPage]);

  return (
    <div>
      {status === 'loading' ? (<div className={style.main}>
          {[...new Array(12)].map((_, ind) => <Sceleton key={ind} />)}
          </div>) : (
        <div className={style.main}>
          {goods.map((obj:any, index) => {
            if (
              (index >= (currentPage - 1) * itemsOnPage) /*условие пагинации*/ &&
              (index < currentPage * itemsOnPage)
            ) {
              return <ProductCard key={Number(index)} {...obj} />;
            } else return '';
          })}
        </div>
      )}
      {status === 'success' && <Pagination totalItems={goods.length} />}
    </div>
  );
}

export default Main;
