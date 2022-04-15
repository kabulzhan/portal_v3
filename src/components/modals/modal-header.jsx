import React from "react";
//  компонент формы - шапка с крестиком 
const ModalHeader = ({ onClose, title, addDepartment, onAdd }) => {
  return (
    <div className="modal__header">
      <h2 className="modal__title">{title}</h2>
      {/* кнопка добавить департамент */}
      {addDepartment && (
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

export default ModalHeader;
