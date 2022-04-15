import React from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CalendarForm, {
  getFormatCalendarData,
} from "../../calendar-form/CalendarForm";
import EmployeesFormCol from "../../employees/employees-form/EmployeesFormCol";
import RadioItems from "../../form/RadioItems";
import EmployeesTextarea from "./EmployeesTextarea";
import Select from "react-select";
import ModalBottom from "../../modals/modal-bottom";
import useAuth from "../../../hooks/useAuth";
import {
  url_employee_create_send_data,
  url_send_edited_employee,
  companyId,
} from "../../../settings/base-url";
import SelectMulty from "../../form/select/SelectMulty";

const axios = require("axios");
const schemaCreateEmployees = yup.object().shape({
  // first_name: yup.string().required(),
});

// форматируем для мультиселекта с правами или для select списка
const formatOptions = (arr) => {
  return arr.map((el) => {
    return {
      label: el,
      value: el,
    };
  });
};
// устанавливаем значение полей прав, массив должен быть одним и тем же, мы  фильтруем уже выбранные ранее поля
const getPrevMultySelect = (common, own) => {
  // own- права, доступные сотруднику, common - общий массив всех прав
  var array3 = common.filter(function (obj) {
    return own.indexOf(obj) >= 0;
  });
  return formatOptions(array3);
};

const getDefValues = (action, employeeData, allRights) => {
  const {
    head_last_name,
    head_first_name,
    position,
    department,
    head_id,
    department_id,
    position_id,
  } = employeeData?.employee[0] || {};
  // эти поля долдны совпадать с настройками в пропсах формы
  return {
    // нельзя ставить null обычному input ругается консоль
    first_name: "",
    last_name: "",
    sex: "",
    birthday: "",
    email: "",
    contacts_phone: "",
    password: "",
    contacts_address: "",
    contacts_other: "",
    // когда вышел на работу
    date_start: "",
    // должность
    position_id:
      action === "edit"
        ? {
            label: position,
            value: position_id,
          }
        : "",

    // глава отдела
    head_id:
      action === "edit"
        ? // если редактируем и если глава отдела назначен
          {
            label: head_first_name
              ? head_first_name + " " + head_last_name
              : " не назначен",
            // в value даем id руководителя, которые ждет от нас сервер
            value: head_first_name ? head_id : "",
          }
        : "",
    department_id:
      action === "edit"
        ? // если редактируем и если глава отдела назначен
          {
            label: department || "",
            value: department_id || "",
          }
        : "",
    //  права
    rights:
      action === "edit"
        ? getPrevMultySelect(allRights, employeeData.employee_rights)
        : "",
  };
};

// форматируем данные для селекта, выводит только title, title и имя, title и имя и фамилию и тд
const formatSelectOptions = (arr, value, value2, value3) => {
  return arr.map((el) => {
    return {
      label:
        el[`${value}`] +
        " " +
        (el[`${value2}`] || "") +
        (el[`${value3}`] || ""),
      value: el.id,
    };
  });
};

const EmployeesFormBody = ({
  action,
  position,
  password,
  birthday,
  date_start,
  head_department,
  inputs,
  department,
  other_contacts,
  address,
  rights,
  employeeData,
  onCloseModal,
}) => {
  const {
    register,
    control,
    formState: { isValid },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schemaCreateEmployees),
    mode: "onChange",
    defaultValues: getDefValues(action, employeeData, rights.options),
  });

  const auth = useAuth();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: auth.token,
    company_id: companyId,
  };

  // отправляем форму если создаем
  const onSubmitCreate = (data) => {
    const { rights, department_id, head_id, position_id, ...row } = data;

    let body = {
      row: {
        ...row,
        head_id: head_id?.value || null,
        position_id: position_id?.value || null,
        company_id: companyId,
        birthday: data.birthday ? getFormatCalendarData(data.birthday) : null,
        date_start: data.date_start
          ? getFormatCalendarData(data.date_start)
          : null,
        department_id: department_id?.value || null,
      },
      rights: data?.rights ? data.rights.map((a) => a.value) : [],
    };

    body.row = cleanFormData(body.row);
    axios.post(url_employee_create_send_data, body, { headers }).then(
      (res) => {
        console.log("Добавили сотрудника ");
      },
      (err) => {
        console.log(err, "ошибка при добавлении сотрудника ");
      }
    );
  };

  //  удаляем все свойства объекта где задан null или пустая строка
  const cleanFormData = (obj) => {
    for (const propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName] === ""
      ) {
        delete obj[propName];
      }
    }
    return obj;
  };

  //  отправляем форму если редактируем
  const onSubmitEdit = (data) => {
    const { rights, ...row } = data;
    const { department_id, head_id, position_id, date_start, birthday } = data;
    // если в календаре ничего не меняем, отправляем пред значение дня рождения и даты выхода на работу
    let prevDateStart = employeeData?.employee[0].date_start || null;
    let prevBirthday = employeeData?.employee[0].birthday || null;

    let body = {
      row: {
        ...row,
        company_id: companyId,
        department_id: department_id?.value || null,
        head_id: head_id?.value || null,
        position_id: position_id?.value || null,
        birthday: birthday ? getFormatCalendarData(birthday) : prevDateStart,
        date_start: date_start
          ? getFormatCalendarData(date_start)
          : prevBirthday,
      },
      rights: data.rights.map((a) => a.value),
      employee_id: employeeData.employee[0].id,
    };
    body.row = cleanFormData(body.row);

    axios.put(url_send_edited_employee, body, { headers }).then(
      () => {
        console.log("Отредактировали data сотрудника ");
        onCloseModal();
      },
      (err) => {
        console.log(err, "ошибка при редактировании сотрудника ");
      }
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(
          action === "edit" ? onSubmitEdit : onSubmitCreate
        )}
      >
        {Object.keys(inputs).map((input, i) => (
          <div key={i} className="modal__row modal__row--start">
            {inputs[input].map((el, ind) => {
              if (el?.type === "radio") {
                return (
                  <React.Fragment key={ind}>
                    <div className="modal__col" key={ind}>
                      <RadioItems register={register} settings={el} />
                    </div>
                    <CalendarForm
                      data={birthday}
                      control={control}
                      prev={employeeData?.employee[0].birthday}
                    />
                  </React.Fragment>
                );
              }
              return (
                <EmployeesFormCol
                  setValue={setValue}
                  prev={el.prev}
                  key={ind + 200}
                  input={el}
                  control={control}
                  settings={el}
                  name={el.name}
                />
              );
            })}
          </div>
        ))}

        {/* другие контакты */}
        <EmployeesTextarea
          setValue={setValue}
          prev={employeeData?.employee[0].contacts_other}
          control={control}
          settings={other_contacts}
          name={other_contacts.name} // name нужно для настройки react hook form
        />

        {/* адрес  */}
        <EmployeesTextarea
          prev={employeeData?.employee[0].contacts_address}
          setValue={setValue}
          control={control}
          settings={address}
          name={address.name} // name нужно для настройки react hook form
        />

        {/* Должность */}
        <label>{position.label}</label>
        <Controller
          name={position.name}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              defaultOptions={true}
              options={formatSelectOptions(position.options, "title")}
            />
          )}
        />
        {/* пароль */}
        <EmployeesTextarea
          setValue={setValue}
          prev={employeeData?.employee[0].password}
          control={control}
          settings={password}
          name={password.name}
        />
        {/* Отдел  */}
        <label>{department.label}</label>
        <Controller
          name={department.name}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={formatSelectOptions(department.options, "title")}
            />
          )}
        />

        {/* Руководитель */}
        <label>{head_department.label}</label>
        <Controller
          name={head_department.name}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={formatSelectOptions(
                head_department.options,
                "first_name",
                "last_name"
              )}
            />
          )}
        />

        {/* Календарь  */}
        <div className="modal__row modal__row--end">
          <CalendarForm
            data={date_start}
            control={control}
            prev={employeeData?.employee[0].date_start}
          />
          {action === "edit" && (
            <div className="modal__col">
              <label className="modal__label">Стаж 5 лет 5 месяцев</label>
            </div>
          )}
        </div>
        {/* права */}
        <SelectMulty
          item={rights}
          control={control}
          options={formatOptions([...rights.options])}
        />
        <ModalBottom isValid={isValid} action={action} />
      </form>
    </>
  );
};

export default EmployeesFormBody;
