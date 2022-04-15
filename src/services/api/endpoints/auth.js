import axios from "../axios";

const endpoints = {
  login: (data) => axios.post("/api/login", data),
  // напомнить пароль
  restorePassword: (data) => axios.post("/api/password_restore", data),

  resetPasword: (data) => axios.put("/api/password_reset"),
  // registration: (data) => axios.post("/v1/auth/email/register", data),

  // getProfile: () => axios.get("/v1/auth/me"),
  // updateProfile: (data) => axios.patch("/v1/auth/me", data),
  // addDepartments: (data) => axios.post("/api/departments/add", data),

  // список отделов по id компании 
  // Принимает токен('Authorization': "eyJhbGc…VGZc-OM8"),
  // параметр из строки запроса,
  // company_id - id - компании(организации)
  // departments: [
  //   { id: 1, company_id: 1, title: 'department_1', head_id: null },
  //   { id: 1, company_id: 1, title: 'department_1', head_id: null }
  // ]
  // getDepartmentList: (data) => axios.get("/api/departments_by_company/1", data),


// ЗАГОТОВКА НА ПОТОМ
  //вернет отдел по ид отдела 
  // getDepartment: (data) => axios.get("/api/department_by_id/:department_id", data),


  // //Добавляет отдел в таблицу "departments"  post("/api/departments/add")
  // addNewDepartment: (data) => axios.post("/api/departments/add", data),
  // // Удаляет отдел по id-отдела. delete("/api/departments/delete")
  // deleteDepartment: (data) => axios.delete("/api/departments/delete", data),
};

export default endpoints;
