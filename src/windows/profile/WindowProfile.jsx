import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import io from "socket.io-client";
import {
  companyId,
  url_delete_emplyee,
  url_get_emplyee_info,
} from "../../settings/base-url";
import userPic from "./userpic.png";
import { useMatch, useLocation, useNavigate } from "react-router-dom";
import EmployeesForm from "../../components/employees/employees-form/EmployeesForm";
import Team from "../../pages/team/team";
import TeamTree from "../../pages/team/team-tree/TeamTree";
import { useTranslation } from "react-i18next";
import Preloader from "../../components/preloaders/Preloader";
import WindowFire from "../employees/WindowFire";
import BeforeDeleteWarning from "../../components/warnings/BeforeDeleteWarning";

const axios = require("axios");

// шапка модалки - уволенб в отпуске и тд
const StatusEmployee = () => {
  return (
    <>
      {/* <section className="status-header status-header--fired">
        <div className="status-header__container">
          <div className="status-header__info">
            <p className="status-header__text">Уволен</p>
          </div>
          <div className="status-header__button-box">
            <button className="status-header__button">Отменить</button>
            <button className="status-header__button">&#43;</button>
          </div>
        </div>
      </section> */}
      {/* <section className="status-header status-header--info">
      <div className="status-header__wrapper">
        <div className="status-header__info-box">
          <p className="status-header__title">Причина увольнения</p>
          <p className="status-header__text">По собственному желанию</p>
        </div>
        <div className="status-header__info-box">
          <p className="status-header__title">Комментарий</p>
          <p className="status-header__text">Ла ла ла ла ла ла</p>
        </div>
      </div>
    </section>
    <section className="status-header status-header--leaving">
      <div className="status-header__container">
        <div className="status-header__info">
          <p className="status-header__text">Увольняется с 12.12.2021</p>
        </div>
        <div className="status-header__button-box">
          <button className="status-header__button">Изменить</button>
          <button className="status-header__button">Отменить</button>
          <button className="status-header__button">&#43;</button>
        </div>
      </div>
    </section> */}
      {/* <section className="status-header status-header--go-vacation">
      <div className="status-header__container">
        <div className="status-header__info">
          <p className="status-header__text">Собирается в отпуск</p>
          <p className="status-header__text">12.12.2021 - 12.01.2022</p>
        </div>
        <div className="status-header__button-box">
          <button className="status-header__button">
            Отправить сообщение
          </button>
          <button className="status-header__button">Подтвердить</button>
          <button className="status-header__button">Отменить</button>
          <button className="status-header__button">&#43;</button>
        </div>
      </div>
    </section> */}
      <section className="status-header status-header--on-vacation">
        <div className="status-header__container">
          <div className="status-header__info">
            <p className="status-header__text">Идет в отпуск</p>
            <p className="status-header__text">12.12.2021 - 12.01.2022</p>
          </div>
          <div className="status-header__button-box">
            {/* <button className="status-header__button" value="Отменить" /> */}
            <button className="status-header__button">Изменить</button>
            <button className="status-header__button">Отменить</button>
          </div>
        </div>
      </section>
    </>
  );
};

const WindowProfile = ({ page }) => {
  const { t } = useTranslation();
  const translateKey = "common.rights"; // для перевода
  const navigate = useNavigate();
  let location = useLocation();
  const auth = useAuth();
  const routeMatchDepartments = useMatch("/team/departments/:id");
  const routeMatchUsers = useMatch("/team/users/:id");
  // получение id автоматически с двух url - с  team departments и users
  const profileId =
    routeMatchDepartments?.params.id | routeMatchUsers?.params.id;

  // статус модалки для редактирования
  const [modalEdit, setModalEdit] = useState(false);
  // подтверждаем удаление сотрудника
  const [confirmRemove, setConfirmRemove] = useState(false);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: auth.token,
    employee_id: profileId,
  };

  const [employeeData, setEmployeeData] = useState(null);

  // при закрытии модалки отправляем на пред страницу
  const handlerCloseModal = () => {
    let from = location.state?.backgroundLocation?.pathname || "/";
    navigate(from, { replace: true });
  };

  // инфа для построения модалки профиля
  useEffect(() => {
    // socket.emit("add_to_room", "employees_list");
    // url_get_emplyee_info`/${profileId}`
    axios
      .get(url_get_emplyee_info + "/" + profileId, {
        headers,
        company_id: companyId,
      })
      .then(
        (res) => {
          setEmployeeData(res.data.employeeInfo);
        },
        (error) => {
          console.log(error, "error");
        }
      );
  }, [auth.token]);

  if (employeeData) {
    const {
      first_name,
      last_name,
      date_start,
      birthday,
      contacts_email,
      contacts_phone,
      contacts_address,
      contacts_other,
      passport_hidden,
      passport_visible,
      status,
      position,
      department,
      head_first_name,
      head_last_name,
    } = employeeData.employee[0];

    const { employee_salaries } = employeeData.employee_salaries;
    const { employee_social, employee_rights } = employeeData; // тут будем форматировать

    const getWorkExperience = (data) => {
      return "5 лет ";
    };

    const handlerEdit = () => {
      setModalEdit(true);
    };

    const handlerDelete = () => {
      setConfirmRemove(true);
    };

    const sendRemovedEmployee = () => {
      // axios
      //   .delete(url_delete_emplyee, {
      //     headers,
      //     body: { employee_id: profileId },
      //   })
      //   .then(
      //     (res) => {
      //       console.log(res, "удалили  успешно");
      //       setConfirmRemove(false);
      //     },
      //     (error) => {
      //       console.log(error, "словили ошибку при удалении");
      //     }
      //   );
      let from = routeMatchDepartments ? "/team/departments" : "/team/";

      fetch(url_delete_emplyee, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
        body: JSON.stringify({ employee_id: profileId }),
      })
        .then((res) => res.json())
        .then(console.log(" удалили успешно"))
        // .then((res) => console.log(res))
        .then(navigate(from, { replace: true }))
        .catch((err) => console.log(err, "словили ошибку при удалении"));
    };

    //  удаляем лишнее, что приходит с сервера с датой (время и тд)
    const formatDate = (dateString) => {
      if (dateString) {
        return dateString
          .substr(0, 10)
          .replace(/-/g, ".")
          .split(".")
          .reverse()
          .join(".");
      } else {
        return "";
      }
    };

    return (
      <>
        {page && page === "TeamList" ? <Team /> : <TeamTree />}

        <section className="modal">
          <div className="modal__wrapper">
            <div className="modal__inner">
              <strong>User ID: </strong>
              {/* {id + 'ТУТ ИДИШШНИК '} */}

              <section className="modal__body modal__body--no-padding">
                <StatusEmployee />
                {confirmRemove && (
                  <BeforeDeleteWarning
                    agree={() => {
                      sendRemovedEmployee();
                    }}
                    refuse={() => setConfirmRemove(false)}
                  />
                )}

                <div className="modal__header modal__header--padding">
                  <h2 className="modal__title">Карточка работника</h2>
                  <div className="modal__header-buttons">
                    <button
                      onClick={() => {
                        handlerEdit();
                      }}
                      className="modal__header-button"
                    >
                      Ред.
                    </button>
                    <button
                      //
                      onClick={() => {
                        handlerDelete();
                      }}
                      className="modal__header-button"
                    >
                      Удалить
                    </button>
                  </div>
                  <button
                    onClick={() => handlerCloseModal()}
                    className="modal__close-modal"
                  ></button>
                </div>
                <section className="modal__profile profile">
                  <div className="modal__row modal__row--center">
                    <div className="modal__col">
                      <div className="profile__userpic">
                        <img src={userPic} alt="" />
                      </div>
                    </div>
                    <div className="modal__col">
                      <p className="profile__username">
                        {last_name} {first_name}
                      </p>
                      <p className="profile__state person-state person-state--vacation">
                        Собирается в отпуск
                      </p>
                      <p className="profile__status">
                        {(status && status) || " Статус  не указан"}
                      </p>
                      <div>
                        {/* тут рендерим ссылки с сервера на соц сети */}
                        {/* <p className="profile__value">
                        {(employee_social.length > 0 && employee_social) ||
                          "не указано"}
                      </p> */}
                        {/* <a
                          href="#"
                          className="modal__social-link social-link social-link--twi"
                        ></a>
                        <a
                          href="#"
                          className="modal__social-link social-link social-link--insta"
                        ></a>
                        <a
                          href="#"
                          className="modal__social-link social-link social-link--fb"
                        ></a> */}
                      </div>
                    </div>
                  </div>
                  <div className="modal__row modal__row--start">
                    <div className="modal__col">
                      <p className="profile__label">Дата рождения</p>
                      <p className="profile__value">{formatDate(birthday)}</p>
                    </div>
                    <div className="modal__col">
                      <p className="profile__label">Зарплата</p>
                      <p className="profile__value">{employee_salaries}</p>
                    </div>
                  </div>
                  <div className="modal__row modal__row--start">
                    <div className="modal__col">
                      <p className="profile__label">Должность</p>
                      <p className="profile__value">{position}</p>
                    </div>
                    <div className="modal__col">
                      <p className="profile__label">Электронная почта</p>
                      <a
                        className="profile__value"
                        href="mailto:alex@yandex.ru"
                      >
                        {contacts_email}
                      </a>
                    </div>
                  </div>
                  <div className="modal__row modal__row--start">
                    <div className="modal__col">
                      <p className="profile__label">Отдел</p>
                      <p className="profile__value">{department}</p>
                    </div>
                    <div className="modal__col">
                      <p className="profile__label">Телефон</p>
                      <a className="profile__value" href="tel: +79121231212">
                        {contacts_phone}
                      </a>
                    </div>
                  </div>
                  <div className="modal__row modal__row--start">
                    <div className="modal__col">
                      <p className="profile__label">Руководитель</p>
                      <a className="profile__value" href="link-to-profile">
                        {head_first_name + " " + head_last_name || "----"}
                      </a>
                    </div>
                    <div className="modal__col">
                      <p className="profile__label">Другие контакты</p>

                      <p className="profile__value">
                        {contacts_other || "не указано"}
                      </p>
                    </div>
                  </div>
                  <div className="modal__row modal__row--start">
                    <div className="modal__col">
                      <p className="profile__label">Дата выхода на работу</p>
                      <p className="profile__value">{formatDate(date_start)}</p>
                    </div>
                    <div className="modal__col">
                      <p className="profile__label">Адрес</p>
                      <p className="profile__value">
                        {(contacts_address && contacts_address) || ""}
                      </p>
                    </div>
                  </div>
                  <div className="modal__row modal__row--start">
                    <div className="modal__col">
                      <p className="profile__label">Стаж</p>

                      <p className="profile__value">
                        {getWorkExperience(date_start)}
                      </p>
                    </div>
                    <div className="modal__col">
                      <p className="profile__label">
                        Паспорт основной (закрытое)
                      </p>
                      <p className="profile__value">{passport_hidden}</p>
                    </div>
                  </div>
                  <div className="modal__row modal__row--start">
                    <div className="modal__col">
                      <p className="profile__label">Доступы</p>

                      {employee_rights.length > 0 ? (
                        <div>
                          {employee_rights.map((el, i) => {
                            return (
                              <p key={i} className="profile__value">
                                {t(`${translateKey}.${el}`)}
                              </p>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="profile__value">Базовые права</p>
                      )}
                    </div>
                    <div className="modal__col">
                      <p className="profile__label">
                        Паспорт дополнительный (открытое)
                      </p>
                      <p className="profile__value">{passport_visible}</p>
                    </div>
                  </div>
                  <div className="modal__row modal__row--start">
                    <div className="modal__col"></div>
                    <div className="modal__col">
                      <button className="modal__button modal__button--edit">
                        Редактировать личные данные
                      </button>
                    </div>
                  </div>
                  <div className="profile__attach attach">
                    <a
                      className="attach__item"
                      href="assets/docs/sample.pdf"
                      download
                    >
                      <div className="attach__image attach__image--xls"></div>
                      <span>Название файла.pdf</span>{" "}
                    </a>
                    <a
                      className="attach__item"
                      href="assets/docs/sample.pdf"
                      download
                    >
                      <div className="attach__image attach__image--xls"></div>
                      <span>Название файла.pdf</span>{" "}
                    </a>
                    <a
                      className="attach__item"
                      href="./assets/images/attach.jpg"
                      target="_blank"
                    >
                      <div className="attach__image">
                        <img
                          className="attach__user-image"
                          src="assets/images/attach.jpg"
                          alt=""
                        />
                      </div>
                      <span>Название файла.pdf</span>
                    </a>
                  </div>
                  <div className="profile__info">
                    <a className="profile__link" href="#">
                      История выплат
                    </a>
                    <a className="profile__link" href="#">
                      История отпусков
                    </a>
                    <a className="profile__link" href="#">
                      Отправить в отпуск
                    </a>
                    <a className="profile__link" href="#">
                      Уволить
                    </a>
                    <a className="profile__link" href="#">
                      Удалить
                    </a>
                  </div>
                </section>
              </section>
            </div>
          </div>
        </section>

        {/* {confirmRemove && (
          <BeforeDeleteWarning agree={()=> {sendRemovedEmployee()} } refuse={()=> console.log(' закрываем окно удаления')} />
        )} */}

        {modalEdit && (
          // <WindowFire />
          <EmployeesForm
            employeeData={employeeData}
            onCloseModal={() => setModalEdit(false)}
            action="edit"
          />
        )}

        {/* <WindowFire /> */}
      </>
    );
  } else {
    // когда ошибки с сервера
    return <Preloader />;
  }
};

export default WindowProfile;
