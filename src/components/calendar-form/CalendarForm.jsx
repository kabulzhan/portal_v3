import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import "./CalendarForm.css";

// форматируем дату для  отправки на сервер, эту функцию следует импортировать и исп при отправке формы
export const getFormatCalendarData = (date) => {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

//  удаляем лишнее, что приходит с сервера с датой (время и тд) через слэш 2020/12/23
export const formatDateforPicker = (dateString) => {
  return dateString.substr(0, 10).replace(/-/g, "/");
};
//   через точку  12.12.2020
export const formatDateWithDots = (dateString) => {
  return dateString.substr(0, 10).replace(/-/g, ".").split('.').reverse().join(`.`);
};
const CalendarForm = (props) => {
  const { data, control, prev } = props;
  // если известна дата, которую нужно отобразить

  // если выдает ошибку в календаре при  редактировании - ошибка из-за ручной отправки формы, на продакшне такого не будет. приходит неправильный формат, когда писали тестовые данные типа 0000 000 в дате
  const [startDate, setStartDate] = useState(
    prev ? new Date(formatDateforPicker(prev)) : null
  );

  const handlerChange = (date, field) => {
    field.onChange(date);
    setStartDate(date);
  };
  return (
    <div className="modal__col">
      <label className="modal__label" htmlFor="date">
        {data.label}
      </label>
      <div className="date-range__input-wrapper">
        <Controller
          control={control}
          name={data.name}
          // placeholder="red"
          render={({ field }) => (
            <DatePicker
              placeholderText={data.placeholder}
              onChange={(date) => handlerChange(date, field)}
              selected={prev ? startDate : field.value}
              dateFormat="d-MM-yyyy"
              className="date-range__input"
            />
          )}
        />
        <span className="modal__icon-calendar"></span>
      </div>
    </div>
  );
};

export default CalendarForm;
