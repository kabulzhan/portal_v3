import React from "react";

const BeforeDeleteWarning = ({ agree, refuse }) => {
  return (
    <div className="modal">
      <div
        className="modal__body modal__body--no-padding"
        style={{ width: 300 }}
      >
        Вы уверены, что хотите удалить элемент?
        <div style={{ margin: "30px auto",  width: 200 }}>
          <button style={{ width: 100 }} onClick={agree}>
            Да
          </button>
          <button style={{ width: 100 }} onClick={refuse}>
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeforeDeleteWarning;
