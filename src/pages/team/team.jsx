import React from "react";
import TeamHeader from "./team-header";
import { Outlet } from "react-router-dom";

const Team = (props) => {
  return (
    <main>
      <TeamHeader window={props.window} />
      {/* то что показывает вложенные роуты ,  работает криво  */}
      <Outlet />
    </main>
  );
};

export default Team;
