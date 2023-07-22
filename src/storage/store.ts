import { configureStore } from '@reduxjs/toolkit';
import categorySlice from './slices/categorySlice';
import searchSlice from './slices/searchSlice';
import pagesSlice from './slices/pagesSlice';
import basketSlice from './slices/basketSlice';
import goodsSlice from './slices/goodsSlice';
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    category: categorySlice,
    search: searchSlice,
    pages: pagesSlice,
    basket: basketSlice,
    goods: goodsSlice,
    auth:authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
