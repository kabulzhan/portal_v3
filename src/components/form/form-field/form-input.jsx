import React, { useState, useEffect } from "react";
import { useController } from "react-hook-form";

const Bubble = ({ text }) => {
  return (
    <div className="bubble">
      <p className="bubble__text">{text}</p>
    </div>
  );
};

const FormInput = ({ props }) => {
  const { field, fieldState } = useController(props);
  const { classValid, classInValid, settings, action, prev, setValue } = props;
  const { name, icon, bubble, placeholder } = settings;
  const [passwordShown, setPasswordShown] = useState("password");

// отображаем предыдущее значение поля, если мы редактируем 
  useEffect(() => {
    if (prev) {
      setValue(`${name}`, prev);
    }
  }, [prev]);
  
  // нуна ли иконка скрытия пароля
  const hideInputValue =
    name === "password" && action !== "restorePassword" ? true : false;

// клик на скрытие пароля (глаз)
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown === "text" ? "password" : "text");
  };
  return (
    <div>
      <input
        type={hideInputValue ? passwordShown : "text"}
        placeholder={placeholder}
        className={!fieldState.error ? classValid : classInValid}
        {...field}
      />

      {icon &&
        (fieldState.invalid ? (
          <p className="form__error">Введите {name}</p>
        ) : (
          fieldState.isDirty && <span className="form__icon-input"></span>
        ))}

      {bubble && <Bubble text={bubble} />}

      {hideInputValue && (
        <span
          onClick={togglePasswordVisiblity}
          className={
            passwordShown === "text"
              ? "form__icon-input _visible"
              : "form__icon-input _invisible"
          }
        ></span>
      )}
    </div>
  );
};

export default FormInput;
