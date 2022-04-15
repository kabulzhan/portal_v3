//  сделать переиспользуемый компонент под селект для формы. в процессе изменений структуры формы на это

import React  from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

// надстройка стилей react select
const selectStyles = (open) => ({
  menu: (provided) => ({
    ...provided,
    marginTop: 0,
    borderwidth: 10,
    fontSize: 12,
    height: open ? "100px" : "0px",
    overflow: "hidden",
    opacity: open ? 1 : 0,
    transition: "all 0.2s ease-in-out",
    visibility: open ? "visible" : "hidden",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "gray",
    borderRadius: "100px",
    border: "1px solid gray",
    padding: "0px",
    marginTop: "8px",
    height: "12px",
    width: "12px",
    ":hover": {
      color: "red",
      border: "1px solid red",
    },
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#a1a1a163" : "transparent",
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
  // поле с выбранными списками
  control: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      width: "100%",
      opacity: "1",
      border: isFocused ? "1px solid  #1890ff" : "1px solid #d9d9d9",
      boxShadow: isFocused ? "0 0 4px rgba(24, 144, 255, 0.5)" : 0,
      ":hover": {
        border: isFocused ? "1px solid  #1890ff" : "1px solid #d9d9d9",
        boxShadow: isFocused ? "0 0 4px rgba(24, 144, 255, 0.5)" : 0,
      },
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "transparent",
    };
  },
});

// форматируем данные для селекта, выводит только title, ttle и имя, title и имя и фамилию и тд
const formatSelectOptions = (arr, value, value2, value3) => {
  // если у нас селект не в виде обхекта, а как простой массив типа  options: ["Документ", "Картинка"],
  return arr.map((el) => {
    if (value !== null) {
      return {
        label:
          el[`${value}`] +
          " " +
          (el[`${value2}`] || "") +
          (el[`${value3}`] || ""),
        value: el.id || el.value, // если у нас в списке селектов нужно получать не id, а значение какое то
      };
    } else {
      return {
        label: el,
        value: el,
      };
    }
  });
};

const SelectInput = ({
  data,
  control,
  value,
  value2,
  value3,
}) => {
  return (
    <>
      <label>{data.label}</label>
      <Controller
        name={data.name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={formatSelectOptions(data.options, value, value2, value3)}
            styles={selectStyles("open")}
            // defaultInputValue не cработает 
          />
        )}
      />
    </>
  );
};

export default SelectInput;
