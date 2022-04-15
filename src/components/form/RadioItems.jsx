import React from "react";

const RadioItem = (props) => {
  const { prev, register, input } = props;
  const { label, name, value } = input;
  return (
    <>
      {/* <label className="modal__label" htmlFor={label}> */}
      <input
        // className="modal__radio-input"
        type="radio"
        name={name}
        id={label}
        value={value}
        {...register(`${name}`)}
        //  checked по умолчанию
        defaultChecked={prev === value}
      />
      <label htmlFor={label}>{label}</label>
    </>
  );
};
const RadioItems = ({ register, settings }) => {
  return (
    <>
      <label className="modal__label">{settings.label}</label>
      <div className="modal__radio-box"></div>
      {settings.radio_btns.map((el, i) => {
        return (
          <RadioItem
            register={register}
            key={i}
            input={el}
            prev={settings.prev}
          />
        );
      })}
    </>
  );
};
export default RadioItems;
