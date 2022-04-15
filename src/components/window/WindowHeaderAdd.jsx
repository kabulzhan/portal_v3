import React from 'react'
// шапка модалки для Positions
const WindowHeaderAdd = ({ onClose, title, onAdd }) => {
  return (
    <div className="modal__header">
      <h2 className="modal__title">{title}</h2>
      {/* кнопка добавить , если передали функцию onAdd */}

      {onAdd && (
        <div className="modal__header-buttons">
          <button onClick={onAdd} className="modal__header-button">
            Добавить
          </button>
        </div>
      )}

      <button onClick={onClose} className="modal__close-modal"></button>
    </div>
  );
};

export default WindowHeaderAdd
