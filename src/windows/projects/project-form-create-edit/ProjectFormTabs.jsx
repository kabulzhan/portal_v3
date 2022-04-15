import React from "react";
/**
 * TODO:
  сделать + - при клике
 * @param {*} param0 
 * @returns 
 */
const ProjectFormTabsItem = ({ value, handler }) => {
  return (
    <div className="modal__tag tag tag--color" onClick={handler}>
      {value}
    </div>
  );
};
const ProjectFormTabs = ({ handler }) => {
  return (
    <div className="modal__row">
      <ProjectFormTabsItem value="результат" handler={() => handler("result")} />
      <ProjectFormTabsItem value="сроки" handler={() => handler("deadlines")} />
      <ProjectFormTabsItem value="теги" handler={() => handler("tags")} />
      <ProjectFormTabsItem
        value="входящие данные"
        handler={() => handler("incoming_data")}
      />
      <ProjectFormTabsItem
        value="исходящие данные"
        handler={() => handler("outgoing_data")}
      />
    </div>
  );
};

export default ProjectFormTabs;
