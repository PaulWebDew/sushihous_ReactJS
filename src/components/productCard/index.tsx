import React from 'react';
import { Link } from 'react-router-dom';
import {useAppDispatch } from '../../hooks';
import style from './style.module.scss';
import { uploadUrl } from '../../config/connectDB';
import { addItem } from '../../storage/slices/basketSlice';
import { Url } from 'url';

type IProductCard = {
  title:String,
  info_count: Number,
  info_weigh: Number,
  price: number,
  compos: String,
  UrlMin: String,
  UrlMax: String,
  category: String,
  _id:String,
  count:number
}

const ProductCard: React.FC<IProductCard> =({ category,title,compos, UrlMin,UrlMax, info_count,info_weigh, price, _id,count}) =>{
  const dispatch = useAppDispatch();
  const addToBasket = () => {
    const item = {
      title,
      category,
      compos,
      info_count,
      info_weigh,
      price,
      UrlMin,
      UrlMax,
      _id,
      count,
    };
    dispatch(addItem(item));
  };

  return (
    <div className={style.productCard_wrap}>
      <Link to={`/product/${_id}`}>
        <div className={style.productCard_img}>
          <img src={uploadUrl+UrlMin} alt="sushi" />
        </div>

        <div className={style.productCard_info}>
          <div className={style.productCard_info__title}>
            <p>{title}</p>
          </div>
          <div className={style.productCard_info__weight}>{String(info_count)} шт | {String(info_weigh)} гр.</div>
          <div className={style.productCard_info__price}>{String(price)} p.</div>
        </div>
      </Link>
      <button className={style.product_button} onClick={addToBasket}>
        <div className={style.info_basket__button_image}>
          <svg
            width="40"
            height="25"
            fill="none"
            viewBox="0 0 60 45"
            xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M19,38c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S21.2,38,19,38z M19,44c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S20.1,44,19,44z" />
              <path d="M37,38c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S39.2,38,37,38z M37,44c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S38.1,44,37,44z" />
              <path d="M43.9,9.1C43.3,8.4,42.5,8,41.6,8H12.8l-0.6-3.5C12,3,10.8,2,9.3,2H2v2h7.3c0.5,0,0.9,0.4,1,0.9l4.5,28.6   c0.3,1.5,1.5,2.5,3,2.5H40v-2H17.8c-0.5,0-0.9-0.4-1-0.9L16.3,30h22.9c1.5,0,2.7-1,3-2.6l2.4-16C44.7,10.6,44.5,9.8,43.9,9.1z    M27,20v8h-4.1l-1.2-8H27z M21.4,18l-1.2-8H27v8H21.4z M29,20h5.3l-1.2,8H29V20z M29,18v-8h6.8l-1.2,8H29z M18.1,10l1.2,8h-4.9   l-1.3-8H18.1z M14.7,20h4.9l1.2,8H16L14.7,20z M40.2,27.1c-0.1,0.5-0.5,0.9-1,0.9h-4l1.2-8h4.9L40.2,27.1z M42.6,11.2l-1,6.8h-4.9   l1.2-8h3.7c0.3,0,0.6,0.1,0.8,0.4C42.5,10.5,42.7,10.8,42.6,11.2z" />
            </g>
          </svg>
        </div>
        <div className={style.info_basket__button_count}>В корзину</div>
      </button>
    </div>
  );
}

export default ProductCard;
