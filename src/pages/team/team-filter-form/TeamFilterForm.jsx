import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schemaCreateEmployees = yup.object().shape({
  // first_name: yup.string().required(),
  // last_name: yup.string().required(),
  // // gender: "",
  // // birthday: "",
  // email: yup.string().email().required(),
  // password: yup.string().required(),
  // date_start: yup.string().required(),
  // phone: yup.string().required(),
  // }),
});
// форматируем данные для селекта, выводит только title, ttle и имя, title и имя и фамилию и тд
const formatSelectOptions = (arr, value, value2, value3) => {
  return arr.map((el) => {
    return {
      label:
        el[`${value}`] +
        " " +
        (el[`${value2}`] || "") +
        (el[`${value3}`] || ""),
      // value: el.id,
      value: el.id,
      // el[`${value}`] +
      // " " +
      // (el[`${value2}`] || "") +
      // (el[`${value3}`] || ""),
      // id: el.id,
    };
  });
};
//надо подправить стили, есть синяя полоса при фокусе
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
    // width: "300px"
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
      // backgroundColor: isFocused ? "#a1a1a163" : "transparent",
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
  // поле с выбранными списками
  control: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      // width: "100%",
      width: "153px",
      opacity: "1",
      // border: isFocused ? 0 : 0,
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

const TeamFilterForm = ({ department, position, sorting }) => {
  const {
    control,

    // setError,
    // resetField,
    // watch,
  } = useForm({
    resolver: yupResolver(schemaCreateEmployees),
    mode: "onChange",
    // эти поля долдны совпадать с настройками в пропсах формы
    defaultValues: {
      first_name: null,
      last_name: null,
      sex: null,
      birthday: null,
      email: null,
      contacts_phone: null,
      date_start: null,
      password: null,
      contacts_address: null,
      contacts_other: null,
    },
  });

  return (
    <form className="team__filter team-filter">
      <div className="team-filter__col">
        {/* <label>{position.label}</label> */}
        <div className="team-filter__dropdown dropdown _show">
          <Controller
            name={position.name}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder={position.placeholder}
                options={formatSelectOptions(position.options, "title")}
                styles={selectStyles("open")}
              />
            )}
          />
        </div>

        <div className="team-filter__dropdown dropdown _show">
          <Controller
            name={department.name}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder={department.placeholder}
                options={formatSelectOptions(department.options, "title")}
                styles={selectStyles("open")}
              />
            )}
          />
        </div>
      </div>

      <div className="team-filter__col">
        <div className="team-filter__search search-box">
          <input
            className="search-box__input"
            placeholder="Поиск по сотрудникам"
          />
          <button type="submit" className="search-box__button"></button>
        </div>
      </div>

      <div className="team-filter__col">
        <Controller
          name={department.name}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              placeholder={sorting.placeholder}
              options={sorting.options.map((el)=> {
                return {label: el, value: el}
              })}
              styles={selectStyles("open")}
            />
          )}
        />
        {/* <div
          className="
                  team-filter__dropdown team-filter__dropdown--wide
                  dropdown
                "
        >
          <div className="dropdown__input" data-selected="1">
            Сортировать: дата создания
          </div>
          <ul className="dropdown__select select">
            <li className="select__item" data-option="1">
              Сортировать: дата создания
            </li>
            <li className="select__item" data-option="2">
              Сортировать: дата 2
            </li>
            <li className="select__item" data-option="3">
              Сортировать: дата 3
            </li>
          </ul>
        </div> */}
      </div>
    </form>
  );
};

export default TeamFilterForm;
