import React from 'react'

const ResultItem = ({ item, ind, initEditableResult, deleteResult }) => {
  return (
    <li className="modal-list__item">
      <span className="modal-list__name">
        {ind + 1}. {item.description}
      </span>
      <a className="modal-list__link" href="#" target="_blank">
        {item.type === "file" && "файл"}
        {item.type === "text" && "документ"}
      </a>
      <div className="modal__controls-box">
        <div
          onClick={() => initEditableResult(item)}
          className="modal__controls modal__controls--edit"
        ></div>
        <div
          onClick={() => deleteResult(item)}
          className="modal__controls modal__controls--delete"
        ></div>
      </div>
    </li>
  );
};

export default ResultItem