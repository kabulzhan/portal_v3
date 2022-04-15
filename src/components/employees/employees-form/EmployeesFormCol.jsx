import React, { useEffect } from 'react'
import { useController } from "react-hook-form";

const EmployeesFormCol = (props) => {
  const {setValue, name} = props;
  const { label, prev} = props.settings;
  const { field, fieldState } = useController(props);
  const classInValid = "modal__input form__input--invalid";
  const classValid = "modal__input";

  //  предыдущее значение поля, если мы редактируем
  useEffect(() => {
    if (prev) {
      setValue(`${name}`, prev);
    }
  }, [prev]);

  return (
    <div className="modal__col">
      <label className="modal__label" htmlFor={name}>
        {label}
      </label>
      <input
        className={!fieldState.error ? classValid : classInValid}
        id={name}
        {...field}
      />
      {fieldState.invalid && <p className="form__error">Введите {name}</p>}
    </div>
  );
};

export default EmployeesFormCol
