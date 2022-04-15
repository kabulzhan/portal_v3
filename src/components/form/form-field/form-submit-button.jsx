import React from 'react'

const FormSubmitButton = ({ isValid, text }) => {
// console.log(isValid, 'i')
  return (
    <input
      // disabled={isValid}
      className="form__button"
      type="submit"
      value={text}
    />
  );
};

export default FormSubmitButton;
