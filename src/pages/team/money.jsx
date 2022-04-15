import React from 'react'

const Money = () => {
    return (
      <main>
        {/* <section className="subheader">
          <div className="subheader__container container">
            <div className="subheader__col">
              <a className="subheader__link subheader__link--active" href="#">
                Команда
              </a>
              <a className="subheader__link" href="#">
                Отделы
              </a>
              <a className="subheader__link" href="#">
                Зарплаты
              </a>
              <a className="subheader__link" href="#">
                Выплаты
              </a>
              <a className="subheader__link" href="#">
                Отпуска
              </a>
            </div>
            <div className="subheader__col">
              <button className="subheader__button">Выдача зарплат и премий</button>
            </div>
          </div>
        </section>
        <section className="salary">
          <div className="salary__container container">
            <h2 className="salary__title">Выплаты сотрудникам</h2>
            <form className="salary-filter">
              <div className="salary-filter__date-range date-range">
                <div className="salary-filter__input-wrapper date-range__input-wrapper">
                  <input
                    className="date-range__input"
                    data-range
                    readOnly="readOnly"
                    placeholder="Дата начала"
                  />
                  <span className="date-range__icon-calendar"></span>
                </div>
                <div className="salary-filter__input-wrapper date-range__input-wrapper">
                  <input
                    className="date-range__input"
                    data-range
                    readOnly="readOnly"
                    placeholder="Дата окончания"
                  />
                  <span className="date-range__icon-calendar"></span>
                </div>
              </div>
              <div className="salary-filter__dropdown dropdown">
                <div className="dropdown__input-wrapper">
                  <div className="dropdown__input" data-selected="">
                    Отдел
                  </div>
                </div>
                <ul className="dropdown__select select">
                  <li className="select__item" data-option="1">
                    Отдел 1
                  </li>
                  <li className="select__item" data-option="2">
                    Отдел 2
                  </li>
                  <li className="select__item" data-option="3">
                    Отдел 3
                  </li>
                  <li className="select__item" data-option="4">
                    Отдел 4
                  </li>
                </ul>
              </div>
              <button className="salary-filter__button" type="submit">
                Показать
              </button>
            </form>
            <h2 className="salary__title">Программисты</h2>
            <table className="salary__table salary-table">
              <thead className="salary-table__header">
                <tr>
                  <td className="salary-table__col">Кто</td>
                  <td className="salary-table__col">Должность</td>
                  <td className="salary-table__col">Руб/месяц</td>
                </tr>
              </thead>
              <tbody className="salary-table__body">
                <tr>
                  <td className="salary-table__col">
                    <img
                      className="salary-table__userpic"
                      src="assets/images/userpic.png"
                      alt=""
                    />
                    <span className="salary-table__username">Петров Михаил</span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">Должность</span>
                    <span className="salary-table__position">
                      Старший программист
                    </span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">
                      Ставка руб/мес
                    </span>
                    <span className="salary-table__pay">50 000</span>
                  </td>
                </tr>
                <tr>
                  <td className="salary-table__col">
                    <img
                      className="salary-table__userpic"
                      src="assets/images/userpic.png"
                      alt=""
                    />
                    <span className="salary-table__username">Петров Михаил</span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">Должность</span>
                    <span className="salary-table__position">
                      Старший программист
                    </span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">
                      Ставка руб/мес
                    </span>
                    <span className="salary-table__pay">50 000</span>
                  </td>
                </tr>
                <tr>
                  <td className="salary-table__col">
                    <img
                      className="salary-table__userpic"
                      src="assets/images/userpic.png"
                      alt=""
                    />
                    <span className="salary-table__username">Петров Михаил</span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">Должность</span>
                    <span className="salary-table__position">
                      Старший программист
                    </span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">
                      Ставка руб/мес
                    </span>
                    <span className="salary-table__pay">50 000</span>
                  </td>
                </tr>
                <tr>
                  <td className="salary-table__col">
                    <img
                      className="salary-table__userpic"
                      src="assets/images/userpic.png"
                      alt=""
                    />
                    <span className="salary-table__username">Петров Михаил</span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">Должность</span>
                    <span className="salary-table__position">
                      Старший программист
                    </span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">
                      Ставка руб/мес
                    </span>
                    <span className="salary-table__pay">50 000</span>
                  </td>
                </tr>
                <tr>
                  <td className="salary-table__col">
                    <img
                      className="salary-table__userpic"
                      src="assets/images/userpic.png"
                      alt=""
                    />
                    <span className="salary-table__username">Петров Михаил</span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">Должность</span>
                    <span className="salary-table__position">
                      Старший программист
                    </span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">
                      Ставка руб/мес
                    </span>
                    <span className="salary-table__pay">50 000</span>
                  </td>
                </tr>
                <tr>
                  <td className="salary-table__col">
                    <img
                      className="salary-table__userpic"
                      src="assets/images/userpic.png"
                      alt=""
                    />
                    <span className="salary-table__username">Петров Михаил</span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">Должность</span>
                    <span className="salary-table__position">
                      Старший программист
                    </span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">
                      Ставка руб/мес
                    </span>
                    <span className="salary-table__pay">50 000</span>
                  </td>
                </tr>
                <tr>
                  <td className="salary-table__col">
                    <img
                      className="salary-table__userpic"
                      src="assets/images/userpic.png"
                      alt=""
                    />
                    <span className="salary-table__username">Петров Михаил</span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">Должность</span>
                    <span className="salary-table__position">
                      Старший программист
                    </span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">
                      Ставка руб/мес
                    </span>
                    <span className="salary-table__pay">50 000</span>
                  </td>
                </tr>
              </tbody>
              <tfoot className="salary-table__footer">
                <tr>
                  <td className="salary-table__col">Итого:</td>
                  <td className="salary-table__col salary-table__col--hidden"></td>
                  <td className="salary-table__col">350 000</td>
                </tr>
              </tfoot>
            </table>
            <h2 className="salary__title">Дизайнеры</h2>
            <table className="salary__table salary-table">
              <thead className="salary-table__header">
                <tr>
                  <td className="salary-table__col">Кто</td>
                  <td className="salary-table__col">Должность</td>
                  <td className="salary-table__col">Руб/месяц</td>
                </tr>
              </thead>
              <tbody className="salary-table__body">
                <tr>
                  <td className="salary-table__col">
                    <img
                      className="salary-table__userpic"
                      src="assets/images/userpic.png"
                      alt=""
                    />
                    <span className="salary-table__username">Петров Михаил</span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">Должность</span>
                    <span className="salary-table__position">Дизайнер</span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">
                      Ставка руб/мес
                    </span>
                    <span className="salary-table__pay">50 000</span>
                  </td>
                </tr>
                <tr>
                  <td className="salary-table__col">
                    <img
                      className="salary-table__userpic"
                      src="assets/images/userpic.png"
                      alt=""
                    />
                    <span className="salary-table__username">Петров Михаил</span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">Должность</span>
                    <span className="salary-table__position">Дизайнер</span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">
                      Ставка руб/мес
                    </span>
                    <span className="salary-table__pay">50 000</span>
                  </td>
                </tr>
                <tr>
                  <td className="salary-table__col">
                    <img
                      className="salary-table__userpic"
                      src="assets/images/userpic.png"
                      alt=""
                    />
                    <span className="salary-table__username">Петров Михаил</span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">Должность</span>
                    <span className="salary-table__position">Дизайнер</span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">
                      Ставка руб/мес
                    </span>
                    <span className="salary-table__pay">50 000</span>
                  </td>
                </tr>
                <tr>
                  <td className="salary-table__col">
                    <img
                      className="salary-table__userpic"
                      src="assets/images/userpic.png"
                      alt=""
                    />
                    <span className="salary-table__username">Петров Михаил</span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">Должность</span>
                    <span className="salary-table__position">Дизайнер</span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">
                      Ставка руб/мес
                    </span>
                    <span className="salary-table__pay">50 000</span>
                  </td>
                </tr>
                <tr>
                  <td className="salary-table__col">
                    <img
                      className="salary-table__userpic"
                      src="assets/images/userpic.png"
                      alt=""
                    />
                    <span className="salary-table__username">Петров Михаил</span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">Должность</span>
                    <span className="salary-table__position">Дизайнер</span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">
                      Ставка руб/мес
                    </span>
                    <span className="salary-table__pay">50 000</span>
                  </td>
                </tr>
                <tr>
                  <td className="salary-table__col">
                    <img
                      className="salary-table__userpic"
                      src="assets/images/userpic.png"
                      alt=""
                    />
                    <span className="salary-table__username">Петров Михаил</span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">Должность</span>
                    <span className="salary-table__position">Дизайнер</span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">
                      Ставка руб/мес
                    </span>
                    <span className="salary-table__pay">50 000</span>
                  </td>
                </tr>
                <tr>
                  <td className="salary-table__col">
                    <img
                      className="salary-table__userpic"
                      src="assets/images/userpic.png"
                      alt=""
                    />
                    <span className="salary-table__username">Петров Михаил</span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">Должность</span>
                    <span className="salary-table__position">Дизайнер</span>
                  </td>
                  <td className="salary-table__col salary-table__col--vertical">
                    <span className="salary-table__description">
                      Ставка руб/мес
                    </span>
                    <span className="salary-table__pay">50 000</span>
                  </td>
                </tr>
              </tbody>
              <tfoot className="salary-table__footer">
                <tr>
                  <td className="salary-table__col">Итого:</td>
                  <td className="salary-table__col salary-table__col--hidden"></td>
                  <td className="salary-table__col">350 000</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section> */}
      </main>
    );
}

export default Money
