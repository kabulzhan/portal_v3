import React from 'react'
// универсальный компонент формы - кнопки сохранить / отмена 
const ModalBottom = ({
  onClose,
  onCreate,
  formIsValid,
  formValues,
  isValid,
  action
}) => {
  // const checkIsValidForm = () => {
  //   if (
  //     !!formValues.row.title &&
  //     !!formValues.row.head_id &&
  //     !!formValues.employees?.length > 0
  //   ) {
  //     console.log("is valid");
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };
  return (
    <div className="modal__button-box">
      <button
        disabled={!isValid}
        // disabled={checkIsValidForm()}
        onClick={onCreate}
        className="modal__button modal__button--create"
      >
        {action === "edit" ? "Сохранить" : "Создать"}
      </button>
      <button onClick={onClose} className="modal__button modal__button--cancel">
        Отмена
      </button>
    </div>
  );
};

export default ModalBottom
