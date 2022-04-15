    <input
        type={name ? iconType : "text"}
        // type={passwordShown ? "text" : "password"}
        {...field}
        placeholder={name}
        className={
          !fieldState.error ? "form__input" : "form__input form__input--invalid"
        }
      />

      {fieldState.invalid ? (
        <p className="form__error">Введите {name}</p>
      ) : (
        fieldState.isDirty && <span className="form__icon-input"></span>
      )}
      <span
        onClick={togglePasswordVisiblity}
        className={
          passwordShown
            ? "form__icon-input _visible"
            : "form__icon-input _invisible"
        }
      ></span>