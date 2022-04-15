import React from 'react'
// компонент списка должностей - 
const WindowItemDeleteEdit = ({ item, onDelete, onEdit }) => {
  const { title, qty} = item;

  return (
    <div className="modal-grid__tr">
      <div className="modal-grid__td">
        <span className="modal-grid__description">Должность</span>
        <p>{title}</p>
      </div>
      <div className="modal-grid__td">
        <span className="modal-grid__description">Сотрудники</span>
        <p>{qty}</p>
      </div>
      <div className="modal-grid__td modal-grid__td--button">
        <div className="modal-grid__control-box">
          <button
            onClick={() => onEdit(item)}
            className="modal-grid__control modal-grid__control--edit"
          ></button>
          <button
            onClick={() => onDelete(item)}
            className="modal-grid__control modal-grid__control--delete"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default WindowItemDeleteEdit
