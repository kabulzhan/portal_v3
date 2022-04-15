import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import CalendarForm from "../../components/calendar-form/CalendarForm";
import * as yup from "yup";
import Select from "react-select";
import SelectInput from "../../components/form/form-select/SelectInput";
import Textarea from "../../components/form/Textarea";

const schemaFireEmployee = yup.object().shape({
  // first_name: yup.string().required(),
  // date_start: yup.string().required(),
  // }),
});
// модалка увольнения сотрудника
const WindowFire = () => {

  const {
    register,
    control,
    formState: { isValid },
    handleSubmit,
    // setError,
    // resetField,
    getValues,
    setValue,
    // watch,
  } = useForm({
    resolver: yupResolver(schemaFireEmployee),
    mode: "onChange",
    // эти поля долдны совпадать с настройками в пропсах формы
    defaultValues: {
      reason_id: null,
      date: null,
      marks: null,
    },
  });

  const date = {
    name: "date",
    icon: true,
    label: "Не работает с даты",
    type: "text",
    // options: infoIsLoad?.data?.departments || [],
  };
  const reasons = {
    name: "reason_id",
    label: "Причина",
    options: [
      { id: 1, value: "Причина _1" },
      { id: 2, value: "Причина _2" },
    ],
    type: "text",
  };
  const marks = {
    name: "marks",
    label: "Пометка",
    type: "text",
  };
  // отправляем форму
  const onSubmit = (data) => {
      console.log(data);
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    //   Authorization: auth.token,
    //   company_id: companyId,
    };
    // team - список  user и теуфь department дерево 

    // let test = {
    //   last_name: "Jon",
    //   first_name: "Nash",
    //   birthday: "2000/12/23",
    //   sex: "male",
    //   email: "sh_zaf@inbox.ru",
    //   password: "333",
    //   company_id: 1,
    //   date_start: "2000/1/21",
    // };

    // let body = {
    //   row: {
    //     ...data,
    //     department_id: department_id?.value || null,
    //     head_id: head_id?.value || null,
    //     position_id: position_id?.value || null,
    //     company_id: companyId,
    //     birthday: data.birthday ? getFormatCalendarData(data.birthday) : null,
    //     date_start: data.date_start
    //       ? getFormatCalendarData(data.date_start)
    //       : null,
    //   },
    // };
    // axios.post(url_employee_create_send_data, body, { headers }).then(
    //   (res) => {
    //     console.log("Добавили сотрудника ");
    //   },
    //   (err) => {
    //     console.log(err, "ошибка при добавлении сотрудника ");
    //   }
    // );

    // console.log(body.row, "ROW");
  };

  return (
    <section className="modal">
      <div className="modal__wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal__inner">
            <section className="modal__body">
              <div className="modal__header">
                <h2 className="modal__title">Увольнение сотрудника</h2>
                <button className="modal__close-modal"></button>
              </div>
              <div className="modal__row modal__row--end">
                <div className="modal__col">
                  <CalendarForm data={date} control={control} />
                </div>
                <div className="modal__col">
                  <div className="modal__checkbox-wrapper">
                    <input
                      className="modal__checkbox"
                      id="fire"
                      type="checkbox"
                    />
                    <label
                      htmlFor="fire"
                      className="modal__label modal__label--checkbox"
                    >
                      Немедленно
                    </label>
                  </div>
                </div>
              </div>
              <SelectInput data={reasons} control={control} />
              <Textarea
                control={control}
                settings={marks}
                heightCol="150px"
                name={marks.name}
              />
              <div className="modal__button-box">
                <button className="modal__button modal__button--yes">
                  Уволить
                </button>
                <button className="modal__button modal__button--cancel">
                  Отмена
                </button>
              </div>
            </section>
          </div>
        </form>
      </div>
    </section>
  );
};

export default WindowFire;
