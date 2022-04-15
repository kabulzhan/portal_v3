import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SelectInput from "../../../../components/form/form-select/SelectInput";
import ResultTextareaField from "./ResultTextareaField";

const schemaCreateEmployees = yup.object().shape({
  // first_name: yup.string().required(),
});

const getDefValues = (prevData) => {
  // эти поля долдны совпадать с настройками в пропсах формы
  return {
    // нельзя ставить null обычному input ругается консоль
    result_description: "",
    type_of_result: prevData?.type
      ? { label: prevData?.type, value: prevData?.type }
      : { label: "Файл", value: "file" },
  };
};

//prevData - предыдущее состояние проекта при редактировании
const ResultTextareaBlock = ({ setResult, editedItemResult }) => {
  // настройки формы
  const input = {
    result: {
      name: "result_description",
      label: "Описание",
      type: "text",
    },
    typeOfResult: {
      name: "type_of_result",
      label: "",
      type: "select",
      options: [
        { label: "Файл", value: "file" },
        { label: "Документ", value: "text" },
      ],
    },
  };

  const { control, handleSubmit, reset, setValue } = useForm({
    resolver: yupResolver(schemaCreateEmployees),
    mode: "onChange",
    defaultValues: getDefValues(editedItemResult),
  });

  //  отправляем данные о поле или предыдущие данные, если редактируем
  const onSubmitCreate = (data) => {
    // если редактируем, второй параметр - id редактируемого
    if (editedItemResult) {
      setResult(
        {
          description: data.result_description || editedItemResult.title,
          type: data.type_of_result.value || editedItemResult.type,
          id: editedItemResult.id,
        },
        editedItemResult.id
      );
    } else {
      setResult({
        description: data.result_description,
        type: data.type_of_result.value,
        id: Date.now(),
      });
    }
    reset({
      result_description: "",
    });
  };

  return (
    <div
      // onSubmit={handleSubmit(onSubmitCreate)}
      className="modal__row modal__row--end"
    >
      <ResultTextareaField
        setValue={setValue}
        editedItemResult={editedItemResult}
        control={control}
        settings={input.result}
        name={input.result.name} // name нужно для настройки react hook form
        height={114}
      />
      {/* выпадающий список */}
      <div className="modal__col modal__col--diff">
        <SelectInput
          setValue={setValue}
          value="label"
          prev={editedItemResult}
          control={control}
          data={input.typeOfResult}
        />
        <div
          onClick={handleSubmit(onSubmitCreate)}
          className="modal__button modal__button--add"
        >
          {editedItemResult ? "Редактировать" : "Добавить"}
        </div>
      </div>
    </div>
  );
};

export default ResultTextareaBlock;
