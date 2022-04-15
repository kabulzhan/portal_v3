import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import ProjectFormCreateEditBody from "./ProjectFormCreateEditBody";
import {
  companyId,
  url_get_data_create_project,
  url_get_project_edit,
} from "../../../settings/base-url";
import axios from "axios";
import Preloader from "../../../components/preloaders/Preloader";

const ProjectFormCreateEdit = (props) => {
  const { data, onClose } = props;
  const { editable } = data || null; // если редактируем окно, editable - id редактироуемого  проекта

  // то, что я получаю с сервера при построении модалки редактирования - инфа о проекте и все сотрудники и тд
  const [dataForEditProject, setDataForEditProject] = useState(null);
  const auth = useAuth();
  const { t } = useTranslation();
  const translateKey = "Project"; // для перевода
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: auth.token,
  };

// данные с сервера дл построения модалки - список сотрудников и тэги
  const [membersTags, setMembersTags] = useState({
    members: [], // члены команды
    tags: [],
  });

  // для  формы, по id прикрепялются файлы на сервере
  const [formId, setFormId] = useState(Date.now());

  // загрузка данных для создания
  useEffect(() => {
    if (editable) {
      return;
    }
    axios
      .get(url_get_data_create_project, { headers, company_id: companyId })
      .then(
        (res) => {
          setMembersTags({
            members: res.data.result.members,
            tags: res.data.result.tags,
          });
        },
        (error) => {
          console.log(error, "error");
        }
      );
  }, [auth.token]);

  // получаем пред значения о редактируемом проекте
  useEffect(() => {
    // если у нас нет editable - тогда отрабатывает useeffect для  создания модалки
    if (!editable) {
      return;
    }
    const { projectId } = props.data.editable;
    const headers = {
      Authorization: auth.token,
      project_id: projectId,
    };

    axios.get(url_get_project_edit + "/" + projectId, { headers }).then(
      (res) => {
        setDataForEditProject(res.data.result);
      },
      (error) => {
        console.log(error, "error");
      }
    );
  }, [auth.token]);

  const { title, description, members,  } =
    dataForEditProject || {};

  const inputs = {
    title: {
      name: "title_project",
      label: t(`${translateKey}.title`),
      type: "text",
      prev: title || null,
    },
    description: {
      name: "description",
      label: t(`${translateKey}.description`),
      type: "text",
      prev: description || null,
    },
    // участники и роли мультселект
    attendee: {
      name: "attendee",
      label: "",
      // label: t(`${translateKey}.attendee_role`),
      type: "select",
      subType: "tag",
      options: members || membersTags?.members || [],
    },
    // отв и исполнитель
    // prev в селект устанавливается в get def value
    responsible: {
      name: "responsible",
      label: t(`${translateKey}.responsible`),
      type: "select",
      subType: "tag",
      options: members || membersTags?.members || [],
    },
    // исполнитель
    executor: {
      name: "executor",
      // label: "",
      label: t(`${translateKey}.executor`),
      type: "select",
      subType: "tag",
      options: members || membersTags?.members || [],
    },
    deadlines: {
      label: t(`${translateKey}.description`),
      deadline_start: {
        name: "deadline_start",
        placeholder: "Дата начала",
      },
      deadline_end: {
        name: "deadline_end",
        placeholder: "Дата окончания",
      },
    },
    tags: {
      name: "tags",
      label: "",
      // placeholder:'Выбрать тэги',
      // label: t(`${translateKey}.attendee_role`),
      type: "select",
      subType: "tag",
      options: dataForEditProject?.tags || membersTags?.tags ||  [],
    },
  };
// console.log(membersTags?.tags, dataForEditProject?.project_tags);
  return (
    <section className="modal">
      <div className="modal__wrapper">
        <div className="modal__inner">
          <section className="modal__body">
            {/* если  у нас редактирование и данные о редактируемом проекте загрузились */}
            {editable && dataForEditProject && (
              <ProjectFormCreateEditBody
                formId={formId}
                inputs={inputs}
                onClose={onClose}
                // project  data нужна потому что нет доступа к setting формы в getDefValues для установки editable value
                projectData={dataForEditProject}
              />
            )}
            {/* прелоадер когда редактируем проект и данные о проекте не загрузились */}
            {editable && !dataForEditProject && <Preloader />}
            {/* прелоадер когда создаем окно и данные не загрузились */}
            {!membersTags && !editable && <Preloader />}

            {/* когда создаем проект и данные для создания уже загрузились, рисуем компонент */}
            {!editable && membersTags && (
              <ProjectFormCreateEditBody
                formId={formId}
                inputs={inputs}
                onClose={onClose}
              />
            )}
          </section>
        </div>
      </div>
    </section>
  );
};

export default ProjectFormCreateEdit;
