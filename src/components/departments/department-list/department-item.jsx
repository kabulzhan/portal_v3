import React from "react";
// import useAuth from "../../../hooks/useAuth";

// const axios = require("axios");

const DepartmentItem = ({ item, onDelete, onEdit }) => {
  // console.log(item);
  // const auth = useAuth();
  const {
    title,
    id,
    avatar,
    employees_qty,
    last_name,
    first_name,
  } = item;


  return (
    <li className="modal-table__row">
      {/* <button onClick={()=> console.log(item)}>данные  </button> */}
      <div className="modal-table__wrapper">
        <span className="modal-table__col">
          <span className="modal-table__description">Отдел</span>
          {title}
        </span>
        <span className="modal-table__col modal-table__col--wide">
          <span className="modal-table__description">Руководитель</span>
          {/* <img
            className="modal-table__userpic"
            src={avatar}
            // src="assets/images/userpic.png"
            alt="avatar"
          /> */}
          <span className="modal-table__username" href="#">
            {last_name} {first_name}
          </span>{" "}
        </span>
        <span className="modal-table__col">
          <span className="modal-table__description">Сотрудников</span>
          {employees_qty}
        </span>
      </div>
      <div className="modal-table__col modal-table__col--buttons">
        <div className="modal-table__control-box">
          <button
            onClick={()=>{ onEdit(item);}}
            className="modal-table__control modal-table__control--edit"
          ></button>
          <button
            onClick={() => onDelete(id)}
            className="modal-table__control modal-table__control--delete"
          ></button>
        </div>
      </div>
    </li>
  );
};

export default DepartmentItem;
  // const headers = {
      //   Authorization: auth.token,
      //   company_id: 1,
      //   body: JSON.stringify({ department_id: 1 }),
      // };
      // axios.delete(url, { headers }).then(
      //   (result) => {
      //     // setIsLoaded(true);
      //     console.log(" res", result);
      //     // setDeparList(result.data.departments);
      //   },
      //   (error) => {
      //     console.log(error, "error");
      //   }
      // );
// /delete("/api/departments/delete")

// Принимает токен ('Authorization': "eyJhbGc…VGZc-OM8"),
// параметр из тело запроса
// department_id - id-отдела

// {
//    department_id: 1
// }

// пример:
// fetch(`${url}api/departments/edit`, {
//   method: 'PUT',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     'Authorization': "eyJhbGy2.....N5k_ycR9o"
//   },
//   body: JSON.stringify({department_id: 1})
// )
