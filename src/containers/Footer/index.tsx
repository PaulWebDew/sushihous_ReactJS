import React from 'react';
import { Link } from 'react-router-dom';
import {useAppSelector } from '../../hooks';

import logo from '../../assets/images/logo-sushistore.svg'

import style from './style.module.scss'

export const Footer:React.FC = () => {

   const categories = useAppSelector((state) => state.category.categories);

   return (
      <footer className={style.footer}>
         <div className={style.footer_logo}>
            <img src={logo} alt="" />
            <span>2023 © «СушиХаус»</span>
            <a href="tel:+375336570090">тел. +375(33) 657-00-90</a>
         </div>
         <div className={style.menu}>
            <div>
               <h2>Меню</h2>
               <ul>
                  {categories.map((item, ind)=><li key = {ind}>{item.categoryName}</li>)}
               </ul>
            </div>
            <div>
               <h2>Компания</h2>
                  <ul>
                  <li><Link to={'/actions'}>Акции</Link></li>
                   <li><Link to={'/delivery'}>Доставка</Link></li>
                   <li><Link to={'/contacts'}>Контакты</Link></li>
                  </ul>
            </div>
         </div>

      </footer>
   );
}

export default Footer;