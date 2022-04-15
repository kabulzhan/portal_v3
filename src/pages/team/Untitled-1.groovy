{/* <Select
        // defaultValue={employees || null}
        defaultValue={prevEmp || null}
        onChange={handleChange}
        onFocus={() => {
          handlerBlur();
        }}
        onBlur={() => {
          handlerBlur();
          getFormValue({ employees: tagSelected });
        }}
        styles={colourStyles}
        closeMenuOnSelect={false}
        components={animatedComponents}
        placeholder="Выберите состав отдела"
        // defaultValue={[options[2], options[3]]}
        isMulti
        name="colors"
        // options={options}
        options={tagList}
        className={
          needBlue
            ? "modal__row data need--blue"
            : "modal__row data modal__row--gray"
        }
        classNamePrefix="data__button-delete"
      /> */}
    // </>