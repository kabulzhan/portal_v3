import React from 'react'

const ProjectListTabs = () => {
  return (
    <div className="project-list__tabs tabs-xl">
      <a className="tabs-xl__link tabs-xl__link--active" href="#">
        Актуальные <span className="tabs-xl__value">9</span>{" "}
      </a>
      <a className="tabs-xl__link" href="#">
        С проблемами <span className="tabs-xl__value">2</span>{" "}
      </a>
      <a className="tabs-xl__link" href="#">
        Запланирован <span className="tabs-xl__value">3</span>{" "}
      </a>
      <a className="tabs-xl__link" href="#">
        В работе <span className="tabs-xl__value">7</span>{" "}
      </a>
      <a className="tabs-xl__link" href="#">
        Завершен <span className="tabs-xl__value">7</span>{" "}
      </a>
      <a className="tabs-xl__link" href="#">
        Все <span className="tabs-xl__value">12</span>
      </a>
    </div>
  );
}

export default ProjectListTabs