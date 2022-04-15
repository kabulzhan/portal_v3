// форма логина, входа и восстановления пароля

// форму логина писала отсюда https://www.youtube.com/watch?v=QHIx5SGvpEE&list=PLn5fI7sMcqd1xyjGSKhM8SroKEG82qs0W&index=10&t=778s&ab_channel=Shchepotin

// исходный код https://github.com/Shchepotin/react-tutorial-real-app/blob/b98749cd424f03bd1b6cfc1be8ef3ddb3c771660/src/providers/AuthProvider/index.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import FormField from "./form-field/form-field";
import FormSubmitButton from "./form-field/form-submit-button";
import CheckEmailNotification from "./check-email-notification";
import * as yup from "yup";

const schemaForgot = yup.object().shape({
  email: yup.string().email().required(),
  identifier: yup.string().required(),
});

const schemaLogin = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  identifier: yup.string().required(),
});

const shemaRestorePassword = yup.object().shape({
  password: yup.string().required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
});

// переписать  запрос к серверу
const Form = ({
  auth__title,
  auth__info,
  submitBtnValue,
  inputs,
  action,
  requestURL,
  resetPassword,
}) => {
  const [checkEmail, setCheckEmail] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  let location = useLocation();

  const getDefValues = (items) => {
    let newObj = {};
    items.forEach((el, ind) => {
      newObj[el.name] = "";
    });
    return newObj;
  };

  const findSchema = (typeOfForm) => {
    switch (typeOfForm) {
      case "login":
        return schemaLogin;

      case "forgot":
        return schemaForgot;

      case "restorePassword":
        return shemaRestorePassword;

      default:
        return schemaLogin;
    }
  };
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(findSchema(action)),
    // action === "login" ? yupResolver(schemaLogin) : yupResolver(schemaForgot),
    mode: "onChange",
    defaultValues: getDefValues(inputs),
  });

// очищаем инпут при неправильном вводе
  // const clearInputs = (items) => {
  //   items.forEach((el, ind) => {
  //     resetField(el.name);
  //   });
  // };

  let from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    try {
      // setIsLoading(true);

      if (action === "login") {
        const { data: loginData } = await requestURL(data);

        auth.setUser({
          name: " петр тестирович",
          surname: "Тестир ",
          id: loginData.user_id,
        });
        auth.setToken(loginData.token);
        navigate(from, { replace: true });
      } else if (action === "forgot") {
        await requestURL(data);
        setCheckEmail(true);
      } else if (action === "restorePassword") {
  
        // тут будет отправляться токен и пароль
        // await requestURL(sendData);
        navigate(from, { replace: true });
      }
    } catch (e) {
      console.log(" назначаем ошибку", e);
      // if (e.response.status >= 400) {
      //   setError("warning", {
      //     type: "server",
      //     message: "Логин и пароль введены неверно",
      //   });
      //   clearInputs(inputs);
      // }
    } finally {
      // setIsLoading(false);
    }
  };
  //   zafar.c.sharp@gmail.com
  // 123
  // cmp1

  // const update = ()=> {
  // для автообновления токена
  // const getNewToken = () => {
  //   fetch(`http://80.78.248.55:3212/api/login`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: "zafar.c.sharp@gmail.com",
  //       identifier: "cmp1",
  //       password: "123",
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => console.log(res));
  // };
  // }
  return (
    <>
      {checkEmail && <CheckEmailNotification />}
      <section className="auth">
        <h1 className="auth__title">{auth__title}</h1>
        <p className="auth__info">{auth__info}</p>
        <form className="auth__form form" onSubmit={handleSubmit(onSubmit)}>
          {inputs.map((input, i) => (
            <FormField
              key={i}
              classValid="form__input"
              classInValid="form__input form__input--invalid"
              control={control}
              settings={input}
              name={input.name}
              action={action}
              resetPassword={resetPassword}
            />
          ))}
          {errors.warning && (
            <div className="form__warning-box warning-box">
              {errors.warning && errors.warning.message}
            </div>
          )}
          <FormSubmitButton isValid={isValid} text={submitBtnValue} />
        </form>
      </section>
      <p className="copy">© 2021 Все права защищены.</p>
    </>
  );
};

export default Form;
