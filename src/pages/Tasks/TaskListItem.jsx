import React from 'react'
import { formatDateWithDots } from '../../components/calendar-form/CalendarForm';

const TaskListItem = ({task}) => {
  const { title, date_finish, date_start } = task;
  return (
    <li class="my-tasks__item">
      <div class="my-tasks__info">
        <a class="my-tasks__task-link" href="#">
          {title}
        </a>
        <a class="my-tasks__project-link" href="#">
          Название проекта
        </a>
        {/* <span class="my-tasks__date">
          {formatDateWithDots(date_start)} - {formatDateWithDots(date_finish)}
        </span> */}
      </div>
      <div class="my-tasks__term term">
        <span class="term__item"> {formatDateWithDots(date_start)}</span> -
        <span class="term__item term__item--deadline">
          {formatDateWithDots(date_finish)}
        </span>
      </div>
    </li>
  );
}

export default TaskListItem