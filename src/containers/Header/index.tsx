import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {useAppSelector, useAppDispatch } from '../../hooks';

import { logout } from '../../storage/slices/authSlice';
import logo from '../../assets/images/logo-sushistore.svg';
import Search from '../../components/search';

import style from './style.module.scss';
import { click } from '@testing-library/user-event/dist/click';

function Header() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isMounted = useRef(false)
  const list = useRef<HTMLUListElement>(null);
  const menu = useRef<HTMLButtonElement>(null);

  const [visibleNav, setVisibleNav] = useState<boolean> (false);
  const basketSum = useAppSelector((state) => state.basket.totalPrice);
  const basketItems = useAppSelector((state) => state.basket.items);
  const basketItemsCount = basketItems.reduce((count, item):number => {
    return item.count + count;
  }, 0);

useEffect(()=>{
  if(isMounted.current){  const jsonBasketItems = JSON.stringify(basketItems);
    localStorage.setItem('basket', jsonBasketItems);
  };
  isMounted.current = true;
}, [basketItems]);



useEffect(()=>{
  if(!visibleNav) return;
  const clickHandler = (((e) => {
    if(menu.current?.contains(e.target as HTMLElement))return;
  if(!list.current?.contains(e.target as HTMLElement)){
    setVisibleNav(false);
  }}) as EventListener)

  window.addEventListener('click', clickHandler);
  return ()=>{
    window.removeEventListener('click', clickHandler)
  }
},[visibleNav]);


const isAuth = useAppSelector(state=>state.auth.user?.token)
const clickLogout = ()=>{
  if(window.confirm('Вы действительно хотите выйти?')){
    dispatch(logout());
    window.localStorage.setItem('token','' )
  }
}

  return (
    <>
      <div className={style.info} >
        <Link to={'/'}>
          <div className={style.info_logo}>
            <img src={logo} alt="logo" />
          </div>
        </Link>
        <div className={style.info_phone}>
          <a href="tel:+375336570090">
            <div className={style.callSvg}>
              <svg id="Layer_1" viewBox="0 0 40 40">
                <g>
                  <g>
                    <g>
                      <g>
                        <path d="M20,2c9.925,0,18,8.075,18,18s-8.075,18-18,18c-9.925,0-18-8.075-18-18S10.075,2,20,2 M20,0      C8.955,0,0,8.954,0,20c0,11.047,8.955,20,20,20c11.047,0,20-8.953,20-20C40,8.954,31.047,0,20,0L20,0z" />
                      </g>
                    </g>
                  </g>
                  <path
                    clipRule="evenodd"
                    d="M14.371,9.793c1.207-0.228,1.998,1.133,2.6,2.072   c0.586,0.912,1.307,1.982,1.016,3.169c-0.162,0.666-0.764,1.029-1.219,1.422c-0.449,0.388-1.133,0.744-1.299,1.34   c-0.271,0.967,0.322,1.982,0.689,2.56c0.834,1.306,1.842,2.483,3.129,3.534c0.623,0.51,1.488,1.191,2.355,1.016   c1.295-0.262,1.637-1.859,3.047-2.072c1.342-0.203,2.25,0.77,3.008,1.422c0.73,0.631,1.908,1.439,1.828,2.52   c-0.047,0.621-0.545,1.006-0.977,1.381c-0.439,0.383-0.824,0.813-1.258,1.096c-1.051,0.686-2.34,1.022-3.82,0.976   c-1.451-0.045-2.607-0.538-3.656-1.097c-2.051-1.094-3.672-2.633-5.199-4.348c-1.502-1.686-2.889-3.682-3.656-5.889   c-0.957-2.756-0.451-5.587,1.098-7.353c0.262-0.3,0.676-0.613,1.055-0.935C13.49,10.284,13.84,9.893,14.371,9.793z"
                  />
                </g>
              </svg>
            </div>
            <p className={style.callNumber}>+375(33) 657-00-90</p>
          </a>
        </div>
        <div className={style.info_nav}>
          <button ref={menu} className={style.btnMenu} onClick={() => setVisibleNav(!visibleNav)}>
            <div
              className={
                visibleNav
                  ? style.btnMenu_burger + ' ' + style.btnMenu_burger__active
                  : style.btnMenu_burger
              }></div>
            <div>Menu</div>
          </button>
          <nav className={visibleNav ? style.visible : style.hidden}>
            <div className={style.listWrapper}>
              <ul className={style.list} ref={list}>
                {location.pathname!=='/'&&<li><Link to={'/'}>На главную</Link></li>}
                <li><Link to={'/actions'}>Акции</Link></li>
                <li><Link to={'/delivery'}>Доставка</Link></li>
                <li><Link to={'/contacts'}>Контакты</Link></li>
              </ul>
            </div>
          </nav>
        </div>
        {!isAuth&&<div className={style.info_login}>
          <Link to={'/login'}>
            <button className={style.btnLogin}>
              <div className={style.info_login__image}>
                <svg
                  data-name="Layer 1"
                  id="Layer_1"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg">
                  <title />
                  <path d="M32,32.86a9.22,9.22,0,1,1,9.21-9.22A9.23,9.23,0,0,1,32,32.86Zm0-15.43a6.22,6.22,0,1,0,6.21,6.21A6.21,6.21,0,0,0,32,17.43Z" />
                  <path d="M32,56.64a24.68,24.68,0,0,1-15.22-5.27,1.52,1.52,0,0,1-.57-1.06c0-.16,0-.31,0-.47a15.8,15.8,0,1,1,31.6,0c0,.16,0,.31,0,.47a1.52,1.52,0,0,1-.57,1.06A24.68,24.68,0,0,1,32,56.64ZM19.21,49.45a21.62,21.62,0,0,0,25.58,0,12.8,12.8,0,0,0-25.58,0Zm27.08.74h0Z" />
                  <path d="M32,56.64a24.65,24.65,0,1,1,15.22-5.27A24.68,24.68,0,0,1,32,56.64Zm0-46.28A21.63,21.63,0,0,0,18.64,49a21.64,21.64,0,0,0,35-17A21.67,21.67,0,0,0,32,10.36Z" />
                </svg>
              </div>
              <div className={style.info_login__title}>
                <p>Вход</p>
              </div>
            </button>
          </Link>
        </div>}
        {isAuth&&<div className={style.info_login}>
            <button className={style.btnLoginOut} onClick={clickLogout}>
              <div className={style.info_login__image}>
                <svg
                  data-name="Layer 1"
                  id="Layer_1"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg">
                  <title />
                  <path d="M32,32.86a9.22,9.22,0,1,1,9.21-9.22A9.23,9.23,0,0,1,32,32.86Zm0-15.43a6.22,6.22,0,1,0,6.21,6.21A6.21,6.21,0,0,0,32,17.43Z" />
                  <path d="M32,56.64a24.68,24.68,0,0,1-15.22-5.27,1.52,1.52,0,0,1-.57-1.06c0-.16,0-.31,0-.47a15.8,15.8,0,1,1,31.6,0c0,.16,0,.31,0,.47a1.52,1.52,0,0,1-.57,1.06A24.68,24.68,0,0,1,32,56.64ZM19.21,49.45a21.62,21.62,0,0,0,25.58,0,12.8,12.8,0,0,0-25.58,0Zm27.08.74h0Z" />
                  <path d="M32,56.64a24.65,24.65,0,1,1,15.22-5.27A24.68,24.68,0,0,1,32,56.64Zm0-46.28A21.63,21.63,0,0,0,18.64,49a21.64,21.64,0,0,0,35-17A21.67,21.67,0,0,0,32,10.36Z" />
                </svg>
              </div>
              <div className={style.info_login__title}>
                <p>Выход</p>
              </div>
            </button>
        </div>}
        {location.pathname !== '/basket/' && (
          <div>
            <Link to={'/basket/'}>
              <button className={style.info_basket__button}>
                <div className={style.info_basket__button_image}>
                  <svg
                    width="40"
                    height="25"
                    fill="none"
                    viewBox="0 0 60 45"
                    xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path d="M19,38c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S21.2,38,19,38z M19,44c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S20.1,44,19,44z" />
                      <path d="M37,38c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S39.2,38,37,38z M37,44c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S38.1,44,37,44z" />
                      <path d="M43.9,9.1C43.3,8.4,42.5,8,41.6,8H12.8l-0.6-3.5C12,3,10.8,2,9.3,2H2v2h7.3c0.5,0,0.9,0.4,1,0.9l4.5,28.6   c0.3,1.5,1.5,2.5,3,2.5H40v-2H17.8c-0.5,0-0.9-0.4-1-0.9L16.3,30h22.9c1.5,0,2.7-1,3-2.6l2.4-16C44.7,10.6,44.5,9.8,43.9,9.1z    M27,20v8h-4.1l-1.2-8H27z M21.4,18l-1.2-8H27v8H21.4z M29,20h5.3l-1.2,8H29V20z M29,18v-8h6.8l-1.2,8H29z M18.1,10l1.2,8h-4.9   l-1.3-8H18.1z M14.7,20h4.9l1.2,8H16L14.7,20z M40.2,27.1c-0.1,0.5-0.5,0.9-1,0.9h-4l1.2-8h4.9L40.2,27.1z M42.6,11.2l-1,6.8h-4.9   l1.2-8h3.7c0.3,0,0.6,0.1,0.8,0.4C42.5,10.5,42.7,10.8,42.6,11.2z" />
                    </g>
                  </svg>
                </div>
                <div className={style.info_basket__button_count}>
                  {basketItemsCount} / {basketSum}p.
                </div>
              </button>
            </Link>
          </div>
        )}
      </div>
      {location.pathname === '/' && <Search />}
    </>
  );
}

export default Header;
