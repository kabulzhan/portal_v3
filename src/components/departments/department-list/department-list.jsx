import React, { useState, useEffect } from "react";
import DepartmentItem from "./department-item";
import PreloaderDepartment from "../../preloaders/preloader-department";
import Error from "../../errors/error";
// import api from "../../../services/api";
import useAuth from "../../../hooks/useAuth";
import BeforeDeleteWarning from "../../warnings/BeforeDeleteWarning";

const axios = require("axios");

const testData =[ 
    {
      id: 1,
      title: "Отдел разработки",
      avatar: "1_IMG_20210813_114425.jpg",
      head_id: 1,
      first_name: "Зафар",
      last_name: "Шарипов",
      employees_qty: 3,
    },
    {
      id: 1,
      title: "Отдел тестирования",
      avatar: "1_IMG_20210813_114425.jpg",
      head_id: 1,
      first_name: "Кирилл",
      last_name: "Петров",
      employees_qty: 8,
    },
    {
      id: 1,
      title: "Отдел дизайна",
      avatar: "1_IMG_20210813_114425.jpg",
      head_id: 1,
      first_name: "Анастасия",
      last_name: "Красавина",
      employees_qty: 10,
    },
  ];


const DepartmentList = ({ departments, onEdit, onDelete }) => {
  const [departList, setDepartList] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState(null);
  const auth = useAuth();
  // подтверждаем удаление в доп окне
  const [showWarningDelete, setShowWarningDelete] = useState(false);
  const [deletedEl, setDeletedEl] = useState(null); // id удаляемого

  // const requestURL = api.auth.getDepartmentList;
  // получить id компании при авторизации cmp1
  // const url = "http://80.78.248.55:3212/api/departments_employees_qty/1";
  // const url = "http://80.78.248.55:3212/api/departments_employees_qty/1";

  // useEffect(() => {
    // const headers = {
    //   Authorization: auth.token,
    //   company_id: 1,
    // };
    // axios.get(url, { headers }).then(
    //   (result) => {
    //     setIsLoaded(true);
    //     setDepartList(result.data.departments);
    //     console.log( "ALL DEPARTMENTS ");
    //   },
    //   (error) => {
    //     setIsLoaded(true);
    //     setError(error);
    //   }
    // );
  // }, [auth.token]);

  const confirmDel = () => {
    setShowWarningDelete((prev) => !prev);
  };

  // const onDelete = (id) => {
  //   confirmDel();
  //   setDeletedEl(id);
  // };

  const startDelete = () => {
    fetch(`http://80.78.248.55:3212/api/departments/delete`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify({ department_id: deletedEl }),
    })
      .then((res) => res.json())
      .then((res) => console.log(" delete sucseccful "))
      .then(() => confirmDel());
  };
  const cancelDelete = () => {
    confirmDel();
    setDeletedEl(null);
  };

  if (error) {
    return (
      <>
        <Error mes={error.message} />;
        {testData?.map((item, i) => (
          <DepartmentItem
            key={i}
            item={item}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
        {showWarningDelete && (
          <BeforeDeleteWarning
            agree={() => startDelete()}
            refuse={cancelDelete}
          />
        )}
      </>
    );
  } else if (!isLoaded) {
    return <PreloaderDepartment />;
  } else {
    return (
      <>
        {departments?.map((item, i) => (
          <DepartmentItem
            key={i}
            item={item}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
        {/* {showWarningDelete && (
          <BeforeDeleteWarning
            agree={() => startDelete()}
            refuse={cancelDelete}
          />
        )} */}
      </>
    );
  }
};

export default DepartmentList;
