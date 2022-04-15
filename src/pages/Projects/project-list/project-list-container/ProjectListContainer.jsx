import React, { useEffect, useState } from "react";
import Preloader from "../../../../components/preloaders/Preloader";
import useAuth from "../../../../hooks/useAuth";
import { url_get_project_list } from "../../../../settings/base-url";
import { project_window } from "../../../../settings/window-types";
import ProjectListItem from "./ProjectListItem";

const axios = require("axios");

const ProjectListContainer = ({ window }) => {
  const [projects, setProjects] = useState(null);

  const auth = useAuth();
  const headers = {
    Authorization: auth.token,
  };

  // список проектов
  useEffect(() => {
    axios.get(url_get_project_list, { headers }).then(
      (res) => {
        setProjects(res.data.result);
      },
      (error) => {
        console.log(error, "error");
      }
    );
  }, [auth.token]);

  return (
    <>
      {!projects && <Preloader />}
      {projects && (
        <div className="project-list__cards">
          {projects?.map(
            (item, i) => (
              <ProjectListItem
                key={i}
                item={item}
                onEdit={() => {
                  window.props.onEdit(project_window, item);
                }}
              />
            )
            // (item, i) =>
            //   item.id == 43 && (
            //     <ProjectListItem
            //       key={i}
            //       item={item}
            //       onEdit={() => {
            //         window.props.onEdit(project_window, item);
            //       }}
            //     />
            //   )
          )}
        </div>
      )}
    </>
  );
};

export default ProjectListContainer;
