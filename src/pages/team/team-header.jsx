import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import EmployeesForm from "../../components/employees/employees-form/EmployeesForm";
import { Link} from "react-router-dom";
// import CalendarForm from "../../components/form/CalendarForm";

const TeamHeader = (props) => {
  const { t } = useTranslation();
  const [modalAddEmployee, setModalAddEmployee] = useState(false);

  //  тут делаем запрос на получние данных для формы
  const onOpenModal = () => {
    setModalAddEmployee(true);
  };
  // закрыть окно и сбросить все состояния формы, сотрудников и тд
  const onCloseModal = () => {
    setModalAddEmployee(false);
  };

  return (
    <section className="subheader">
      <div className="subheader__container container">
        <div className="subheader__col">
          <Link
            // onClick={() => window.props.onOpen(department_window)}
            className="subheader__link"
            to=""
          >
            {t("TeamHeader.team")}
          </Link>

          <Link
            className="subheader__link"
            to="departments"
          >
            {t("TeamHeader.depatrments")}
          </Link>

          <Link
            className="subheader__link"
            to="salaries"
          >
            {t("TeamHeader.salaries")}
          </Link>
          <Link
            className="subheader__link"
            to="vacations"
          >
            {t("TeamHeader.vacations")}
          </Link>
        </div>
        <div className="subheader__col">
          <button className="subheader__button" onClick={onOpenModal}>
            Добавить сотрудника
          </button>
          <button className="subheader__button">
            Добавить поиск сотрудника
          </button>
        </div>
      </div>
      {modalAddEmployee && (
        <EmployeesForm
          onCloseModal={onCloseModal}
          action="add"
        />
      )}
    </section>
  );
};

export default TeamHeader;
