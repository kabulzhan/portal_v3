import React from 'react'

const TaskPagination = () => {
  return (
    <div class="my-tasks__pagination pagination">
      <button
        class="pagination__button pagination__button--prev"
        disabled="disabled"
      ></button>
      <button class="pagination__item pagination__item--active">1</button>
      <button class="pagination__item">2</button>
      <button class="pagination__item">3</button>
      <button class="pagination__item">4</button>
      <button class="pagination__item">5</button>
      <button class="pagination__button pagination__button--next"></button>
    </div>
  );
}

export default TaskPagination