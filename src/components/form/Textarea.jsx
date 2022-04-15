import React from "react";
import { useController } from "react-hook-form";

const Textarea = (props) => {
  const { field } = useController(props);
  const { label, name } = props.settings;
  return (
    <div className="modal__row">
      <label
        className="modal__label"
        htmlFor={name}
      >
        {label}
      </label>
      <textarea
        style={{ height: props.heightCol }}
        className="modal__textarea"
        {...field}
        id={name}
        rows="2"
      ></textarea>
    </div>
  );
};

export default Textarea;
