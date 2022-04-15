import React from 'react'
import { useController } from "react-hook-form";

const CalendarForm = (props) => {
  const {item} = props
    //  const { label, name } = props.settings;
     const { field, fieldState } = useController(props);


    return (
      <div className="m">
        <label
          className="modal__label"
          //  for="description"
          htmlFor={item.label}
        >
          {item.label}
        </label>

        <input
          type="text"
          {...field}
          id={item.label}
          placeholder="CalendarForm"
        />
      </div>
    );
}

export default CalendarForm; 
