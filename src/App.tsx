import React, {lazy, Suspense} from 'react';
import { Routes, Route } from 'react-router-dom';

import { useAppDispatch} from './hooks';
import { fetchGetMe } from './storage/slices/authSlice';
import { fetchCategory } from './storage/slices/categorySlice';

import Main from './containers/Main';
import NotFounded404 from './pages/NotFounded404';
import FullProductCartd from './components/fullProductCard';
import Register from './pages/Register'
import Login from './pages/Login';
import Header from './containers/Header';
import Footer from './containers/Footer';
import Actions from './pages/Actions';
import Delivery from './pages/Delivery';
import Contacts from './pages/Contacts'

import './styles/App.scss';

const Basket = lazy(()=>import(/*webpackChunkName: "Basket" */'./pages/Basket'))

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(()=>{
    dispatch(fetchGetMe());
    dispatch(fetchCategory());
  },[dispatch])
  return (
    <div className="appWrapper">
      <Header />
      <Routes>
        <Route path="shop/" element={<Main />} />
        <Route path="shop/login" element={<Login />} />
        <Route path="shop/register" element={<Register />} />
        <Route path="*" element={<NotFounded404 />} />
        <Route path="shop/product/:id" element={<FullProductCartd />} />
        <Route path="shop/basket" element={
        <Suspense fallback={<div style={{color:'white'}} >Идет загрузка...</div>}>
          <Basket />
        </Suspense>
        } />
        <Route path="shop/actions" element={<Actions />} />
        <Route path="shop/delivery" element={<Delivery />} />
        <Route path="shop/contacts" element={<Contacts />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
