import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { page_goods } from '../../config/connectDB';
import { Url } from 'url';

interface FetchParams {
  searchValue: string,
  selectedCategory:number,
}

interface StateItem {
  title:String,
  info_count: Number,
  info_weigh: Number,
  price: Number,
  compos: String,
  UrlMin: String,
  UrlMax: String,
  category: String,
  _id:String
}

export const fetchGoods = createAsyncThunk<StateItem[],FetchParams>(
  'goods / fetchGoods',
  async ({ searchValue, selectedCategory }) => {
    const { data } = await axios.get<StateItem[]>(
      page_goods + `?search=${searchValue}&category=${selectedCategory}`,
    );
    return data;
  },
);



interface StateCategory {
  _id:string,
  categoryId:number,
  categoryValue:string,
  categoryName:string,
}

interface StateInit {
  items:StateItem[],
  categories:StateCategory[],
  status:'loading'|'success'|'error'
}



const initialState:StateInit = {
  items: [],
  categories: [],
  status: 'loading' /*loading, success, error*/,
};

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    setGoods(state, actions:PayloadAction<StateItem[]>) {
      state.items = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGoods.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchGoods.fulfilled, (state, action:PayloadAction<StateItem[]>) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchGoods.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const { setGoods } = goodsSlice.actions;
export default goodsSlice.reducer;
