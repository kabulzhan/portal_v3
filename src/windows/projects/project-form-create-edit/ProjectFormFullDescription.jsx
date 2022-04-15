import React from 'react'
import EmployeesTextarea from '../../../components/employees/employees-form/EmployeesTextarea';
/**
 * TODO: настроить высоту так, чтобы  текст шел как надо
 * @param {} param0 
 * @returns 
 */
const ProjectFormFullDescription = ({ data, control, setValue }) => {
  return (
    <div className="modal__row modal__row--end">
      <div className="modal__col modal__col--diff">

        <EmployeesTextarea
          setValue={setValue}
          control={control}
          settings={data}
          name={data.name} // name нужно для настройки react hook form
          height={114}
        />
      </div>
      <div className="modal__col modal__col--diff">
        <div className="modal__dropdown dropdown">
          <div className="dropdown__input" data-selected="1">
            Документ
          </div>
          <ul className="dropdown__select select">
            <li className="select__item" data-option="1">
              Документ
            </li>
            <li className="select__item" data-option="2">
              Картинка
            </li>
          </ul>
        </div>
        <button className="modal__button modal__button--add">Добавить</button>
      </div>
    </div>
  );
};

export default ProjectFormFullDescription