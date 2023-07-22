
import { getBasketTotalPrice } from './getBasketTotalPrice';

export const getBasketFromLS = ()=>{
   const data = localStorage.getItem('basket');
   const jsonBasketItems = data?JSON.parse(data):[];
   const totalBasketPrice = getBasketTotalPrice(jsonBasketItems);


      return{
         jsonBasketItems,
         totalBasketPrice,
      }

}