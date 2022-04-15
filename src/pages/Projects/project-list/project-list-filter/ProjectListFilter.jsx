import React from 'react'

const ProjectListFilter = () => {
  return (
    <form className="project-list__filter project-filter">
      <div className="project-filter__row">
        <div className="project-filter__col">
          <span className="project-filter__tag tag">тэг</span>
          <span className="project-filter__tag tag">тэг</span>
          <span className="project-filter__tag tag">тэг</span>
        </div>
        <div className="project-filter__col project-filter__col--dropdown">
          <div className="project-filter__dropdown dropdown dropdown--narrow">
            <div className="dropdown__input" data-selected="1">
              Ответственный
            </div>
            <ul className="dropdown__select select">
              <li className="select__item" data-option="1">
                Сотрудник 1
              </li>
              <li className="select__item" data-option="2">
                Сотрудник 2
              </li>
              <li className="select__item" data-option="3">
                Сотрудник 3
              </li>
            </ul>
          </div>
          <div className="project-filter__dropdown dropdown dropdown--narrow">
            <div className="dropdown__input" data-selected="1">
              Исполнитель
            </div>
            <ul className="dropdown__select select">
              <li className="select__item" data-option="1">
                Сотрудник 1
              </li>
              <li className="select__item" data-option="2">
                Сотрудник 2
              </li>
              <li className="select__item" data-option="3">
                Сотрудник 3
              </li>
            </ul>
          </div>
          <div className="project-filter__dropdown dropdown dropdown--narrow">
            <div className="dropdown__input" data-selected="1">
              Кто создал
            </div>
            <ul className="dropdown__select select">
              <li className="select__item" data-option="1">
                Сотрудник 1
              </li>
              <li className="select__item" data-option="2">
                Сотрудник 2
              </li>
              <li className="select__item" data-option="3">
                Сотрудник 3
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="project-filter__row">
        <div className="project-filter__col">
          <div className="project-filter__date-range date-range">
            <p className="date-range__title">Период начала:</p>
            <div className="date-range__input-wrapper">
              <input
                className="date-range__input date-range__input--start date-range__input--small"
                data-range
                readOnly="readOnly"
              />
              <input
                className="date-range__input date-range__input--end date-range__input--small"
                data-range
                readOnly="readOnly"
              />
            </div>
            <span className="date-range__icon-calendar"></span>
            <span className="date-range__icon-arrow"></span>
          </div>
          <div className="project-filter__date-range date-range">
            <p className="date-range__title">Период окончания:</p>
            <div className="date-range__input-wrapper">
              <input
                className="date-range__input date-range__input--start date-range__input--small"
                data-range
                readOnly="readOnly"
              />
              <input
                className="date-range__input date-range__input--end date-range__input--small"
                data-range
                readOnly="readOnly"
              />
            </div>
            <span className="date-range__icon-calendar"></span>
            <span className="date-range__icon-arrow"></span>
          </div>
          <div className="project-filter__date-range date-range">
            <p className="date-range__title">Дата создания:</p>
            <div className="date-range__input-wrapper">
              <input
                className="date-range__input date-range__input--start date-range__input--small"
                data-range
                readOnly="readOnly"
              />
              <input
                className="date-range__input date-range__input--end date-range__input--small"
                data-range
                readOnly="readOnly"
              />
            </div>
            <span className="date-range__icon-calendar"></span>
            <span className="date-range__icon-arrow"></span>
          </div>
        </div>
        <div className="project-filter__col">
          <div className="project-filter__wrapper">
            <p className="project-filter__title">Сортировать:</p>
            <div className="project-filter__dropdown dropdown dropdown--narrow">
              <div className="dropdown__input" data-selected="1">
                по дате
              </div>
              <ul className="dropdown__select select">
                <li className="select__item" data-option="1">
                  по дате
                </li>
                <li className="select__item" data-option="2">
                  по варианту 2
                </li>
                <li className="select__item" data-option="3">
                  по варианту 3
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProjectListFilter