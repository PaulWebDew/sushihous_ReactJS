import React from 'react';
import{ useDispatch} from 'react-redux';
import { addItem, removeItem, minusItem } from '../../storage/slices/basketSlice';
import { uploadUrl } from '../../config/connectDB';

import style from './style.module.scss'

type IBasketItem = {
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

const BasketItem: React.FC<IBasketItem> = ({title,
   info_count,
   info_weigh,
   price,
   compos,
   UrlMin,
   UrlMax,
   category,
   _id,
   count}) =>{
   const dispatch = useDispatch();

   const  onClickPlus=()=>{
      dispatch(addItem({title,
         info_count,
         info_weigh,
         price,
         compos,
         UrlMin,
         UrlMax,
         category,
         _id,
         count}))
   };
   const  onClickMinus =()=>{
      dispatch(minusItem({title,
         info_count,
         info_weigh,
         price,
         compos,
         UrlMin,
         UrlMax,
         category,
         _id,
         count}))
   };
   const removeBasketItem = ()=>{
      dispatch(removeItem(_id))
   }
   return (
      <div className={style.basket}>

       <div className={style.basket_item}>
                  <div className={style.basket_item__card}>
                        <img src={`${uploadUrl}${UrlMin}`} alt="sushi img" />
                        <div className={style.card_info}>
                           <p>{title}</p>
                           <p className={style.info_count}>{String(info_count)}шт. | {String(info_weigh)}гр.</p>
                        </div>
                  </div>
                  <div className={style.basket_item__count}>
                     <button onClick={onClickMinus}>
                     <svg viewBox="0 0 256 256" ><circle cx="128" cy="128" fill="none" r="96"  strokeMiterlimit="10" strokeWidth="16"/><line fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" x1="88" x2="168" y1="128" y2="128"/></svg>
                     </button>
                     <p>{count}</p>
                     <button onClick={onClickPlus}>
                     <svg viewBox="0 0 256 256" >
                        <circle cx="128" cy="128" fill="none" r="96"  strokeMiterlimit="10" strokeWidth="16"/><line fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" x1="88" x2="168" y1="128" y2="128"/><line fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" x1="128" x2="128" y1="88" y2="168"/>
                     </svg>
                     </button>
                  </div>
                  <div className={style.basket_item__sum}>
                     <p>{price*count} руб.</p>
                  </div>
                  <div className={style.basket_item__delete} onClick={removeBasketItem}>
                     <svg viewBox="0 0 24 24">
                        <g className="st0" id="grid"/><g id="icon"><path d="M22.124,6.055c0.501-0.502,0.501-1.318,0-1.82l-2.357-2.357c-0.486-0.486-1.335-0.485-1.82,0l-5.742,5.742   c-0.112,0.111-0.294,0.111-0.406,0L6.055,1.877c-0.486-0.486-1.334-0.487-1.821,0L1.876,4.234c-0.501,0.502-0.501,1.318,0,1.82   l5.742,5.742c0.112,0.112,0.112,0.294,0,0.406l-5.743,5.742c-0.501,0.502-0.501,1.318,0,1.82l2.357,2.357   c0.487,0.487,1.336,0.486,1.82,0l5.742-5.742c0.112-0.111,0.294-0.111,0.406,0l5.742,5.742c0.243,0.243,0.566,0.377,0.911,0.377   c0.344,0,0.667-0.134,0.91-0.377l2.358-2.357c0.501-0.502,0.501-1.318,0-1.82l-5.742-5.742c-0.112-0.112-0.112-0.294,0-0.406   L22.124,6.055z M15.673,12.91C15.674,12.91,15.674,12.91,15.673,12.91l5.742,5.742c0.112,0.112,0.112,0.294,0,0.406l-2.357,2.357   c-0.108,0.109-0.298,0.109-0.406,0l-5.742-5.742c-0.251-0.251-0.581-0.376-0.91-0.376s-0.659,0.125-0.91,0.376l-5.743,5.742   c-0.107,0.109-0.297,0.109-0.406,0l-2.357-2.357c-0.112-0.112-0.112-0.294,0-0.406l5.743-5.742c0.501-0.502,0.501-1.318,0-1.82   L2.584,5.348c-0.112-0.112-0.112-0.294,0-0.406l2.357-2.357c0.108-0.109,0.298-0.109,0.406,0l5.742,5.742   c0.502,0.502,1.318,0.502,1.82,0l5.743-5.742c0.107-0.109,0.297-0.109,0.406,0l2.357,2.357c0.112,0.112,0.112,0.294,0,0.406   l-5.743,5.742C15.172,11.592,15.172,12.408,15.673,12.91z"/></g>
                     </svg>
                  </div>
               </div>
      </div>
   );
}

export default BasketItem;