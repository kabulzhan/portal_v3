import Form from "../../../src/components/form/Form";
import api from "../../services/api";

function Login() {
  const identifier = {
    name: "identifier",
    icon: true,
    // bubble: "Текст",
    placeholder: "Введите идентификатор",
    label: "Идентификатор компании",
    type: "text",
  };

  const email = {
    name: "email",
    icon: true,
    // bubble: "Текст",
    placeholder: "Введите почту",
    label: "Почта",
    type: "text",
  };

   const password = {
     name: "password",
     icon: false,
     //  bubble: "Текст ",
     placeholder: "Введите пароль",
     label: "Пароль",
     type: "password",
   };

   const inputs = [{ ...identifier }, { ...email }, { ...password }];
    return (
      <div className="page">
        <Form
          auth__title="Вход"
          auth__info="Если у вас нет аккаунта пройдите регистрацию"
          inputs={inputs}
          submitBtnValue="Отправить"
          action="login"
          resetPassword
          requestURL={api.auth.login}
        />
              {/* <button className="red" onClick={getNewToken}>Обновим токен</button> */}
      </div>
    );
}

export default Login;
