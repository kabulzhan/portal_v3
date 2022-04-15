import React from "react";
import "./Tasks.css";

const TaskTags = () => {
  return (
    <div className="">
      {" "}
      <div class="my-tasks__data data margin-bottom">
        <span class="data__item data__item--border">
          Я автор <button class="data__button-delete"></button>{" "}
        </span>
        <span class="data__item data__item--border">
          Я ответственный
          <button class="data__button-delete"></button>{" "}
        </span>
        <span class="data__item data__item--border">
          Я исполнитель
          <button class="data__button-delete"></button>{" "}
        </span>
        <button class="data__button-add data__button-add--margin"></button>
      </div>
      <button class="my-tasks__tag tag tag--active">тэг</button>
      <button class="my-tasks__tag tag tag--icon-red">тэг</button>
      <button class="my-tasks__tag tag tag--icon-green">тэг</button>
      <button class="my-tasks__tag tag tag--icon-blue">тэг</button>
      <button class="my-tasks__tag tag tag--icon-yellow">тэг</button>
    </div>
  );
};

export default TaskTags;
