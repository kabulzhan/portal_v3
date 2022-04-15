import React from 'react'
import TaskListItem from './TaskListItem';

const TaskList = ({list}) => {
  return (
    <ul class="my-tasks__list">
    {list.map((el, i)=> {
        return <TaskListItem task={el} key={i} />;
    })}
     
    </ul>
  );
}

export default TaskList