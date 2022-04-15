import React from 'react'
const Home = () => {
  return (
    <>
    {/* <Nav /> */}
      <main className="no-padding">
        <section className="index">
          <div className="index__container container">
            <div className="index__col">
              <div className="index__section-box">
                <section className="index__section">
                  <div className="index__title-wrapper">
                    <span className="index__title" href="">
                      Новости
                   </span>
                  </div>
                  <div className="index__post-wrapper">
                    <div className="index__post index-post">
                      <div className="index__message message">
                        <div className="message__col">
                          <div className="message__row">
                            <div className="message__info">
                              <p
                                className="
                                message__username
                                message__username--status
                                message__username--offline
                              "
                              >
                                Никита Курин
                              </p>
                              <p className="message__date">20 Jan 20:00</p>
                            </div>
                          </div>
                          <div className="index__content">
                            <span
                              className="
                              message__task-status message__task-status--success
                            "
                            >
                              Задача принята
                            </span>
                            <div className="message__quote quote quote--success">
                              <span className="quote__name">Джонни</span>
                              <span className="quote__date">20 Jan 15:00</span>
                              <span className="message__attach-link" href="#">
                                Выполнение задачи: 1. Задача №1 Сделать файл
                             </span>
                              <p className="quote__message">
                                Ребятки, все сделал, смотри. смотри, читай,
                                читай
                              </p>
                            </div>
                            Красавчик! Все круто сделал
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="index__post index-post">
                      <div className="index__message message">
                        <div className="message__col">
                          <div className="message__row">
                            <div className="message__info">
                              <p
                                className="
                                message__username
                                message__username--status
                                message__username--offline
                              "
                              >
                                Никита Курин
                              </p>
                              <p className="message__date">20 Jan 20:00</p>
                            </div>
                          </div>
                          <div className="index__content">
                            <span
                              className="
                              message__task-status message__task-status--error
                            "
                            >
                              Задача не принята
                            </span>
                            <div className="message__quote quote quote--error">
                              <span className="quote__name">Джонни</span>
                              <span className="quote__date">20 Jan 15:00</span>
                              <span className="message__attach-link" href="#">
                                Выполнение задачи: 1. Задача №1 Сделать файл
                             </span>
                              <p className="quote__message">
                                Ребятки, все сделал, смотри. смотри, читай,
                                читай
                              </p>
                            </div>
                            Комментарий почему не принята
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="index__section">
                  <div className="index__title-wrapper">
                    <span className="index__title" href="">
                      Блог
                   </span>
                  </div>
                  <div className="index__post-wrapper">
                    <div className="index__post index-post">
                      <div className="index-post__image">
                        <img src="assets/images/attach.jpg" alt="" />
                      </div>
                      <div className="index__message message">
                        <div className="message__col">
                          <div className="message__row">
                            <div className="message__info">
                              <p
                                className="
                                message__username
                                message__username--status
                                message__username--online
                              "
                              >
                                Никита Курин
                              </p>
                              <p className="message__date">20 Jan 20:00</p>
                            </div>
                          </div>
                          <div className="index__content">
                            Очень длинное сообщение с большим количеством
                            информации. Очень длинное сообщение с большим
                            количеством информации. Очень длинное сообщение с
                            большим количеством информации.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="index__post index-post">
                      <div className="index-post__image">
                        <img src="assets/images/attach.jpg" alt="" />
                      </div>
                      <div className="index__message message">
                        <div className="message__col">
                          <div className="message__row">
                            <div className="message__info">
                              <p
                                className="
                                message__username
                                message__username--status
                                message__username--offline
                              "
                              >
                                Никита Курин
                              </p>
                              <p className="message__date">20 Jan 20:00</p>
                            </div>
                          </div>
                          <div className="index__content">
                            Очень длинное сообщение с большим количеством
                            информации. Очень длинное сообщение с большим
                            количеством информации. Очень длинное сообщение с
                            большим количеством информации.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="index__section">
                  <div className="index__title-wrapper">
                    <span className="index__title" href="">
                      Блог 2
                   </span>
                  </div>
                  <div className="index__post-wrapper">
                    <div className="index__post index-post">
                      <div className="index__message message">
                        <div className="message__col">
                          <div className="message__row">
                            <div className="message__info">
                              <p
                                className="
                                message__username
                                message__username--status
                                message__username--offline
                              "
                              >
                                Никита Курин
                              </p>
                              <p className="message__date">20 Jan 20:00</p>
                            </div>
                          </div>
                          <div className="index__content">
                            <div className="message__quote quote">
                              <span className="quote__name">Джонни</span>
                              <span className="quote__date">20 Jan 15:00</span>
                              <p className="quote__message">
                                Часть сообщения для ответа
                              </p>
                            </div>
                            Ответ на сообщение
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="index__post index-post">
                      <div className="index__message message">
                        <div className="message__col">
                          <div className="message__row">
                            <div className="message__info">
                              <p
                                className="
                                message__username
                                message__username--status
                                message__username--online
                              "
                              >
                                Никита Курин
                              </p>
                              <p className="message__date">20 Jan 20:00</p>
                            </div>
                          </div>
                          <div className="index__content">
                            <div className="message__quote quote">
                              <span className="quote__name">Джонни</span>
                              <span className="quote__date">20 Jan 15:00</span>
                              <p className="quote__message">
                                Часть сообщения для ответа
                              </p>
                            </div>
                            Ответ на сообщение
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="index__post index-post">
                      <div className="index__message message">
                        <div className="message__col">
                          <div className="message__row">
                            <div className="message__info">
                              <p
                                className="
                                message__username
                                message__username--status
                                message__username--offline
                              "
                              >
                                Никита Курин
                              </p>
                              <p className="message__date">20 Jan 20:00</p>
                            </div>
                          </div>
                          <div className="index__content">
                            <div className="message__quote quote">
                              <span className="quote__name">Джонни</span>
                              <span className="quote__date">20 Jan 15:00</span>
                              <p className="quote__message">
                                Часть сообщения для ответа
                              </p>
                            </div>
                            Ответ на сообщение
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="index__section">
                  <div className="index__title-wrapper">
                    <span className="index__title" href="">
                      Опросы
                   </span>
                  </div>
                  <div className="index__post-wrapper">
                    <div className="index__post index-post">
                      <div className="index__message message">
                        <div className="message__col">
                          <div className="message__row">
                            <div className="message__info">
                              <p
                                className="
                                message__username
                                message__username--status
                                message__username--offline
                              "
                              >
                                Никита Курин
                              </p>
                              <p className="message__date">20 Jan 20:00</p>
                            </div>
                          </div>
                          <div className="index__content">
                            <div className="message__survey survey">
                              <p className="survey__date">
                                Опрос до 5 июня 2020
                              </p>
                              <form className="survey__form">
                                <p className="survey__question">
                                  На каком устройстве вы работаете?
                                </p>
                                <input
                                  className="survey__input"
                                  type="radio"
                                  id="var1"
                                  name="question"
                                  value="pc"
                                />
                                <label className="survey__label" htmlFor="var1">
                                  Стационарный компьютер
                                </label>
                                <input
                                  className="survey__input"
                                  type="radio"
                                  id="var2"
                                  name="question"
                                  value="mono"
                                  checked="checked"
                                />
                                <label className="survey__label" htmlFor="var2">
                                  Моноблок
                                </label>
                                <input
                                  className="survey__input"
                                  type="radio"
                                  id="var3"
                                  name="question"
                                  value="lap"
                                />
                                <label className="survey__label" htmlFor="var3">
                                  Ноутбук
                                </label>
                                <button
                                  className="survey__submit-button"
                                  type="submit"
                                >
                                  Голосовать
                                </button>
                                <div className="survey__result-box">
                                  <span className="survey__total">
                                    10 голосов
                                  </span>
                                  <button className="survey__cancel-button">
                                    Отказаться от голосования
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="index__post index-post">
                      <div className="index__message message">
                        <div className="message__col">
                          <div className="message__row">
                            <div className="message__info">
                              <p
                                className="
                                message__username
                                message__username--status
                                message__username--online
                              "
                              >
                                Никита Курин
                              </p>
                              <p className="message__date">20 Jan 20:00</p>
                            </div>
                          </div>
                          <div className="index__content">
                            <div className="message__survey survey">
                              <p className="survey__date">
                                Опрос до 5 июня 2020
                              </p>
                              <form className="survey__form">
                                <p className="survey__question">
                                  На каком устройстве вы работаете?
                                </p>
                                <input
                                  className="survey__input"
                                  type="radio"
                                  id="var4"
                                  name="question"
                                  value="pc"
                                />
                                <label className="survey__label" htmlFor="var4">
                                  Стационарный компьютер
                                </label>
                                <input
                                  className="survey__input"
                                  type="radio"
                                  id="var5"
                                  name="question"
                                  value="mono"
                                  checked="checked"
                                />
                                <label className="survey__label" htmlFor="var5">
                                  Моноблок
                                </label>
                                <input
                                  className="survey__input"
                                  type="radio"
                                  id="var6"
                                  name="question"
                                  value="lap"
                                />
                                <label className="survey__label" htmlFor="var6">
                                  Ноутбук
                                </label>
                                <button
                                  className="survey__submit-button"
                                  type="submit"
                                >
                                  Голосовать
                                </button>
                                <div className="survey__result-box">
                                  <span className="survey__total">
                                    10 голосов
                                  </span>
                                  <button className="survey__cancel-button">
                                    Отказаться от голосования
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div className="index__col">
              <div className="index__title-wrapper">
                <span className="index__title" href="">
                  Проекты
               </span>
              </div>
              <div className="index__cards">
                <div className="index__card project-card">
                  <span href="#link" className="project-card__link"></span>
                  <div className="project-card__header">
                    <span className="project-card__date">
                      12.12.2020 - 25.12.2020
                    </span>
                    <span className="project-card__status project-card__status--green">
                      В работе
                    </span>
                  </div>
                  <p className="project-card__description">
                    Строим здание, тут может быть какое-то большое описание
                    проекта
                  </p>
                  <span className="project-card__staff">Ответственный</span>
                  <div className="project-card__user">
                    <img
                      className="project-card__userpic"
                      src="assets/images/userpic.png"
                      alt=""
                    />
                    <span className="project-card__username">Никита Родин</span>
                  </div>
                  <div>
                    <span className="project-card__tag tag">тэг</span>
                    <span className="project-card__tag tag">тэг</span>
                  </div>
                </div>
                <div className="index__card project-card">
                  <span href="#link" className="project-card__link"></span>
                  <div className="project-card__header">
                    <span className="project-card__date">
                      12.12.2020 - 25.12.2020
                    </span>
                    <span className="project-card__status project-card__status--red">
                      В работе
                    </span>
                  </div>
                  <p className="project-card__description">
                    Строим здание, тут может быть какое-то большое описание
                    проекта
                  </p>
                  <span className="project-card__staff">Ответственный</span>
                  <div className="project-card__user">
                    <img
                      className="project-card__userpic"
                      src="assets/images/userpic.png"
                      alt=""
                    />
                    <span className="project-card__username">Никита Родин</span>
                  </div>
                  <div>
                    <span className="project-card__tag tag">тэг</span>
                    <span className="project-card__tag tag">тэг</span>
                  </div>
                </div>
                <div className="index__card project-card">
                  <span href="#link" className="project-card__link"></span>
                  <div className="project-card__header">
                    <span className="project-card__date">
                      12.12.2020 - 25.12.2020
                    </span>
                    <span className="project-card__status project-card__status--yellow">
                      В работе
                    </span>
                  </div>
                  <p className="project-card__description">
                    Строим здание, тут может быть какое-то большое описание
                    проекта
                  </p>
                  <span className="project-card__staff">Ответственный</span>
                  <div className="project-card__user">
                    <img
                      className="project-card__userpic"
                      src="assets/images/userpic.png"
                      alt=""
                    />
                    <span className="project-card__username">Никита Родин</span>
                  </div>
                  <div>
                    <span className="project-card__tag tag">тэг</span>
                    <span className="project-card__tag tag">тэг</span>
                  </div>
                </div>
                <div className="index__card project-card">
                  <span href="#link" className="project-card__link"></span>
                  <div className="project-card__header">
                    <span className="project-card__date">
                      12.12.2020 - 25.12.2020
                    </span>
                    <span className="project-card__status project-card__status--grey">
                      Завершен
                    </span>
                  </div>
                  <p className="project-card__description">
                    Строим здание, тут может быть какое-то большое описание
                    проекта
                  </p>
                  <span className="project-card__staff">Ответственный</span>
                  <div className="project-card__user">
                    <img
                      className="project-card__userpic"
                      src="assets/images/userpic.png"
                      alt=""
                    />
                    <span className="project-card__username">Никита Родин</span>
                  </div>
                  <div>
                    <span className="project-card__tag tag">тэг</span>
                    <span className="project-card__tag tag">тэг</span>
                  </div>
                </div>
                <div className="index__card project-card">
                  <span href="#link" className="project-card__link"></span>
                  <div className="project-card__header">
                    <span className="project-card__date">
                      12.12.2020 - 25.12.2020
                    </span>
                    <span className="project-card__status project-card__status--grey">
                      Запланирован
                    </span>
                  </div>
                  <p className="project-card__description">
                    Строим здание, тут может быть какое-то большое описание
                    проекта
                  </p>
                  <span className="project-card__staff">Ответственный</span>
                  <div className="project-card__user">
                    <img
                      className="project-card__userpic"
                      src="assets/images/userpic.png"
                      alt=""
                    />
                    <span className="project-card__username">Никита Родин</span>
                  </div>
                  <div>
                    <span className="project-card__tag tag">тэг</span>
                    <span className="project-card__tag tag">тэг</span>
                  </div>
                </div>
                <div className="index__card project-card">
                  <span href="#link" className="project-card__link"></span>
                  <div className="project-card__header">
                    <span className="project-card__date">
                      12.12.2020 - 25.12.2020
                    </span>
                    <span className="project-card__status project-card__status--green">
                      Завершен
                      <img
                        className="project-card__icon-notify"
                        src="assets/images/icons/notify.svg"
                        alt=""
                      />
                    </span>
                  </div>
                  <p className="project-card__description">
                    Строим здание, тут может быть какое-то большое описание
                    проекта
                  </p>
                  <span className="project-card__staff">Ответственный</span>
                  <div className="project-card__user">
                    <img
                      className="project-card__userpic"
                      src="assets/images/userpic.png"
                      alt=""
                    />
                    <span className="project-card__username">Никита Родин</span>
                  </div>
                  <div>
                    <span className="project-card__tag tag">тэг</span>
                    <span className="project-card__tag tag">тэг</span>
                  </div>
                </div>
                <div className="index__card project-card">
                  <span href="#link" className="project-card__link"></span>
                  <div className="project-card__header">
                    <span className="project-card__date">
                      12.12.2020 - 25.12.2020
                    </span>
                    <span className="project-card__status project-card__status--grey">
                      Завершен
                      <img
                        className="project-card__icon-notify"
                        src="assets/images/icons/notify.svg"
                        alt=""
                      />
                    </span>
                  </div>
                  <p className="project-card__description">
                    Строим здание, тут может быть какое-то большое описание
                    проекта
                  </p>
                  <span className="project-card__staff">Ответственный</span>
                  <div className="project-card__user">
                    <img
                      className="project-card__userpic"
                      src="assets/images/userpic.png"
                      alt=""
                    />
                    <span className="project-card__username">Никита Родин</span>
                  </div>
                  <div>
                    <span className="project-card__tag tag">тэг</span>
                    <span className="project-card__tag tag">тэг</span>
                  </div>
                </div>
                <div className="index__card project-card">
                  <span href="#link" className="project-card__link"></span>
                  <div className="project-card__header">
                    <span className="project-card__date">
                      12.12.2020 - 25.12.2020
                    </span>
                    <span className="project-card__status project-card__status--red">
                      В работе
                    </span>
                  </div>
                  <p className="project-card__description">
                    Строим здание, тут может быть какое-то большое описание
                    проекта
                  </p>
                  <span className="project-card__staff">Ответственный</span>
                  <div className="project-card__user">
                    <img
                      className="project-card__userpic"
                      src="assets/images/userpic.png"
                      alt=""
                    />
                    <span className="project-card__username">Никита Родин</span>
                  </div>
                  <div>
                    <span className="project-card__tag tag">тэг</span>
                    <span className="project-card__tag tag">тэг</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )

}

export default Home;
