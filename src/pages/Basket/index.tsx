import React from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector } from '../../hooks'

import { clearItems } from '../../storage/slices/basketSlice';

import BasketItem from '../../components/basketItem';


import style from './style.module.scss';

type IBusketItem = {
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

const Basket:React.FC = () => {
   const dispatch = useAppDispatch();
   const basketItems = useAppSelector(state=>state.basket.items);

   const basketSum = useAppSelector(state=>state.basket.totalPrice);
   const basketItemsCount = basketItems.reduce((count:number, item:IBusketItem)=>{
      return item.count + count;
   },0)
   return (
     <>
         <div className={style.basket_wrapper}>
            <h2 className={style.basket_header}>Корзина</h2>
               {basketItems&&basketItems.map((item:IBusketItem, index)=><BasketItem key={index}{...item}/>)}
         </div>

         {basketItems.length>0&&<div className={style.basket_footer}>
            <button><Link to='/'>назад</Link></button>
         <div className={style.total}>
            <div>Всего блюд: <span>{String(basketItemsCount)}</span></div>
            <div>Сумма заказа: <span>{basketSum} руб.</span> </div>
         </div>
            <button onClick={()=>dispatch(clearItems())}>Очистить корзину</button>
         </div>}
         {basketItems.length === 0 && <div className={style.freeBasket}><p>Ваша корзина пуста! <br/> <Link to={'/'}>Перейти на главную страницу для заказа!</Link></p></div>}
     </>
   );
}

export default Basket;