import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

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

const Tag = ({
  action,
  departData,
  getFormValue,
  infoIsLoad,
  employeesList,
  freeAndOwnEmployees,
}) => {
  const animatedComponents = makeAnimated();
  const [needBlue, setNeedBlue] = useState(false);
  const [selected, setSelected] = useState([]);
  // для синей подводки ипуту
  const handlerBlur = () => {
    setNeedBlue(!needBlue);
  };
const {employees, free_employees} = departData;

  const getRemovedItem = (a, b) => {
    const isSame = (a, b) => a.id === b.id;

    const onlyInLeft = (left, right, compareFunction) =>
      left.filter(
        (leftValue) =>
          !right.some((rightValue) => compareFunction(leftValue, rightValue))
      );

    const onlyInA = onlyInLeft(a, b, isSame);
    const onlyInB = onlyInLeft(b, a, isSame);

    const result = [...onlyInA, ...onlyInB];
    console.log(result, "must be removed");
    return result;
  };

  const handleChange = (items) => {
    setSelected(items);
    console.log(items, "items");
  };
  // отправим  данные в родителя для оправки на сервер
  const sendValuesToForm = () => {
    let arr = selected.map((el) => {
      return el.id;
    });
    getFormValue({ employees: arr });
  };

  const getDefaultValue = (main, compared) => {
    let updated = [];
      main.forEach((el) => {
        if (compared.some((el2) => el2.id === el.id)) {
          updated.push(el);
        }
      });
      return updated;
  };

  // если редактируем, то загружаем свободных и принадлежащих отделу
  if (action === "edit") {

      const freeAndOwnEmployees = [ ...free_employees ,  ...employees ];
      let defaultWorkers = getDefaultValue(freeAndOwnEmployees, employees);
      // console.log(defaultWorkers, "defaultWorkers");
      return (
        <>
          <Select
            defaultValue={formatOptions(defaultWorkers)}
            options={formatOptions(freeAndOwnEmployees)}
            onChange={handleChange}
            onFocus={() => {
              handlerBlur();
            }}
            onBlur={() => {
              handlerBlur();
              sendValuesToForm();
              // getFormValue({ employees: tagSelected });
            }}
            styles={colourStyles}
            closeMenuOnSelect={false}
            components={animatedComponents}
            placeholder="Выберите состав отдела"
            isMulti
            name="colors"
            className={
              needBlue
                ? "modal__row data need--blue"
                : "modal__row data modal__row--gray"
            }
            classNamePrefix="data__button-delete"
          />
        </>
      );
  } else {
    return (
      <>
        {/* <p>СОЗДАЕМ</p> */}
        <Select
          options={formatOptions(free_employees)}
          onChange={handleChange}
          onFocus={() => {
            handlerBlur();
          }}
          onBlur={() => {
            handlerBlur();
            sendValuesToForm();
            // getFormValue({ employees: tagSelected });
          }}
          // onBlur={() => {
          //   handlerBlur();
          //   getFormValue({ employees: tagSelected });
          // }}
          styles={colourStyles}
          closeMenuOnSelect={false}
          components={animatedComponents}
          placeholder="Выберите состав отдела"
          isMulti
          name="colors"
          className={
            needBlue
              ? "modal__row data need--blue"
              : "modal__row data modal__row--gray"
          }
          classNamePrefix="data__button-delete"
        />
      </>
    );
  }
};
// };

export default Tag;
