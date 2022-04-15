import React  from "react";
// import MentionMulty from "../../components/chat/Chat";
import ProjectList from "./project-list/ProjectList";

const Projects = (props) => {
  return (
    <main>
      <ProjectList props={props} />
    </main>
  );
};

export default Projects;
