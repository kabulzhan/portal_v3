import React from "react";

const DepartmentItem = ({ item, onDelete, onEdit }) => {
  const {
    title,
    id,
    employees_qty,
    last_name,
    first_name,
  } = item;
  return (
    <li className="modal-table__row">
      <div className="modal-table__wrapper">
        <span className="modal-table__col">
          <span className="modal-table__description">Отдел</span>
          {title}
        </span>
        <span className="modal-table__col modal-table__col--wide">
          <span className="modal-table__description">Руководитель</span>
          <span className="modal-table__username" href="#">
            {last_name} {first_name}
          </span>{" "}
        </span>
        <span className="modal-table__col">
          <span className="modal-table__description">Сотрудников</span>
          {employees_qty}
        </span>
      </div>
      <div className="modal-table__col modal-table__col--buttons">
        <div className="modal-table__control-box">
          <button
            onClick={()=>{ onEdit(item);}}
            className="modal-table__control modal-table__control--edit"
          ></button>
          <button
            onClick={() => onDelete(id)}
            className="modal-table__control modal-table__control--delete"
          ></button>
        </div>
      </div>
    </li>
  );
};

export default DepartmentItem;