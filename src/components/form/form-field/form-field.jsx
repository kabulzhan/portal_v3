import React from "react";
import FormInput from "./form-input";
import { Link } from "react-router-dom";


// поля для login и возможно department,  упростить позже
const FormField = (props) => {
  const { label, name } = props.settings;
  const { resetPassword } = props;
  return (
    <div className="form__field">
      <div className="form__input-wrapper">
        <label htmlFor="phone" className="form__label">
          {label}
        </label>
        {/* круглая иконка с знаком вопроса, передать ее настройку из пропсов  */}
        {/* <span
          className="form__icon-label"
          data-text="Текст подсказки, передаваемый в data-text"
        ></span> */}

        <FormInput props={props} />
        {name === "password" && resetPassword && (
          <Link className="form__restore-link" to="/forgot">
            <span className=""> Забыли пароль?</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default FormField;
