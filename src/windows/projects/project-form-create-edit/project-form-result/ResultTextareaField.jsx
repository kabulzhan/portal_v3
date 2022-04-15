import React, { useEffect } from "react";
import { useController } from "react-hook-form";

// инпут куда пишем результат
const ResultTextareaField = (props) => {
  const { editedItemResult, setValue, height } = props;
  const { field } = useController(props);
  const { label, name } = props.settings;

  // отображаем предыдущее значение поля, если мы редактируем
  useEffect(() => {
    if (editedItemResult) {
      setValue(`${name}`, editedItemResult.description);
    }
  }, [editedItemResult]);

  return (
    <div className="modal__col modal__col--diff">
      <label className="modal__label" htmlFor={name}>
        {label}
      </label>
      <input
        className="modal__textarea"
        id={name}
        rows="2"
        style={{ height: height }}
        {...field}
      />
    </div>
  );
};

export default ResultTextareaField;
