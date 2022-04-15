import React from 'react'

const News = () => {
    return (
      <section className="modal">
        <div className="modal__wrapper">
          <div className="modal__inner">
            <section className="modal__body">
              <div className="modal__header">
                <h2 className="modal__title">Создать новость, блог</h2>
                <button className="modal__close-modal"></button>
              </div>
              <div className="modal__row">
                <label className="modal__label" htmlFor="name">
                  Заголовок
                </label>
                <input
                  className="modal__input"
                  id="name"
                  placeholder="Введите заголовок"
                />
              </div>
              <div className="modal__row">
                <label className="modal__label" htmlFor="description">
                  Описание
                </label>
                <textarea
                  className="modal__textarea"
                  id="description"
                  rows="4"
                ></textarea>
                <div className="modal__controls-box">
                  <button className="modal__controls modal__controls--richtext"></button>
                  <button className="modal__controls modal__controls--attach"></button>
                </div>
              </div>
              <section className="modal__row drag-drop">
                <label className="drag-drop__label" htmlFor="upload"></label>
                <input
                  className="drag-drop__input"
                  type="file"
                  id="upload"
                  multiple="multiple"
                />
                <p className="drag-drop__text">
                  Перетяните файлы
                  <br />
                  или кликните, чтобы выбрать
                </p>
              </section>
              <div className="modal__button-box">
                <button className="modal__button modal__button--create">
                  Создать
                </button>
                <button className="modal__button modal__button--cancel">
                  Отмена
                </button>
              </div>
            </section>
          </div>
        </div>
      </section>
    );
}

export default News
