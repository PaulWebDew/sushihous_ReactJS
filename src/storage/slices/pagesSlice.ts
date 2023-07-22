import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StateInit {
  pagesCount:number,
  currentPage:number,
  itemsOnPage:number,
}

const initialState:StateInit = {
  pagesCount: 0,
  currentPage: 1,
  itemsOnPage: 12,
};

const pagesCountSlice = createSlice({
  name: 'pagesCount',
  initialState,
  reducers: {
    setPagesCount(state, action:PayloadAction<number>) {
      state.pagesCount = action.payload;
    },
    setCurrentPage(state, action:PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setItemsOnPage(state, action:PayloadAction<number>) {
      state.itemsOnPage = action.payload;
    },
  },
});

export const { setPagesCount, setCurrentPage } = pagesCountSlice.actions;
export default pagesCountSlice.reducer;
