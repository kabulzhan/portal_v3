import React from "react";
// import ProjectListFilter from "./project-list-filter/ProjectListFilter";
import ProjectListTabs from "./project-list-tabs/ProjectListTabs";
import ProjectListContainer from "./project-list-container/ProjectListContainer";
import { project_window } from "../../../settings/window-types";

const ProjectList = ({ props }) => {
  return (
    <div className="project-list__container container">
      <section className="project-list__header">
        <button
          className="project-list__button"
          onClick={() => props.window.props.onOpen(project_window)}
        >
          Добавить проект
        </button>
        <br />
        <button
          onClick={() =>
            props.window.props.onEdit(project_window, { projectId: 43 })
          }
          className="project-list__button"
        >
          Отредактировать проект
        </button>
      </section>
      <ProjectListTabs />
      {/* <ProjectListFilter /> */}
      <ProjectListContainer {...props} />
    </div>
  );
};

export default ProjectList;
