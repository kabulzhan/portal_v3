import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import ModalHeader from "../../modals/modal-header";
import EmployeesFormBody from "./EmployeesFormBody";
import {
  url_get_data_employee_create,
  companyId,
  url_get_data_employee_edit,
} from "../../../settings/base-url";
import { initSocket } from "../../../settings/sockets";

const axios = require("axios");
// employeeData - предыдущие значения полей при редактированиии
const EmployeesForm = ({ modal, onCloseModal, action, employeeData }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const translateKey = "EmployeesForm"; // для перевода
  const socket = initSocket(auth.token);
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: auth.token,
  };
  // инфа для построения модалки - свободные сотрудники,  отделы и тд  и статус загрузки
  const [infoIsLoad, setInfoIsLoad] = useState(null);

  // получаем списки отделов, сотрудников для отображения selectов
  useEffect(() => {
    socket.emit("add_to_room", "employee_create_change");
    if (action === "add") {
      axios
        .get(url_get_data_employee_create, { headers, company_id: companyId })
        .then(
          (res) => {
            setInfoIsLoad(res.data.dataForEmployeeCreation);
          },
          (error) => {
            console.log(error, "error");
          }
        );
    } else {
      let id = employeeData.employee[0].id;
      axios
        .get(url_get_data_employee_edit + `/${id}`, {
          headers,
          company_id: companyId,
        })
        .then(
          (res) => {
            setInfoIsLoad(res.data.dataForEmployeeEdition);
          },
          (error) => {
            console.log(error, "error");
          }
        );
    }
  }, [auth.token]);

  // настройка для полей формы
  const inputs = {
    full_name: [
      {
        name: "first_name",
        label: t(`${translateKey}.first_name`),
        type: "text",
        prev: employeeData?.employee[0].first_name || null,
      },
      {
        name: "last_name",
        icon: true,
        label: t(`${translateKey}.last_name`),
        type: "text",
        prev: employeeData?.employee[0].last_name || null,
      },
    ],
    gender: [
      {
        name: "sex",
        icon: true,
        type: "radio",
        radio_btns: [
          {
            name: "sex",
            icon: true,
            label: t(`${translateKey}.male`),
            value: "male",
            type: "text",
          },
          {
            name: "sex",
            icon: true,
            value: "female",
            label: t(`${translateKey}.female`),
            type: "text",
          },
        ],
        label: t(`${translateKey}.gender`),
        prev: employeeData?.employee[0].sex || null,
      },
    ],
    email_phone: [
      {
        name: "email",
        icon: true,
        label: t(`${translateKey}.email`),
        type: "text",
        prev: employeeData?.employee[0].contacts_email || null,
      },
      {
        name: "contacts_phone",
        icon: true,
        label: t(`${translateKey}.phone`),
        type: "text",
        prev: employeeData?.employee[0].contacts_phone || null,
      },
    ],
  };

  return (
    <>
      {infoIsLoad && (
        <section className="modal">
          <div className="modal__wrapper">
            <div
              className="modal__inner" // класс поправить
            >
              <>
                <section className="modal__body test">
                  <ModalHeader
                    title={
                      action === "edit"
                        ? t(`${translateKey}.title_edit`)
                        : t(`${translateKey}.title_create`)
                    }
                    onClose={onCloseModal}
                  />
                  <EmployeesFormBody
                    onCloseModal={onCloseModal}
                    action={action}
                    employeeData={employeeData}
                    inputs={inputs}
                    birthday={{
                      name: "birthday",
                      icon: true,
                      label: t(`${translateKey}.DOB`),
                    }}
                    // другие контакты
                    other_contacts={{
                      name: "contacts_other",
                      icon: true,
                      label: t(`${translateKey}.other_contacts`),
                      type: "text",
                    }}
                    address={{
                      name: "contacts_address",
                      icon: true,
                      label: t(`${translateKey}.address`),
                      type: "text",
                    }}
                    // должность
                    position={{
                      name: "position_id",
                      icon: true,
                      label: t(`${translateKey}.position`),
                      type: "select",
                      options: infoIsLoad?.positions || [],
                    }}
                    // руководитель отдела
                    head_department={{
                      name: "head_id",
                      label: t(`${translateKey}.head_department`),
                      type: "select",
                      options: infoIsLoad?.heads || [],
                    }}
                    // отдел
                    department={{
                      name: "department_id",
                      icon: true,
                      label: t(`${translateKey}.department`),
                      type: "text",
                      options: infoIsLoad?.departments || [],
                    }}
                    password={{
                      name: "password",
                      icon: true,
                      label: t(`common.password`),
                      type: "text",
                    }}
                    // когда начал работать
                    date_start={{
                      name: "date_start",
                      label: t(`${translateKey}.start_to_work`),
                      type: "text",
                    }}
                    // права
                    rights={{
                      name: "rights",
                      icon: true,
                      label: t("common.rights"),
                      type: "select",
                      subType: "tag",
                      placeholder: "Выберите права",
                      options: infoIsLoad?.rights || [],
                    }}
                  />
                </section>
              </>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default EmployeesForm;
