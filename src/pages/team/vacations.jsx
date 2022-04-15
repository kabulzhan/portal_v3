import React from 'react'

const Vacations = () => {
    return (
      <main>
        <section className="subheader">
          <div className="subheader__container container">
       
            <div className="subheader__col">
              <button className="subheader__button">Создать отпуск</button>
              <div className="subheader__dropdown dropdown">
                <div className="dropdown__input-wrapper">
                  <div className="dropdown__input" data-selected="2">
                    Списком
                  </div>
                </div>
                <ul className="dropdown__select select">
                  <li className="select__item" data-option="1">
                    На графике
                  </li>
                  <li className="select__item" data-option="2">
                    Списком
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="vacation-list container">
          <h2 className="vacation-list__title">Запросы на отпуск</h2>
          <div className="vacation-list__card">
            <p className="vacation-list__date">12.02.2020 - 15.03.2020</p>
            <div className="vacation-list__info">
              <a className="vacation-list__userpic-box" href="link-to-profile">
                <img
                  className="vacation-list__userpic"
                  src="assets/images/userpic.png"
                  alt=""
                />
              </a>
              <div>
                <a className="vacation-list__username" href="link-to-profile">
                  Иванов Александр, старший программист
                </a>
                <a className="vacation-list__department" href="link-to-department">
                  Программисты
                </a>
              </div>
            </div>
            <a className="vacation-list__link" href="">
              Одобрить
            </a>
            <a className="vacation-list__link" href="">
              Обсудить
            </a>
          </div>
          <div className="vacation-list__card">
            <p className="vacation-list__date">12.02.2020 - 15.03.2020</p>
            <div className="vacation-list__info">
              <a className="vacation-list__userpic-box" href="link-to-profile">
                <img
                  className="vacation-list__userpic"
                  src="assets/images/userpic.png"
                  alt=""
                />
              </a>
              <div>
                <a className="vacation-list__username" href="link-to-profile">
                  Иванов Александр, старший программист
                </a>
                <a className="vacation-list__department" href="link-to-department">
                  Программисты
                </a>
              </div>
            </div>
            <a className="vacation-list__link" href="">
              Одобрить
            </a>
            <a className="vacation-list__link" href="">
              Обсудить
            </a>
          </div>
          <h2 className="vacation-list__title">Отпуска</h2>
          <div className="vacation-list__card">
            <p className="vacation-list__date">12.02.2020 - 15.03.2020</p>
            <div className="vacation-list__info">
              <a className="vacation-list__userpic-box" href="link-to-profile">
                <img
                  className="vacation-list__userpic"
                  src="assets/images/userpic.png"
                  alt=""
                />
              </a>
              <div>
                <a className="vacation-list__username" href="link-to-profile">
                  Иванов Александр, старший программист
                </a>
                <a className="vacation-list__department" href="link-to-department">
                  Программисты
                </a>
              </div>
            </div>
          </div>
          <div className="vacation-list__card">
            <p className="vacation-list__date">12.02.2020 - 15.03.2020</p>
            <div className="vacation-list__info">
              <a className="vacation-list__userpic-box" href="link-to-profile">
                <img
                  className="vacation-list__userpic"
                  src="assets/images/userpic.png"
                  alt=""
                />
              </a>
              <div>
                <a className="vacation-list__username" href="link-to-profile">
                  Иванов Александр, старший программист
                </a>
                <a className="vacation-list__department" href="link-to-department">
                  Программисты
                </a>
              </div>
            </div>
          </div>
          <div className="vacation-list__card">
            <p className="vacation-list__date">12.02.2020 - 15.03.2020</p>
            <div className="vacation-list__info">
              <a className="vacation-list__userpic-box" href="link-to-profile">
                <img
                  className="vacation-list__userpic"
                  src="assets/images/userpic.png"
                  alt=""
                />
              </a>
              <div>
                <a className="vacation-list__username" href="link-to-profile">
                  Иванов Александр, старший программист
                </a>
                <a className="vacation-list__department" href="link-to-department">
                  Программисты
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
}

export default Vacations
