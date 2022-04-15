import React, { useState } from "react";
import Select from "react-select";
import { useController } from "react-hook-form";


// переписать на универсальный SelectInput

// опред формат для отображения выпадающего списка
const formatOptions = (arr) => {
  return arr.map((el) => {
    return {
      id: el.id,
      label: el.first_name + " " + el.last_name,
      value: el.first_name + " " + el.last_name,
    };
  });
};

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
      border: isFocused ? 0 : 0,
      boxShadow: isFocused ? 0 : 0,
      ":hover": {
        border: isFocused ? 0 : 0,
        boxShadow: isFocused ? 0 : 0,
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

const FormSelect = (props) => {
  const { label, errors, getFormValue, name, departData, action } = props;
  const [selected, setSelected] = useState(null);
  const [needBlue, setNeedBlue] = useState(false);
  const [clicked, setClicked] = useState(null);
  const [open, setOpen] = useState(false);
   const { field } = useController(props);

  const styleClass =
    !selected && clicked
      ? "form__input--invalid"
      : "modal__row data modal__row--gray";

  // для синей подводки инпуту
  const handlerBlur = () => {
    setNeedBlue(!needBlue);
    if (!selected) {
      // для красной обводки при пустом value
      setClicked(true);
    }
  };

  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
    getFormValue({ [name]: selectedOption.id });
    console.log(selectedOption, "selectedOption");
  };

  if (action === 'edit') {
    let data = {
      value: departData.head_name,
      label: departData.head_name,
    };
    return (
      <>
        <div className="modal__row" onClick={() => setOpen(!open)}>
          <label className="modal__label">{label}</label>
          <Select
            {...field}
            menuIsOpen
            defaultValue={data}
            onChange={handleChange}
            onFocus={() => {
              handlerBlur();
            }}
            onBlur={() => {
              handlerBlur();
              setOpen(false);
            }}
            placeholder="Выберите руководителя отдела"
            className={needBlue ? "modal__row data need--blue" : styleClass}
            classNamePrefix="select"
            options={formatOptions(departData.free_employees)}
            errors={errors}
            styles={selectStyles(open)}
          />

          {!selected && clicked ? (
            <p className="form__error">Введите {name}</p>
          ) : (
            <p> </p>
          )}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="modal__row" onClick={() => setOpen(!open)}>
          <label className="modal__label">{label}</label>
          <Select
            {...field}
            options={formatOptions(departData.free_employees)}
            menuIsOpen
            onChange={handleChange}
            onFocus={() => {
              handlerBlur();
            }}
            onBlur={() => {
              handlerBlur();
              setOpen(false);
            }}
            placeholder="Выберите руководителя отдела"
            className={needBlue ? "modal__row data need--blue" : styleClass}
            classNamePrefix="select"
            errors={errors}
            styles={selectStyles(open)}
          />

          {!selected && clicked ? (
            <p className="form__error">Введите {name}</p>
          ) : (
            <p> </p>
          )}
        </div>
      </>
    );
  }
};
export default FormSelect;