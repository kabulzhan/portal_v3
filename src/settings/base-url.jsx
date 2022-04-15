export const companyId = 1;
export const userId = 3; // не могу пробросить в куки при логине, слетает  при перезагрузке, поправить
export const server_url = "http://80.78.248.55:3212";
// ОТДЕЛЫ
export const url_departments_add = `${server_url}/api/departments/add`; 
export const url_get_departments_list = `${server_url}/api/departments_list/${companyId}`;
// строим окно редактирования отдела
export const url_get_department_edit = `${server_url}/api/department_edit`;
export const url_put_departments_edit = `${server_url}/api/departments/edit`;
export const url_get_departments_create = `${server_url}/api/department_create/${companyId}`;
export const url_delete_departments = `${server_url}/api/departments/delete`;
//  ДОЛЖНОСТИ
export const url_get_positions_list = `${server_url}/api/positions_list/${companyId}`; 
export const url_post_new_positions = `${server_url}/api/positions/add`; 
export const url_put_positions = `${server_url}/api/positions/edit`; 
export const url_delete_positions = `${server_url}/api/positions/delete`; 
// СОТРУДНИКИ
// дерево 
export const url_get_employees_tree = `${server_url}/api/employees_tree/${companyId}`; // список сотрудников деревом
// список сотрудников на глоавной team
export const url_get_employees_list = `${server_url}/api/employees_list/${companyId}`;
// создаем сотрудника
export const url_get_data_employee_create = `${server_url}/api/employee_create/${companyId}`;
export const url_get_free_employees = `${server_url}/api/department_create/${companyId}`; 
export const url_employee_create_send_data = `${server_url}/api/employees/add`; 
//  редактировании сотрудника
export const url_send_edited_employee = `${server_url}/api/employees/edit`;
// создать форму для редактирования сотрудника
export const url_get_data_employee_edit = `${server_url}/api/employee_edit`;
// карточка сотрудника window profile
export const url_get_emplyee_info = `${server_url}/api/employee_info`; // для построения окна профиля
// удаляем сотрудника
export const url_delete_emplyee = `${server_url}/api/employees/delete`; 

// РАБОТА С ПРОЕКТАМИ
// строим модалку создания
export const url_get_data_create_project = `${server_url}/api/project_create/${companyId}`;
// отправляем проект
export const url_post_created_project = `${server_url}/api/projects/add`;

// добавим файлы в модалку проекта
export const url_post_add_files = `${server_url}/api/projects/files/add`;
//  удалим загруженные файлы в модалке проекта 
export const url_patch_remove_files = `${server_url}/api/projects/files/remove`;
// список проектов
export const url_get_project_list = `${server_url}/api/projects_list`;
// редактируем проект 
// создаем окно редактирования
export const url_get_project_edit = `${server_url}/api/project_edit`;
// запрос на редактирование проекта
export const url_put_projects_edit = `${server_url}/api/projects/edit`;

// ЗАДАЧИ 
export const url_get_tasks_list = `${server_url}/api/tasks_list`;