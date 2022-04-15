import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import DepartmentList from "../../components/departments/department-list/department-list";
import ModalHeader from "../../components/modals/modal-header";
import DepartmentForm from "../../components/departments/department-form/department-form";
import { useTranslation } from "react-i18next";
import useAuth from "../../hooks/useAuth";
import NotificationSuссess from "../../components/notifications/NotificationSuссess";
import reducer from "../../reducers/reducer";
import io from "socket.io-client";
import {
  url_departments_add,
  companyId,
  url,
  url_departments_edit,
} from "../../variables/base-url";

const axios = require("axios");

const Departments = () => {
  // настройки
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const translateKey = "DepartmentForm"; // для перевода
  const socket = io("http://portal.starkandbau.ru:3212", {
    transports: ["websocket", "polling", "flashsocket"],
  });
  // для формы, базовые поля
  const headers = {
    Authorization: auth.token,
    company_id: companyId,
  };

  // состояние компонента
  // может быть переписать на use reducer
  const [state, dispatch] = useReducer(reducer, []);
  const addToList = () => {
    dispatch({ type: "add", payload: { red: "red" } });
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

  // ПОЛУЧАЕМ СПИСОК ОТДЕЛОВ
  useEffect(() => {
    socket.emit("add_to_room", "departments_list");

    axios.get(`${url}/api/departments_list/${companyId}`, { headers }).then(
      (res) => {
        setDepartments(res.data.departments);
      },
      (error) => {
        console.log(error, "error");
        //   setIsLoaded(true);
        // setError(error);
      }
    );
  }, [auth.token]);

  const test = {
    id: 3,
    title: "Department_65",
    head_id: 1,
    avatar: "1_IMG_20210813_114425.jpg",
    first_name: "Зафар",
    last_name: "Шарипов",
    employees_qty: 0,
    action: "edited",
  };

  useEffect(() => {
    socket.on("department_changed", (data, action) => {
      updateState(data, action);
    });
  }, [auth.token, socket]);

  const getEditedState = (arr, newItem) => {
    const ind = arr.findIndex(({ id }) => id === newItem.id);
    return [...arr.slice(0, ind), newItem, ...arr.slice(ind + 1)];
  };

  const edit = () => {
    let arr = [
      { id: 3, color: "red" },
      { id: 4, color: "red" },
      { id: 5, color: "red" },
    ];
    getEditedState(arr, test);
  };
  // edit();

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

  // получить название, руководителя, всех сотрудников и сотрудников отдела при клике на редактирование
  const loadDepartmentData = (item) => {
    const { id, title, head_id, first_name, last_name } = item;

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: auth.token,
      department_id: id,
    };

    axios
      .get(`${url}/api/department_edit/${id}/${companyId}`, { headers })
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
          // console.log("DepartmentData ", res.data.department);
        },
        (error) => {
          console.log(" информация не загрузилась", error);
        }
      );
  };

  // нужно для тестовых сотрудников при проверке работы формы, не обращаем внимания
  const addEmployee = (id) => {
    fetch(`${url}/api/employees/add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: auth.token,
        department_id: null,
      },
      body: JSON.stringify({
        row: {
          last_name: " Ханнэм",
          first_name: "Чарли",
          birthday: "2000/09/23",
          sex: "male",
          email: "sh_zaf@inbox.ru",
          contacts_email: "sh_zaf@inbox.ru",
          contacts_phone: "79252345323",
          contacts_address: "Moscow, Lenina 45 ",
          contacts_other: "contactsOther varchar 2000",
          comments: "comments varchar 2000",
          passport_hidden: "passport_hidden varchar 1000",
          passport_visible: "passport_visible varchar 1000",
          password: "333",
          avatar: null,
          about: "about varchar 2000",
          position_id: 1,
          department_id: null,
          head_id: 1,
          date_start: "2000/1/21",
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res, "addEmployee"));
    // .then((res) => setDepartData(res.department[0]))
    // .then((res) => setModalAddDep({ isOpen: true, action: "edit" }));
    // post("/api/employees/add")
  };

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

  const compareArr = (arr, arr2) => {
    // const sortArr = (arr) => {
    //   arr.sort(function (a, b) {
    //     return a - b;
    //   });
    // };
    if (!arr || !arr2) return;
    return (
      JSON.stringify(arr.sort((a, b) => a - b)) ===
      JSON.stringify(arr2.sort((a, b) => a - b))
    );
  };
  //  тестовое
  const editTest = () => {
    let data = {
      row: {
        company_id: 1,
        title: " Новое старое гнегне ",
        head_id: 16,
      },
      employees: [],
      department_id: 71,
    };

    fetch(`${url}/api/departments/edit`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify(data),
    })
      .then(() => console.log("changed on server "))
      .then(
        setModalAddDep({ isOpen: false, action: null }),
        setInfoIsLoad(false)
      );
  };

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
    // console.log(body, "body");
    axios.put(url_departments_edit, body, { headers }).then(
      (res) => {
        console.log("отредактировали отдел ", res);
        onCloseAddModal();
      },
      (err) => {
        console.log(err, "  ошибка при редактировании тдела ");
      }
    );
  };

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

  const onCloseDepartmentList = () => {
    console.log('вышли ')
    socket.emit("leave_room", "departments_list");
    navigate("/team", { replace: true });
  };

  // закрыть окно, выйти из комнаты и сбросить все состояния
  const onCloseAddModal = () => {
    setModalAddDep(false);
    setInfoIsLoad(false);
  };



  //  тут делаем запрос на получние свободных сотрудников и всех
  const onAdd = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: auth.token,
      department_id: null,
    };

    axios
      .get(`${url}/api/department_create/${companyId}`, {
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

  // сделать предупреждение перед удалением
  const onDelete = (id) => {
    fetch(`${url}/api/departments/delete`, {
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
  const title = {
    name: "title",
    icon: true,
    placeholder:
      modalAddDep.action === "edit"
        ? t(`${translateKey}.title_edit`)
        : t(`${translateKey}.title_create`),
    // bubble: "Текст",
    label: t(`${translateKey}.label_title`),
    type: "text",
  };
  // руководитель
  const head_id = {
    name: "head_id",
    label: t(`${translateKey}.head`),
    type: "select",
    options: departData?.free_employees || [],
  };
  // свободные сотрудники отдела ( потому что того желает react select, массив уже выбранных сотрудников получаем из свободных (иначе при удалении из поля они не добавляются в выпадающий список) )
  const employees_department = {
    name: "employees_department",
    icon: true,
    label: t(`${translateKey}.workers`),
    type: "select",
    subType: "tag",
    options: departData?.free_employees || [],
  };

  // поля всей  формы
  const inputs = {
    title: { ...title },
    head_id: { ...head_id },
    employees_department: { ...employees_department },
  };

  // не смотрим
  const addDepartTest = () => {
    console.log("addDepartTest");

    fetch(`${url}/api/departments/add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify({
        row: {
          company_id: 1,
          title: "Отдел тестовый",
          head_id: 1,
        },
        employees: [1, 2, 3, 4],
      }),
    });
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
              <button onClick={addEmployee}>+ сотрудник</button>
              <button onClick={addDepartTest}>+ отдел</button>
              <button onClick={editTest}> test </button>
              {/* <button onClick={addToList}> add to list  </button> */}
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
