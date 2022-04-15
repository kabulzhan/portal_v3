import React, { useState, useEffect } from "react";
import DepartmentList from "./department-list/DepartmentList";
import DepartmentForm from "./department-form-create-edit/DepartmentFormCreateEdit";
import ModalHeader from "../../components/modals/modal-header";
import { useTranslation } from "react-i18next";
import useAuth from "../../hooks/useAuth";
import NotificationSuссess from "../../components/notifications/NotificationSuссess";
import {
  url_departments_add,
  companyId,
  url_get_departments_list,
  url_put_departments_edit,
  url_delete_departments,
  url_get_departments_create,
  url_get_department_edit,
} from "../../settings/base-url";
import { initSocket } from "../../settings/sockets";

const axios = require("axios");

const Departments = (props) => {
  // настройки
  const auth = useAuth();
  const { t } = useTranslation();
  const translateKey = "DepartmentForm"; // для перевода


 const socket = initSocket(auth.token);
  // для формы, базовые поля
  const headers = {
    Authorization: auth.token,
    company_id: companyId,
  };

  // статус модального окна
  const [modalAddDep, setModalAddDep] = useState({
    isOpen: false,
    action: null,
  });
  // для уведомлений, что изменения вступили в силу (пока не исп)
  const [responce, setResponce] = useState(null);
  // данные с сервера об отделе (название,  руководитель, списки сотрудников )
  const [departData, setDepartData] = useState(null);
  const [infoIsLoad, setInfoIsLoad] = useState(false);
  const [departments, setDepartments] = useState([]); // список отделов

  // список отделов, вход в комнату
  // сделать вход при редактировании 
  useEffect(() => {
    socket.emit("add_to_room", "departments_list");

    axios.get(url_get_departments_list, { headers }).then(
      (res) => {
        setDepartments(res.data.departments);
      },
      (error) => {
        console.log(error, "error");
      }
    );
  }, [auth.token]);

  // подписались на изменения с сервера, меняем локальный  (список отделов)
  useEffect(() => {
    socket.on("department_changed", (data, action) => {
      updateState(data, action);
    });
  }, [auth.token, socket]);

  // после изменений на сервере меняем стейт локально
  const updateState = (data, action) => {
    console.log("department_changed ", data);
    switch (action) {
      case "added":
        setDepartments((prev) => [...prev, data]);
        break;
      case "edited": 
        setDepartments((prev) => getEditedState(prev, data));
        break;
      case "deleted":
        setDepartments((prev) => prev.filter((item) => item.id !== data.id));
        break;
      default:
        return departments;
    }
  };
  // заменяем отдел на отредактированный
  const getEditedState = (arr, newItem) => {
    const ind = arr.findIndex(({ id }) => id === newItem.id);
    return [...arr.slice(0, ind), newItem, ...arr.slice(ind + 1)];
  };

  // отрисовка модального окна для редактирования, получение data о редактируемом отделе
  const loadDepartmentData = (item) => {
    const { id, title, head_id, first_name, last_name } = item;

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: auth.token,
      department_id: id,
    };

    axios
      .get(url_get_department_edit + `/${id}`, { headers })
      .then(
        (res) => {
          const { free_employees, employees } = res.data.department[0];
          let data = {
            id: id,
            title: title,
            head_id: head_id,
            head_name: first_name + " " + last_name,
            employees: employees,
            free_employees: free_employees,
          };
          setDepartData({ ...data });
          setInfoIsLoad(true);
          setModalAddDep({ isOpen: true, action: "edit" });
        },
        (error) => {
          console.log(" информация не загрузилась", error);
        }
      );
  };
  // отправляем data о новом отделе на сервер, закрываем модалку создания отдела
  const addNewDepart = (data) => {
    const { title, employees_department, head_id } = data;

    let body = {
      row: {
        company_id: companyId,
        title: title,
        head_id: head_id.id,
      },
      employees: employees_department
        ? employees_department.map((a) => a.id)
        : [],
    };
    axios.post(url_departments_add, body, { headers }).then(
      (res) => {
        console.log("Добавили отдел ", res);
        onCloseAddModal();
      },
      (err) => {
        console.log(err, "  ошибка при добавлении отдела ");
      }
    );
  };

  // отправили на сервер data об отделе, который отредактировали. закрыли модалку для редактирования
  const sendEditedDepart = (data) => {
    const { title, employees_department, head_id } = data;

    let body = {
      row: {
        company_id: companyId,
        title: title,
        head_id: head_id.id,
      },
      employees: employees_department
        ? employees_department.map((a) => a.id)
        : [],
      department_id: departData.id,
    };
    axios.put(url_put_departments_edit, body, { headers }).then(
      (res) => {
        console.log("отредактировали отдел ", res);
        onCloseAddModal();
      },
      (err) => {
        console.log(err, "  ошибка при редактировании тдела ");
      }
    );


  };
  // срабатывает на кнопку отправить в форме (submit)
  const sendDataForm = (data) => {
    switch (modalAddDep.action) {
      case "add":
        return addNewDepart(data);
      case "edit":
        return sendEditedDepart(data);
      default:
        return addNewDepart(data);
    }
  };

  // при клике на крестик модалки с списком отдела => вышли из комнаты
  const onCloseDepartmentList = () => {
    socket.emit("leave_room", "departments_list");
    props.onClose();
  };

  // закрыть окно создания-редактирования
  const onCloseAddModal = () => {
    setModalAddDep(false);
    setInfoIsLoad(false);
  };

  // вызов модального окна для добавления, (кнопка добавить), загрузка инфы для модалки
  const onAdd = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: auth.token,
      department_id: null,
    };

    axios
      .get(url_get_departments_create, {
        headers,
      })
      .then(
        (res) => {
          // тут задаем параметры prev value для формы
          setDepartData({
            employees: [],
            free_employees: res.data.free_employees,
          });
          setInfoIsLoad(true);
          setModalAddDep({ isOpen: true, action: "add" });
          console.log("загрузили сотрудников без отдела");
        },
        (error) => {
          console.log("сотрудники без отдела не загрузилась", error);
        }
      );
  };
  // отправляем запрос на сервер на удаление => клик по иконке корзины в списке отделов
  const onDelete = (id) => {
    fetch(url_delete_departments, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify({ department_id: id }),
    })
      .then((res) => res.json())
      .then((res) => console.log(" delete sucseccful "));
  };

  // настройка для полей формы
  const inputs = {
    title: {
      // название отдела
      name: "title",
      icon: true,
      placeholder:
        modalAddDep.action === "edit"
          ? t(`${translateKey}.title_edit`)
          : t(`${translateKey}.title_create`),
      label: t(`${translateKey}.label_title`),
      type: "text",
    },
    head_id: {
      // руководитель
      name: "head_id",
      label: t(`${translateKey}.head`),
      type: "select",
      options: departData?.free_employees || [],
    },
    employees_department: {
      // свободные сотрудники отдела ( потому что того желает react select, массив уже выбранных сотрудников получаем из свободных (иначе при удалении из поля они не добавляются в выпадающий список) )
      name: "employees_department",
      icon: true,
      label: t(`${translateKey}.workers`),
      type: "select",
      subType: "tag",
      options: departData?.free_employees || [],
    },
  };


  return (
    <section className="modal">
      <div className="modal__wrapper">
        <div
          className={
            modalAddDep.isOpen
              ? "modal__inner modal__inner--medium"
              : "modal__inner"
          }
        >
          {(modalAddDep.action === "edit" || modalAddDep.action === "add") &&
            infoIsLoad && (
              <>
                <section className="modal__body test">
                  <ModalHeader
                    title={
                      modalAddDep.action === "add"
                        ? t("TeamHeader.create_departments")
                        : t(`${translateKey}.title_edit`)
                    }
                    onClose={onCloseAddModal}
                  />
                  <DepartmentForm
                    infoIsLoad={infoIsLoad}
                    departData={departData} //  данные с сервера об отделе
                    action={modalAddDep.action === "add" ? "add" : "edit"}
                    inputs={inputs} // поля hook forms
                    onClose={onCloseAddModal}
                    onCreate={sendDataForm}
                  />
                </section>
              </>
            )}

          {/* список сотрудников в модальном окне  */}
          {!modalAddDep.isOpen && (
            <section className="modal__body">
              {responce === "success" && (
                <NotificationSuссess text="Новый отдел добавлен" />
              )}
              {responce === "error" && (
                <NotificationSuссess text="Произошла ошибка!" />
              )}
              <ModalHeader
                addDepartment
                title={t("TeamHeader.depatrments")}
                onClose={onCloseDepartmentList}
                onAdd={onAdd}
              />
              <DepartmentList
                departments={departments}
                onEdit={loadDepartmentData}
                onDelete={onDelete}
              />
            </section>
          )}
        </div>
      </div>
    </section>
  );
};

export default Departments;
