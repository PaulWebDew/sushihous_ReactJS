import React from 'react';
import style from './style.module.scss'
import { Link } from 'react-router-dom';

const NotFounded404:React.FC=()=> {
   return (
      <div className={style.notFounded}>
         <Link to={'shop/'} className={style.link}>Страница не  неайдена, <br/>
         перейти на главную страницу</Link>
      </div>
   );
}

export default NotFounded404;