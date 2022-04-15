import React, { useEffect, useState } from 'react';
import TeamFilterForm from '../team-filter-form/TeamFilterForm';

// import io from "socket.io-client";
import useAuth from '../../../hooks/useAuth';
import { companyId, url_get_employees_list } from '../../../settings/base-url';
import { initSocket } from '../../../settings/sockets';
import TeamList from '../team-list/TeamList';

const axios = require("axios");

// основная часть контента для страницы team 


const TeamMain = () => {

 const auth = useAuth();
 const socket = initSocket(auth);
 const headers = {
   Accept: "application/json",
   "Content-Type": "application/json",
   Authorization: auth.token,
 };

 // инфа для построения списка сотрудников
 const [infoIsLoad, setInfoIsLoad] = useState();

 useEffect(() => {
   socket.emit("add_to_room", "employees_list");

   axios.get(url_get_employees_list, { headers, company_id: companyId }).then(
     (res) => {
       // console.log(res.data.employeesList);
       setInfoIsLoad(res.data.employeesList);
     },
     (error) => {
       console.log(error, "error");
     }
   );
 }, [auth.token]);

 useEffect(() => {
   socket.on("department_changed", (data, action) => {
     console.log("department_changed", data, action);
     // updateState(data, action);
   });
 }, [auth.token, socket]);

 // после изменений на сервере меняем стейт локально
 //
 const updateState = (data, action) => {
   console.log("department_changed ", data);
   switch (action) {
     case "added":
       // setDepartments((prev) => [...prev, data]);
       break;
     case "edited":
       // setDepartments((prev) => getEditedState(prev, data));
       break;
     case "deleted":
       // setTreeList((prev) => prev.filter((item) => item.id !== data.id));
       break;
     default:
     // return departments;
   }
 };
 // заменяем отдел на отредактированный
 const getEditedState = (arr, newItem) => {
   const ind = arr.findIndex(({ id }) => id === newItem.id);
   return [...arr.slice(0, ind), newItem, ...arr.slice(ind + 1)];
 };


  return (
    <>
      <section className="team">
        <div className="team__container container">
          <div className="team__tabs tabs-xl">
            <a className="tabs-xl__link tabs-xl__link--active" href="#">
              Работающие <span className="tabs-xl__value">9</span>{" "}
            </a>
            <a className="tabs-xl__link" href="#">
              Неработающие <span className="tabs-xl__value">2</span>{" "}
            </a>
            <a className="tabs-xl__link" href="#">
              Выходит в будущем <span className="tabs-xl__value">3</span>{" "}
            </a>
            <a className="tabs-xl__link" href="#">
              Запросы на поиск <span className="tabs-xl__value">7</span>{" "}
            </a>
            <a className="tabs-xl__link" href="#">
              Все <span className="tabs-xl__value">12</span>
            </a>
          </div>

          {/* <Link to="/team/departments/1"> Сотрудник id 1 </Link> */}

          <TeamFilterForm
            department={{
              name: "department_id",
              icon: true,
              placeholder: "Отдел",
              type: "text",
              options: infoIsLoad?.departments || [],
            }}
            position={{
              name: "position_id",
              icon: true,
              label: "Должность",
              placeholder: "Должность",
              type: "select",
              options: infoIsLoad?.positions || [],
            }}
            sorting={{
              name: "position_id",
              icon: true,
              label: "Сортировать по",
              placeholder: "Сортировать по",
              // label: t(`${translateKey}.position`),
              type: "select",
              options: ["по дате создания", "по дате изменения"],
            }}
          />
          {infoIsLoad?.employees && (
            <TeamList window={window} data={infoIsLoad.employees}></TeamList>
          )}
        </div>
      </section>
    </>
  );
};

export default TeamMain;
