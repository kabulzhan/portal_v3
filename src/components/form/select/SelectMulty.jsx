import React from "react";
import makeAnimated from "react-select/animated";
import { Controller } from "react-hook-form";
import Select from "react-select";

// надстройка стилей react-select
const colourStyles = {
  // выпадающие штуки списка
  // data - инфа о item списка - label, value
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#a1a1a163" : "transparent",
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
  // поле с выбранными списками
  control: (styles, { data, isDisabled, isFocused, isSelected }) => {
    //  console.log(isFocused, "data");
    return {
      ...styles,
      width: "100%",
      opacity: "1",
      // border: isFocused ? "2px solid  #1890ff" : "1px solid #d9d9d9",
      border: "none",
      boxShadow: "none",
      // boxShadow: isFocused ? "0 0 4px rgba(24, 144, 255, 0.5)" : 0,
      ":hover": {
        // border: isFocused ? "2px solid  #1890ff" : "1px solid #d9d9d9",
        border: "none",
        boxShadow: "none",
        // boxShadow: isFocused ? "0 0 4px rgba(24, 144, 255, 0.5)" : 0,
      },
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
  multiValue: (styles, { data, isDisabled, isFocused, isSelected }) => {
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
    marginTop: "6px",
    marginLeft: "8px",
    height: "12px",
    width: "12px",
    ":hover": {
      color: "red",
      border: "1px solid red",
    },
  }),
  // то что внутри инпута
  multiValueLabel: (styles, { data }) => {
    const { color } = data;
    return {
      position: "relative",
      marginLeft: 30,
      width: "100%",
      ":before": {
        position: "absolute",
        left: "-13px",
        top: "8px",
        backgroundColor: color || "transparent",
        border: color ? "2px solid red" : "none",
        borderRadius: 10,
        content: '" "',
        height: 8,
        width: 8,
      },
    };
  },
  //   вертик полоска справа
  // indicatorSeparator: (styles)=> {
  //     return {
  //         border: "2px solid red",
  //         width: "30px",
  //         height:"30px"

  //     };
  // }
  // иконка выпадающего списка
  dropdownIndicator: (styles) => {
    return {
      // border: "2px solid red",
      backgroundColor: "#00e444",
      width: "20px",
      height: "20px",
      borderRadius: "3px",
      padding: "0 13px 0 0px",
      position: "absolute",
      left: "0px",
      top: "8px",
      // display: "flex"

      // marginRight: "60px"
    };
  },
  // container: (styles) => {
  //   return {
  //     border: "2px solid red",
  //     backgroundColor: "red",
  //     width: "300px",
  //     height: "30px",
  //     display: "flex",
  //     flexDirection: "column"
  //   };
  // },
  // loadingIndicator: (styles) => {
  //   return {
  //     // border: "2px solid red",
  //     backgroundColor: "#00e444",
  //     // width: "30px",
  //     // height: "30px",
  //     position: "absolute",
  //     left: "0px",
  //     top: "8px",
  //   };
  // },
};

// компонент для тегов, мультивыбора с выпадашкой и крестиком, переиспользуемый
const SelectMulty = (props) => {
  const { item, control, options } = props;
  // item - инпут и его настройки
  const animatedComponents = makeAnimated(); // при удалении анимация
  return (
    <div className="modal__row">
      {/* label необходим, иначе не работает выбор в списке */}
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
            placeholder={item?.placeholder || ''}
            isMulti
            name="colors"
            options={options} // список выпадашки. по дефолту значения устанавлиаваются в настройках формы в родителе
            className="modal__row data red-test"
            classNamePrefix="data__button-delete"
            // defaultValue={{ label: "Select Dept", value: 0 }}
          />
        )}
      />
    </div>
  );
};

export default SelectMulty;
