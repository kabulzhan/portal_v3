import React, { useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

//  форматируем список в нужный для select
const formatOptions = (arr) => {
  return arr.map((el) => {
    return {
      id: el.id,
      label: el.first_name + " " + el.last_name,
      value: el.first_name + " " + el.last_name,
    };
  });
};
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
});
const FieldSelect = (props) => {
  const { item, control} = props;
  const [open, setOpen] = useState(false);

  return (
    <div className="modal__row" onClick={() => setOpen(!open)}>
      <label className="modal__label">{item.label}</label>

      <Controller
        name={item.name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            defaultOptions={true}
            options={formatOptions(item.options)}
            className="modal__row data"
            classNamePrefix="select"
            styles={selectStyles(open)}
          />
        )}
      />
    </div>
  );
};

export default FieldSelect;
