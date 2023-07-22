import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { page_categories } from '../../config/connectDB';
import axios from 'axios';



interface StateCategory {
  _id:string,
  categoryId:number,
  categoryValue:string,
  categoryName:string,
}

interface StateInit {
  selectedCategoryId: number,
  categories:StateCategory[],
}

export const fetchCategory = createAsyncThunk<StateCategory[]>(
  'categories/fetchCategory', async ()=>{
    const {data} = await axios.get(page_categories);
    return data;
  }
)

const initialState:StateInit= {
  selectedCategoryId: 0,
  categories: [],
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategories(state, action:PayloadAction<StateCategory[]>) {
      state.categories = action.payload;
    },
    setSelectedCategory(state, action:PayloadAction<number>) {
      state.selectedCategoryId = action.payload;
    },
  },

  extraReducers:(builder) =>{
    builder.addCase(fetchCategory.fulfilled, (state, action:PayloadAction<StateCategory[]>)=>{
    state.categories = action.payload;
    })
  },
});

export const { getCategories, setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;