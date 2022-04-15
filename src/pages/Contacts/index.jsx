import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Contacts = () => {

    let location = useLocation();

    
    
       return (
         <p>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Non enim,
           amet tempore aut corrupti placeat? Voluptate hic nulla at dicta
           harum, eveniet ea ex facere minima, excepturi adipisci possimus fuga?
           Corporis in, facilis maiores repellendus soluta, odit veritatis fugit
           ipsam enim incidunt aut distinctio provident. Numquam nobis magni
           corporis ab asperiores, mollitia ullam dolorum unde natus voluptas
           quam incidunt quos? Rerum atque dolore adipisci voluptatem nulla,
           nihil est odit veniam quas explicabo illo aspernatur quo. Hic veniam
           delectus eligendi, magnam fugit ut labore corrupti cumque adipisci,
           exercitationem eveniet saepe laudantium? Ea eligendi asperiores
           dolore eveniet, debitis eaque fugit dolor rem aliquam sapiente in
           commodi minus libero suscipit reprehenderit adipisci quo doloribus
           sequi ut nisi! Tempore deleniti perferendis porro! Sapiente,
           corporis! <h2>Contacts</h2>


           <Link
             state={{ backgroundLocation: location }} // какая страница у нас будет фоновой, где юзер находится в момент клика по ссылке на модалку
             to={{
               pathname: `/team/departments/${1}`,
             }}
           >
             {" "}
             Переадресация на модалку
           </Link>
         </p>

         // <section className="modal">
         //   <div className="modal__wrapper">
         //     <div className="modal__inner">
         //       <section className="modal__body">
         //         <div className="modal__header">
         //           <h2 className="modal__title">Контакты клиентов и партнеров</h2>
         //           <button className="modal__close-modal"></button>
         //         </div>
         //         <section className="profile__subheader subheader">
         //           <div className="subheader__col">
         //             <a className="subheader__link subheader__link--active" href="#">
         //               Партнеры
         //             </a>
         //             <a className="subheader__link" href="#">
         //               Клиенты
         //             </a>
         //           </div>
         //           <div className="subheader__col">
         //             <div className="search-box">
         //               <input
         //                 className="search-box__input"
         //                 placeholder="Поиск по сотрудникам"
         //               />
         //               <button type="submit" className="search-box__button"></button>
         //             </div>
         //           </div>
         //         </section>
         //         <section className="modal__profile profile">
         //           <section className="profile__contact">
         //             <h3 className="modal__subtitle">Название компании</h3>
         //             <div className="profile__item">
         //               <div className="profile__icon-contacts"></div>
         //               <div className="profile__content">
         //                 <div className="modal__row modal__row--start">
         //                   <div className="modal__col">
         //                     <p className="profile__label">Контакт</p>
         //                     <p className="profile__value">Александр Иванов</p>
         //                   </div>
         //                   <div className="modal__col">
         //                     <p className="profile__label">Электронная почта</p>
         //                     <a className="profile__value" href="mailto:mail@mail.ru">
         //                       mail@mail.ru
         //                     </a>
         //                   </div>
         //                 </div>
         //                 <div className="modal__row modal__row--start">
         //                   <div className="modal__col">
         //                     <p className="profile__label">Телефон</p>
         //                     <a className="profile__value" href="tel:+79161231212">
         //                       +7 916 123-12-12
         //                     </a>
         //                   </div>
         //                   <div className="modal__col">
         //                     <p className="profile__label">Другие контакты</p>
         //                     <p className="profile__value">skype @qweqwe</p>
         //                   </div>
         //                 </div>
         //               </div>
         //             </div>
         //           </section>
         //           <section className="profile__contact">
         //             <h3 className="modal__subtitle">Название компании</h3>
         //             <div className="profile__item">
         //               <div className="profile__icon-contacts"></div>
         //               <div className="profile__content">
         //                 <div className="modal__row modal__row--start">
         //                   <div className="modal__col">
         //                     <p className="profile__label">Контакт</p>
         //                     <p className="profile__value">Александр Иванов</p>
         //                   </div>
         //                   <div className="modal__col">
         //                     <p className="profile__label">Электронная почта</p>
         //                     <a className="profile__value" href="mailto:mail@mail.ru">
         //                       mail@mail.ru
         //                     </a>
         //                   </div>
         //                 </div>
         //                 <div className="modal__row modal__row--start">
         //                   <div className="modal__col">
         //                     <p className="profile__label">Телефон</p>
         //                     <a className="profile__value" href="tel:+79161231212">
         //                       +7 916 123-12-12
         //                     </a>
         //                   </div>
         //                   <div className="modal__col">
         //                     <p className="profile__label">Другие контакты</p>
         //                     <p className="profile__value">skype @qweqwe</p>
         //                   </div>
         //                 </div>
         //               </div>
         //             </div>
         //             <div className="profile__item">
         //               <div className="profile__icon-contacts"></div>
         //               <div className="profile__content">
         //                 <div className="modal__row modal__row--start">
         //                   <div className="modal__col">
         //                     <p className="profile__label">Контакт</p>
         //                     <p className="profile__value">Александр Иванов</p>
         //                   </div>
         //                   <div className="modal__col">
         //                     <p className="profile__label">Электронная почта</p>
         //                     <a className="profile__value" href="mailto:mail@mail.ru">
         //                       mail@mail.ru
         //                     </a>
         //                   </div>
         //                 </div>
         //                 <div className="modal__row modal__row--start">
         //                   <div className="modal__col">
         //                     <p className="profile__label">Телефон</p>
         //                     <a className="profile__value" href="tel:+79161231212">
         //                       +7 916 123-12-12
         //                     </a>
         //                   </div>
         //                   <div className="modal__col">
         //                     <p className="profile__label">Другие контакты</p>
         //                     <p className="profile__value">skype @qweqwe</p>
         //                   </div>
         //                 </div>
         //               </div>
         //             </div>
         //             <div className="profile__item">
         //               <div className="profile__icon-contacts"></div>
         //               <div className="profile__content">
         //                 <div className="modal__row modal__row--start">
         //                   <div className="modal__col">
         //                     <p className="profile__label">Контакт</p>
         //                     <p className="profile__value">Александр Иванов</p>
         //                   </div>
         //                   <div className="modal__col">
         //                     <p className="profile__label">Электронная почта</p>
         //                     <a className="profile__value" href="mailto:mail@mail.ru">
         //                       mail@mail.ru
         //                     </a>
         //                   </div>
         //                 </div>
         //                 <div className="modal__row modal__row--start">
         //                   <div className="modal__col">
         //                     <p className="profile__label">Телефон</p>
         //                     <a className="profile__value" href="tel:+79161231212">
         //                       +7 916 123-12-12
         //                     </a>
         //                   </div>
         //                   <div className="modal__col">
         //                     <p className="profile__label">Другие контакты</p>
         //                     <p className="profile__value">skype @qweqwe</p>
         //                   </div>
         //                 </div>
         //               </div>
         //             </div>
         //           </section>
         //           <div className="modal__button-box">
         //             <button className="modal__button modal__button--create">
         //               Добавить
         //             </button>
         //             <button className="modal__button modal__button--cancel">
         //               Отмена
         //             </button>
         //           </div>
         //         </section>
         //       </section>
         //     </div>
         //   </div>
         // </section>
       );
}

export default Contacts;
