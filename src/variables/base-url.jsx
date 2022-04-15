export const companyId = 1;
export const url = "http://80.78.248.55:3212"; // на server_url переименовать
export const url_departments_add = `${url}/api/departments/add`; // post("/api/departments/add")



export const url_employee_create = `${url}/api/employee_create/${companyId}`; // get("/api/employee_create/:company_id")
export const url_employee_create_send_data = `${url}/api/employees/add`; //post("/api/employees/add") 

export const url_get_free_employees = `${url}/api/department_create/${companyId}`; //    get("/api/department_create/:company_id");
export const url_departments_edit = `${url}/api/departments/edit`;