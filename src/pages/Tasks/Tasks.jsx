import React, { useEffect } from "react";
import TaskList from "./TaskList";
import TaskTags from "./TaskTags";
import useAuth from "../../hooks/useAuth";
import { url_get_tasks_list, companyId } from "../../settings/base-url";
import TaskPagination from "./TaskPagination";

const axios = require("axios");

const Tasks = () => {
  const auth = useAuth();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: auth.token,
  };



  const list = [
    {
      id: 1,
      title: "Task_1",
      project_id: 1,
      parent_task_id: null,
      status: "1",
      executor_id: 1,
      creator_id: 1,
      responsible_id: 1,
      responsible_first_name: "Nash",
      responsible_last_name: "Jon редактируемый ",
      locked: 0,
      started: 1,
      finished: 1,
      date_created: "2022-03-15T18:09:33.000Z",
      date_finish: "2000-12-23T00:00:00.000Z",
      date_start: "2000-12-23T00:00:00.000Z",
      description: "task descriptions",
    },
    {
      id: 1,
      title: "Task_2",
      project_id: 1,
      parent_task_id: null,
      status: "1",
      executor_id: 1,
      creator_id: 1,
      responsible_id: 1,
      responsible_first_name: "Nash",
      responsible_last_name: "Jon редактируемый ",
      locked: 0,
      started: 1,
      finished: 1,
      date_created: "2022-03-15T18:09:33.000Z",
      date_finish: "2000-12-23T00:00:00.000Z",
      date_start: "2000-12-23T00:00:00.000Z",
      description: "task descriptions",
    },
  ];
  // получаем списки отделов, сотрудников для отображения selectов
  useEffect(() => {
    axios
      .get(url_get_tasks_list, {
        headers,
      })
      .then(
        (res) => {
          console.log(res.data);
        },
        (error) => {
          console.log(error, "error");
        }
      );
  }, [auth.token]);

  return (
    <main>
      <section className="my-tasks">
        <div class="my-tasks__container container">
          <h2 class="my-tasks__title">Мои задачи</h2>
          <div class="my-tasks__row">
            <div class="my-tasks__tabs tabs-xl">
              <a class="tabs-xl__link tabs-xl__link--active" href="#">
                Актуальные <span class="tabs-xl__value">9</span>{" "}
              </a>
              <a class="tabs-xl__link" href="#">
                С проблемами <span class="tabs-xl__value">2</span>{" "}
              </a>
              <a class="tabs-xl__link" href="#">
                Запланирован <span class="tabs-xl__value">3</span>{" "}
              </a>
              <a class="tabs-xl__link" href="#">
                В работе <span class="tabs-xl__value">7</span>{" "}
              </a>
              <a class="tabs-xl__link" href="#">
                Завершен <span class="tabs-xl__value">7</span>{" "}
              </a>
              <a class="tabs-xl__link" href="#">
                Все <span class="tabs-xl__value">12</span>
              </a>
            </div>
            <TaskTags />
            <TaskList list={list}/>
          </div>
        </div>
        <TaskPagination />
     
      </section>
    </main>
  );
};

export default Tasks;
