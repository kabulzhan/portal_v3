import React, { useState } from "react";
import Departments from "../../windows/departments/Departments";
import AllRouters from "../../routes/routes/all-routes";
import {
  department_window,
  position_window,
  project_window,
} from "../../settings/window-types";
import Positions from "../../windows/positions/Positions";
import useAuth from "../../hooks/useAuth";
import ProjectFormCreateEdit from "../../windows/projects/project-form-create-edit/ProjectFormCreateEdit";

// компонент, который передаем через пропс по проекту,  где нужно вызвать модалку из других дочерних компонентов, (из шапки сайта или списка сотрудников деревом например )
const Window = (props) => {
  const { data } = props;
  const { type } = data;
  // какую модалку мы открываем, приходит от event в вызове диалогового окна внктри компонента
  return (
    <>
      {type === department_window && <Departments {...props} />}
      {type === position_window && <Positions {...props} />}
      {/* при клике на nav открываем окно создания проекта */}
      {type === project_window && <ProjectFormCreateEdit {...props} />}
    </>
  );
};

const App = () => {
  const auth = useAuth();

  const [windowData, setWindowData] = useState({
    isOpen: false,
    type: null, // проекты или отделы отображать?
  });

  const onClose = () => {
    setWindowData({ isOpen: false, type: null });
  };

  const onOpen = (type) => {
    setWindowData({ isOpen: true, type: type });
  };

  // если нужно редактировать что-то из разных частей приложения
  // editable - id проекта   для редактирования
  const onEdit = (type, editable) => {
    setWindowData({ isOpen: true, type: type, editable: editable });
  };
  // модалка для вызова из nav компонента и в теле страницы
  const window = (
    <Window
      data={windowData}
      onClose={onClose}
      onOpen={onOpen}
      onEdit={onEdit}
    />
  );

  // делаем проверку, есть ли у нас data о пользователе ( токены и тд, иначе формы не будут работать, token null )
  return auth.isLoaded ? (
    <>
      {windowData.isOpen && (
        <Window
          data={windowData}
          onOpen={onOpen}
          onClose={onClose}
          onEdit={onEdit}
        />
      )}
      <AllRouters window={window} />
    </>
  ) : (
    <p>Загружаем информацию ... </p>
  );
};

export default App;
