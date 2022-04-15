import React from 'react'
import Form from '../../components/form/Form'
import api from "../../services/api";
const identifier = {
    name: "identifier",
    icon: true,
    // bubble: "Текст",
    placeholder: 'Введите идентификатор',
    label: "Идентификатор компании",
    type: "text",
};

const email = {
    name: "email",
    icon: true,
    // bubble: "Текст",
    placeholder: 'Введите почту',
    label: "Почта",
    type: "text",
};


//  СДЕЛАТЬ ПЕРЕДАЧУ ФУНКЦИИ ДЛЯ ОТПРАВКИ НОВОГО ПАРОЛЯ НА ПОЧТУ
const inputs = [{ ...identifier }, { ...email }];
const Forgot = () => {
    return (
        <div className="page">
            <Form
                auth__title="Восстановление"
                auth__info="Заполните поля формы, воспользуйтесь ссылкой, пришедшей на почту, чтобы восстановить доступ к аккаунту."
                action="forgot"
                inputs={inputs}
                submitBtnValue="Напомнить"
                requestURL={api.auth.restorePassword}
            />
        </div>
    )
}

export default Forgot
