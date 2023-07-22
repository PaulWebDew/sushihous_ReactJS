import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../hooks';
import axios from '../../axios';

import { page_login, page_getMe, page_register } from '../../config/connectDB';
import { error } from 'console';

interface UserType {
  _id:string,
  name:string,
  login:string,
  email:string,
  passwordHash:string,
  token:string,
  createdAt:Date,
  updatedAt:Date,
  }

interface stateAuth{
    user:UserType|null,
    status:string,
    message: string,
  }

interface FetchParams  {
  email:string,
  password:string
}


export const fetchUserData = createAsyncThunk('auth/fetchUserData',
 async (params:FetchParams )=> {
  const res = await axios.post(page_login, params).catch(err=>err);
  return res;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister',
 async (params:FetchParams )=> {
  const { data } = await axios.post(page_register, params);
  return data;
});

export const fetchGetMe = createAsyncThunk('auth/fetchGetMe',
async ()=>{
  const {data} =await axios.get(page_getMe);
  return data;
} )


const initialState:stateAuth = {
  user: null,
  status: 'loading',
  message: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    logout:(state)=>{
      state.user=null
    },
    setMessage:(state, action:PayloadAction<any>)=>{
      state.message = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = 'loading';
      state.user = null;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action:PayloadAction<any>) => {
      state.status = 'loaded';
      state.user = action.payload.data;
    });
    builder.addCase(fetchUserData.rejected, (state, action:PayloadAction<any>) => {
      state.status = 'error';
      state.user = null;
    });
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = 'loading';
      state.user = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action:PayloadAction<any>) => {
      state.status = 'loaded';
      state.user = action.payload;

    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = 'error';
      state.user = null;
    });
    builder.addCase(fetchGetMe.pending, (state) => {
      state.status = 'loading';
      state.user = null;
    });
    builder.addCase(fetchGetMe.fulfilled, (state, action:PayloadAction<any>) => {
      state.status = 'loaded';
      state.user = action.payload;
    });
    builder.addCase(fetchGetMe.rejected, (state) => {
      state.status = 'error';
      state.user = null;
    });
  },
});


export const {logout}= authSlice.actions;
export default authSlice.reducer;
