import React from 'react';

import style from './style.module.scss';

const Contscts:React.FC = () => {
   return (
      <div className={style.contacts}>
<h1>Контакты</h1>
<p>Службы доставки:</p>
<p>Тел.: +375 (33) 657-00-90</p>
<p>Время работы: c 10:00 до 23:00</p>
-----------------------------------------------

<p>Cлужба Контроля Качества: </p>
<p>Для проведения служебной проверки просьба выслать:</p>
<ul>
   <li>-фотографию чека / номер заказа </li>
   <li>-телефон для связи</li>
   <li>-фотографию блюда</li>
   <li>-описание проблемы</li>
</ul>

------------------------------------------------
<p>Руководитель службы доставки:</p>
<p>Руководитель службы доставки:</p>
<p>E-mail: <a href = "mailto: paulwebdew@gmail.com">paulwebdew@gmail.com</a></p>

<p>Отдел франчайзинга:</p>
<p>Тел.: +375 (33) 657-00-90  (Пн-Пт: 11:00-19:00)</p>
<p>E-mail: <a href = "mailto: paulwebdew@gmail.com">paulwebdew@gmail.com</a></p>
      </div>
   );
}

export default Contscts;