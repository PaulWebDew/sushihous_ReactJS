import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getBasketFromLS } from '../../utils/getBasketFromLS';

export interface BasketItem {
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

interface InitialState{
  totalPrice:number,
  items: BasketItem[]
 }

const {jsonBasketItems, totalBasketPrice} = getBasketFromLS();

const initialState:InitialState = {
  totalPrice: totalBasketPrice,
  items: jsonBasketItems,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem(state, action:PayloadAction<BasketItem>) {
      getBasketFromLS()
      const findItem = state.items.find((obj) => obj._id === action.payload._id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, action:PayloadAction<BasketItem>) {
      const findItem = state.items.find((obj) => obj._id === action.payload._id);
      if (findItem) {
        findItem.count > 0 ? findItem.count-- : (findItem.count = 0);
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItem(state, action:PayloadAction<String>) {
      state.items = state.items.filter((item) => item._id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0)},
    clearItems(state) {
      state.items = [];
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
  },
});

export const { addItem, minusItem, removeItem, clearItems } = basketSlice.actions;
export default basketSlice.reducer;
