import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface StateInit {
  searchValue: string,
}


const initialState:StateInit = {
  searchValue: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch(state, action:PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});
export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
