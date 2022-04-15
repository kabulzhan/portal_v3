import React, { useEffect } from "react";
import { useController } from "react-hook-form";

const EmployeesTextarea = (props) => {
  const { prev, setValue , height} = props;
  const { field } = useController(props);
  const { label, name } = props.settings;

  // отображаем предыдущее значение поля, если мы редактируем
  useEffect(() => {
    if (prev) {
      setValue(`${name}`, prev);
    }
  }, [prev]);

  return (
    <div className="modal__row">
      <label
        className="modal__label"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="modal__textarea modal__textarea--height"
        id={name}
        rows="2"
        style={{height: height} }
        {...field}
      />
    </div>
  );
};

export default EmployeesTextarea;
