import { BasketItem } from "../storage/slices/basketSlice";


export const getBasketTotalPrice = (items:BasketItem[]) =>{

   return items.reduce((sum, obj) => {
      return obj.price * obj.count + sum;
    }, 0);

}