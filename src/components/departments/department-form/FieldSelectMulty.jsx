import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Controller } from "react-hook-form";

const colourStyles = {
  // выпадающие штуки списка
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#a1a1a163" : "transparent",
      //   color: '#FFF',
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
  // поле с выбранными списками
  control: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      width: "100%",
      opacity: "1",
      border: isFocused ? "2px solid  #1890ff" : "1px solid #d9d9d9",
      boxShadow: isFocused ? "0 0 4px rgba(24, 144, 255, 0.5)" : 0,
      ":hover": {
        border: isFocused ? "2px solid  #1890ff" : "1px solid #d9d9d9",
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
  // кнопка удаления
  multiValueRemove: (styles, { data }) => ({
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
};

const formatOptions = (arr) => {
  return arr.map((el) => {
    return {
      id: el.id,
      label: el.first_name + " " + el.last_name + " " + el.title,
      value: el.first_name + " " + el.last_name + " " + el.title,
    };
  });
};

const FieldSelectMulty = (props) => {
  const { item, control, departData } = props;
  const animatedComponents = makeAnimated();

  return (
    <div className="modal__row">
      <label className="modal__label">{item.label}</label>

      <Controller
        name={item.name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            styles={colourStyles}
            closeMenuOnSelect={false}
            components={animatedComponents}
            placeholder="Выберите состав отдела"
            isMulti
            name="colors"
            options={formatOptions([
              ...departData.free_employees,
              ...departData.employees,
            ])}
            className="modal__row data"
            classNamePrefix="data__button-delete"
          />
        )}
      />
    </div>
  );
};

export default FieldSelectMulty;
