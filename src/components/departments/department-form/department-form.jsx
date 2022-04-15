import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "../../form/form-field/form-field";
import ModalBottom from "../../modals/modal-bottom";
import FieldSelect from "./FieldSelect";
import FieldSelectMulty from "./FieldSelectMulty";

const schemaDepartment = yup.object().shape({
  title: yup.string().required(),
  head_id: yup.object().shape({
    label: yup.string().required("Required"),
    value: yup.string().required("Required"),
  }),
  // employees_department: yup.array()
  //   .of(
  //     yup.object().shape({
  //       label: yup.string().required(),
  //       value: yup.string().required(),
  //     })
  //   )
});
// устанавливаем значение полей пострудников, принад. отделу, массив всех сотрудников и принадю отделу должен быть одним и тем же
const getPrevEmployees = (data) => {
  const freeAndOwnEmployees = [...data.free_employees, ...data.employees];
  // найти тех сотрудников в списке свободных, которые принадлежат отделу
  let defaultWorkers = freeAndOwnEmployees.filter((el) =>
    data.employees.some((el2) => el2.id === el.id)
  );

  return defaultWorkers.map((el) => {
    return {
      label: el.first_name + " " + el.last_name + " " + el.title,
      value: el.first_name + " " + el.last_name + " " + el.title,
      id: el.id,
    };
  });
};

const DepartmentForm = ({ action, inputs, departData, onCreate, onClose }) => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    // setError,
    // resetField,
    setValue,
    // watch,
  } = useForm({
    resolver: yupResolver(schemaDepartment),
    mode: "onChange",
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
      {/* <button onClick={handleSubmit(onCreate)}>Create </button> */}

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

        <FieldSelect
          prev={departData}
          item={inputs.head_id}
          control={control}
        />
        <FieldSelectMulty
          departData={departData}
          item={inputs.employees_department}
          control={control}
        />

        <ModalBottom
          onClose={onClose}
          isValid={isValid}
        />
      </form>
    </>
  );
};

export default DepartmentForm;
