import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "../../components/form/form-field/form-field";
import ModalBottom from "../../components/modals/modal-bottom"

// начала делать создание должности,  проверить в работе

// настройка валидации формы
const schemaDepartment = yup.object().shape({
  title: yup.string().required()
});

const PositionFormCreateEdit = ({
  action,
  inputs,
  onCreate,
  onClose,
  prevData,
}) => {
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
      title:  action === "edit" ? prevData.title : ""
    },
  });
  return (
    <>
      <form className="auth__form form" onSubmit={handleSubmit(onCreate)}>
        <FormField
          prev={prevData?.title}
          classValid="form__input"
          classInValid="form__input form__input--invalid"
          control={control}
          settings={inputs.title}
          name={inputs.title.name}
          action={action}
          setValue={setValue}
        />

        <ModalBottom onClose={onClose} isValid={isValid} />
      </form>
    </>
  );
};

export default PositionFormCreateEdit;
