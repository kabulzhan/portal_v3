import React from 'react'
import Form from "../../../src/components/form/Form";
import api from "../../services/api";
// http://localhost:3000/restore_password/TestToken1243
const RestorePassword = () => {
    
  const password = {
    name: "password",
    icon: false,
    placeholder: 'Введите пароль',
    //  bubble: "Текст ",
    label: "Пароль",
    type: "password",
  };
    const passwordConfirm = {
      name: "passwordConfirm",
      icon: false,
      //  bubble: "Текст ",
      placeholder: "Введите пароль еще раз",
      label: "Подтвердите пароль",
      type: "passwordConfirm",
    };

  const inputs = [{ ...password }, { ...passwordConfirm }];

  return (
    <div className="page">
      <Form
        auth__title="Восстановление"
        auth__info="Введите новый пароль"
        // настройки url для сервера
        inputs={inputs}
        submitBtnValue="Сменить пароль и войти"
        action="restorePassword"
        requestURL={api.auth.resetPasword}
      />
    </div>
  );
}

export default RestorePassword
