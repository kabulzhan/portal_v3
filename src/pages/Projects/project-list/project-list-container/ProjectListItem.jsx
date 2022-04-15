import React, { useState } from "react";
import { formatDateWithDots } from "../../../../components/calendar-form/CalendarForm";
import ReactHtmlParser from "react-html-parser";
import "./ProjectListItem.css";
// const rawContentState = convertToRaw(editorState.getCurrentContent());
/**
 * TODO: поправвить формат календаря и description 
 * @param {*}
 * @returns
 */

const ProjectListItem = ({ item }) => {
  const {
    project_goals,
    date_start,
    date_finish,
    description,
    status,
    title,
    project_tags,
  } = item;

// var xmlString = "<b> <i>привет </i></b>";
  return (
    <div className="project-list__card project-card">
      <div className="project-card__header">
        <span className="project-card__date">
          {date_start && formatDateWithDots(date_start)} -{" "}
          {date_finish && formatDateWithDots(date_finish)}
        </span>
        <span className="project-card__status project-card__status--red">
          В работе
        </span>
      </div>
      <p className="project-card__title">{title}</p>
      {/* format--description - класс для того, чтобы было видно форматирование через тэги  */}
      <p className="project-card__description format--description">
        {ReactHtmlParser(description)}
      </p>
      <span className="project-card__staff">Ответственный</span>
      <div className="project-card__user">
        <img
          className="project-card__userpic"
          src="assets/images/userpic.png"
          alt=""
        />
        <span className="project-card__username">Никита Родин</span>
      </div>
      <div>
        {project_tags?.map((item, i) => (
          <span key={i} className="project-card__tag tag">
            {item.name}
          </span>
        ))}
      </div>
      <ul className="project-card__hover-list">
        {/* <div style={{ padding: 5, border: "1px solid black" }} onClick={onEdit}>
          {" "}
          Edit{" "}
        </div> */}
        {/* <a href="#link" className="project-card__link"></a> */}
        <li className="project-card__hover-item">
          <p className="project-card__title">Цели проекта</p>
          <p className="project-card__title">{title} </p>
          <p className="project-card__title">{status}status </p>
          {/* <div className="project-card__header">
            <div className="project-card__user project-card__user--no-margin">
              <img
                className="project-card__userpic"
                src="assets/images/userpic.png"
                alt=""
              />
              <span className="project-card__username">Никита Родин</span>
            </div>
            <div className="project-card__done">Готово</div>
          </div> */}

          {project_goals?.map((item, i) => (
            <p key={i}>{item.description}</p>
          ))}
          <p>Тут цели проекта </p>
        </li>
      </ul>
    </div>
  );
};

export default ProjectListItem;
