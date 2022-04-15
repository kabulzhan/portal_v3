import React from "react";
import { useLocation } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import TeamListItem from "./TeamListItem";
import TeamListSearchItem from "./TeamListSearchItem";

const TeamList = (props) => {
  const { data } = props;
  let location = useLocation();
  return (
    <div className="team__list">
      {props.children}
      {/* <button  onClick={() => window.props.onOpen(department_window)}> Редактировать </button> */}
      <TeamListSearchItem />
     
      {data.map((emp, i) => {
        return <TeamListItem key={i} {...emp} location={location} />;
      })}
    </div>
  );
};

export default TeamList;
