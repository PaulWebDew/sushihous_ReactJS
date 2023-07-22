import React from 'react';

import action1 from '../../assets/images/action1.jpg';
import action2 from '../../assets/images/action2.jpg';
import action3 from '../../assets/images/action3.webp';
import action4 from '../../assets/images/action4.jpg';


import style from './style.module.scss';

export const Actions:React.FC = () => {
   return (
      <div>
         <div className={style.action_item}>
            <img src={action3} alt="action" />
            <article>
               <h2>Счастливые Будни -30%</h2>
               <p>Акционная цена действует в рабочие дни с понедельника по пятницу с 10:00 до 17:00
               * Акция не суммируется с программой Кэшбэк, другими акциями и специальными предложениями</p>

               <p>
               **Обращаем внимание!
               Бесплатно к каждому роллу идет 1 соевый соус, имбирь и васаби приобретается отдельно!</p>
            </article>
         </div>
         <div className={style.action_item}>
            <img src={action2} alt="action" />
            <article>
               <h2>100 баллов за Отзыв</h2>
               <p>100 рублей на бонусный счет "СушиСтор Кэшбэк" за отзыв на Яндекс.Картах</p>

               <p>
               - оставь отзыв на Яндекс.Картах на любой из суши баров СушиСтор на Яндекс.Картах
               - пришли скриншот опубликованного отзыва в телеграм канал @sushistore_bonus
               - получи 100 бонусных рублей на счет "СушиСтор Кэшбэк"</p>
               <p>
               * на один номер телефона идет только одно начисление бонусов
               ** бонусы будут начислены в течении 72 часов с момента отправки скриншота опубликованного отзыва в телеграм @sushistore_bonus
               ***Условия и сроки проведения акции могут быть изменены в любой момент, без предварительного уведомления. В акции участвуют отзывы начиная от 10.10.2022</p>
            </article>
         </div>
         <div className={style.action_item}>
            <img src={action1} alt="action" />
            <article>
               <h2>Поке</h2>
               <p>Встречайте новинки летнего сезона боулы Поке. От 350 рублей.</p>
            </article>
         </div>
         <div className={style.action_item}>
            <img src={action4} alt="action" />
            <article>
               <h2>Программа Кэшбэк СушиСтор</h2>
            </article>
         </div>

      </div>
   );
}

export default Actions;