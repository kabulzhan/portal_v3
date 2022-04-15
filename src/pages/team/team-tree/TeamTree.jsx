import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import {
  companyId,
  server_url,
  url_get_employees_tree,
} from "../../../settings/base-url";
import io from "socket.io-client";
import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css";
import "./TeamTree.css";

import {  useLocation } from "react-router-dom";
import Preloader from "../../../components/preloaders/Preloader";
import TeamTreeListItem from "./TeamTreeListItem";
import { initSocket } from "../../../settings/sockets";

const axios = require("axios");

// const items = [
//   {
//     id: 1,
//     title: "Отдел_Дизайна",
//     position: "главный дизайнер",
//     last_name: "Jon",
//     first_name: "Nash",
//     comments: " собирается в отпуск ",
//     employees: [
//       {
//         id: 2,
//         last_name: "Jon",
//         first_name: "Nash",
//         avatar: null,
//         position: "Дизайнер",
//       },
//       {
//         id: 2,
//         last_name: "Jon",
//         first_name: "Nash",
//         avatar: null,
//         position: "Дизайнер",
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: "Отдел_Строительства",
//     position: "главный строитель ",
//     last_name: "Jon",
//     first_name: "Nash",
//     comments: " собирается в отпуск ",
//     employees: [
//       {
//         id: 2,
//         last_name: "Jon",
//         first_name: "Nash",
//         avatar: null,
//         position: "Глава Отдел_монтажников ",
//         employees: [
//           {
//             id: 2,
//             last_name: "Jon",
//             first_name: "Nash",
//             avatar: null,
//             position: "Монтажник 1 ",
//           },
//           {
//             id: 2,
//             last_name: "Jon",
//             first_name: "Nash",
//             avatar: null,
//             position: "Монтажник 2",
//           },
//         ],
//       },
//       {
//         id: 2,
//         last_name: "Jon",
//         first_name: "Nash",
//         avatar: null,
//         position: "Оператор",
//       },
//     ],
//   },
// ];



// изенить локально стейт, когда сокет будет отправлять правильный объект 


const TeamTree = (props) => {
  const auth = useAuth();
  const socket = initSocket(auth.token);

  // для формы, базовые поля
  const headers = {
    Authorization: auth.token,
    company_id: companyId,
  };
  const [treeList, setTreeList] = useState(null);

  // список сотрудников, вход в комнату
  useEffect(() => {
    socket.emit("add_to_room", "employees_tree");

    axios.get(url_get_employees_tree, { headers }).then(
      (res) => {
        // console.log(res, 'res');
        setTreeList(res.data.employeesTree);
      },
      (er) => {
        console.log(er, "error");
      }
    );
  }, [auth.token]);

  // подписались на изменения с сервера, меняем локальный  (список отделов)
  useEffect(() => {
    socket.on("department_changed", (data, action) => {
      console.log("department_changed", data, action);
      updateState(data, action);
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
        setTreeList((prev) => prev.filter((item) => item.id !== data.id));
        break;
      default:
      // return departments;
    }
  };


  // console.log(treeList, "treeList");
  // заменяем отдел на отредактированный
  const getEditedState = (arr, newItem) => {
    const ind = arr.findIndex(({ id }) => id === newItem.id);
    return [...arr.slice(0, ind), newItem, ...arr.slice(ind + 1)];
  };

  // useEffect(() => {
  //   socket.on("connect_error", (err) => {
  //     console.log(`connect_error due to ${err}`);
  //   });;
  // }, [auth.token, socket]);

  let location = useLocation();

  return (
    <div style={{ height: 900 }}>
      {!treeList && <Preloader />}
      <section className="team">
        {/* <button onClick={test334}> клик </button> */}
        <div className="team__container container">
          <section className="team__tree team-tree">
            <ul>
              {treeList &&
                treeList.map((i) => (
                  <div key={i.id}>
                    <h2 className="team-tree__title">{i.title}</h2>
                    <TeamTreeListItem item={i} location={location} />
                  </div>
                ))}
            </ul>
          </section>
        </div>
      </section>
    </div>
  );
};

export default TeamTree;
