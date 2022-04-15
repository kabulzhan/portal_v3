import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "../../../components/form/form-field/form-field";
import ModalBottom from "../../../components/modals/modal-bottom";
import FieldSelect from "./FieldSelect";
import SelectMulty from "../../../components/form/select/SelectMulty";

// настройка валидации формы
const schemaDepartment = yup.object().shape({
  title: yup.string().required(),
  head_id: yup.object().shape({
    label: yup.string().required("Required"),
    value: yup.string().required("Required"),
  }),
  // если нужно для мультиселекта
  // employees_department: yup.array()
  //   .of(
  //     yup.object().shape({
  //       label: yup.string().required(),
  //       value: yup.string().required(),
  //     })
  //   )
});
// устанавливаем значение полей пострудников, принад. отделу, массив всех сотрудников и принад.  отделу должен быть одним и тем же
const getPrevEmployees = (data) => {
  const freeAndOwnEmployees = [...data.free_employees, ...data.employees];

  // найти тех сотрудников в списке свободных, которые принадлежат отделу
  // id в двух массивах могут быть одинаковыми, сравниваем по имени тоже
  let defaultWorkers = freeAndOwnEmployees.filter((el) =>
    data.employees.some(
      (el2) =>
        el2.id === el.id &&
        el2?.last_name === el?.last_name &&
        el2?.first_name === el?.first_name
    )
  );
  return formatOptions(defaultWorkers);
};

const formatOptions = (arr) => {
  return arr.map((el) => {
    return {
      label: el.first_name + " " + el.last_name + " ",
      value: el.first_name + " " + el.last_name + " ",
      id: el.id,
    };
  });
};

const DepartmentForm = ({ action, inputs, departData, onCreate, onClose }) => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schemaDepartment),
    mode: "onChange",
    // значение по умолчанию ставим всегда - в зависимости от выбранного action (edit или add) ставим пустое поле или уже выбранные value
    defaultValues: {
      title: "",
      head_id:
        action === "edit"
          ? {
              label: departData.head_name,
              value: departData.head_name,
            }
          : "",
      employees_department:
        action === "edit" ? getPrevEmployees(departData) : "",
    },
  });
  return (
    <>
      <form className="auth__form form" onSubmit={handleSubmit(onCreate)}>
        <FormField
          prev={departData?.title}
          classValid="form__input"
          classInValid="form__input form__input--invalid"
          control={control}
          settings={inputs.title}
          name={inputs.title.name}
          action={action}
          setValue={setValue}
        />
        <FieldSelect item={inputs.head_id} control={control} />
        <SelectMulty
          // options={formatOptions([...departData.employees])}
          options={formatOptions([
            ...departData.free_employees,
            ...departData.employees,
          ])}
          item={inputs.employees_department}
          control={control}
        />
        <ModalBottom onClose={onClose} isValid={isValid} />
      </form>
    </>
  );
};

export default DepartmentForm;
