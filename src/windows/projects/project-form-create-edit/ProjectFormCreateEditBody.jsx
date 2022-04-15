import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import EmployeesFormCol from "../../../components/employees/employees-form/EmployeesFormCol";
import useAuth from "../../../hooks/useAuth";
import SelectInput from "../../../components/form/form-select/SelectInput";
import SelectMulty from "../../../components/form/select/SelectMulty";
import ProjectFormTabs from "./ProjectFormTabs";
import CalendarForm, {
  getFormatCalendarData,
} from "../../../components/calendar-form/CalendarForm";
import TextEditor from "../../../components/text-editor/TextEditor";
import ModalBottom from "../../../components/modals/modal-bottom";
import {
  url_patch_remove_files,
  url_post_created_project,
  companyId,
  userId,
  url_put_projects_edit,
  url_post_add_files,
} from "../../../settings/base-url";
import ProjectFormResult from "./project-form-result/ProjectFormResult";
import DragFileList from "../../../components/drag-field/DragFileList";
import ModalHeader from "../../../components/modals/modal-header";

const axios = require("axios");
const schemaCreateEmployees = yup.object().shape({
  // first_name: yup.string().required(),
});
/**
 * TODO: исправить рендер 3 раза вместо двух
 */

// устанавливаем значение полей пострудников, принад. проекту, массив всех сотрудников и принад.  проекту должен быть одним и тем же
const getPrevEmployees = (data) => {
  const mainAndOwn = [...data.members, ...data.project_members];

  // найти тех сотрудников в списке свободных, которые принадлежат отделу
  // id в двух массивах могут быть одинаковыми, сравниваем по имени тоже
  let defaultMulty = mainAndOwn.filter((el) =>
    data.project_members.some(
      (el2) =>
        el2.id === el.id &&
        el2?.last_name === el?.last_name &&
        el2?.first_name === el?.first_name
    )
  );
  return formatOptions(defaultMulty);
};

const formatTags = (arr) => {
  return arr.map((el) => {
    return {
      label: el.name,
      value: el.name,
      color: el.color,
      id: el?.tag_id || el.id,
    };
  });
};
// получить предыдущие тэги
const getPrevTags = (main, own) => {
  const mainAndOwn = [...main, ...own];
  // найти те items в списке общих, которые были присвоены ранее
  let defaultMulty = mainAndOwn.filter((el) =>
    own.some(
      (el2) =>
        el2.id === el.id && el2?.name === el?.name && el2?.color === el?.color
    )
  );
  return formatTags(defaultMulty);
};
const getDefValues = (prevData) => {
  const {
    members,
    responsible_first_name,
    responsible_last_name,
    responsible_id,
    executor_id,
    executor_first_name,
    executor_last_name,
    project_tags,
    tags,
  } = prevData || {};
  // эти поля долдны совпадать с настройками в пропсах формы
  // в value даем id руководителя, которые ждет от нас сервер
  return {
    // нельзя ставить null обычному input ругается консоль
    title_project: "",
    description: "",
    // участники
    attendee: members ? getPrevEmployees(prevData) : [],
    responsible: responsible_id
      ? {
          label: responsible_first_name
            ? responsible_first_name + " " + responsible_last_name
            : " не назначен",
          // в value даем id руководителя, которые ждет от нас сервер
          value: responsible_id || "",
        }
      : "",
    // исполнитель
    executor: executor_id
      ? {
          label: executor_first_name
            ? executor_first_name + " " + executor_last_name
            : " не назначен",
          // в value даем id руководителя, которые ждет от нас сервер
          value: executor_id || "",
        }
      : "",
    tags: project_tags ? getPrevTags(tags, project_tags) : [],
  };
};

// форматируем для мультиселекта
const formatOptions = (arr) => {
  return arr.map((el) => {
    return {
      label: el.first_name + " " + el.last_name,
      value: el.first_name + " " + el.last_name,
      id: el.id,
    };
  });
};

const ProjectFormCreateEditBody = ({
  onClose,
  inputs,
  projectData,
  formId,
}) => {
  const auth = useAuth();
  const translateKey = "Project"; // для перевода
  const { t } = useTranslation();
  // поле описание - храним выделение жирным, курсивом и тд
  const [textFormat, setTextFormat] = useState(null);
  // заблокированные участники и роли
  const [locked, setLocked] = useState(false);
  // цели проекта в графе результат
  const [results, setResults] = useState(
    projectData?.project_goals ? [...projectData?.project_goals] : []
  );
  // колонка результата при редактировании
  const [editedItemResult, setEditedItemResult] = useState(null);
  // зеленые вкладки,  открываются по клику на них
  const [formTabs, setFormTabs] = useState({
    result: true,
    deadlines: true,
    tags: true,
    incoming_data: true,
    outgoing_data: true,
  });
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: auth.token,
  };
  // прикрепленыые файлы проекта, если редактируем
  const { project_files } = projectData || {};
  console.log(projectData, "projectData");
  // флаг перетягивания файлов
  const [drag, setDrag] = useState(false);
  // список  файлов, которые мы загрузили. он же выводится в списке загруженных
  const [fileList, setFileList] = useState(project_files || []);
  // файлы, которые во время редактирования были удалены, массив с ними отправим при отправке общей формы
  const [deletedFiles, setDeletedFiles] = useState([]);
  // настройки формы
  const {
    control,
    formState: { isValid },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schemaCreateEmployees),
    mode: "onChange",
    defaultValues: getDefValues(projectData),
  });

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  // при отпускании
  const onDragLeave = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  // при отпускании когда загружаем файлы  или  при  выборе из диалога
  const onSubmitFiles = (e) => {
    e.preventDefault();
    setDrag(false);

    let files = e.target.files ? e.target.files : [...e?.dataTransfer?.files];
    // задаем  id в конце имени (для сервера)  test.doc = test_1646143921028.doc.
    const addFileNameId = (file) => {
      let arr = file.name.split(".");
      let newFileName = arr[0] + "_" + Date.now() + "." + arr[arr.length - 1];
      return newFileName;
    };

    const formData = new FormData();
    let uniqueNameFileList = []; // массив id файлов
    for (const file of files) {
      // задаем уникальное имя
      let uniqueName = addFileNameId(file);
      formData.append("files", file, uniqueName);
      uniqueNameFileList.push({
        file: uniqueName,
        project_id: projectData?.id || null,
      });
    }
    formData.append("form_id", formId);
    if (projectData?.id) {
      formData.append("project_id", projectData.id || null);
      console.log(projectData.id, "projectData.id onSubmitFiles");
    }
    setFileList((prev) => [...prev, ...uniqueNameFileList]);
    axios
      .post(url_post_add_files, formData, {
        headers: {
          Authorization: auth.token,
        },
      })
      .then(
        (res) => console.log(res, "file was downloaded"),
        (err) => {
          console.log(err, "error");
        }
      );
  };
  // добавим колонку результата
  const handlerAddResult = (value, resultId) => {
    // если есть id значит нудно отредачить существующую колонку результата
    if (!resultId) {
      setResults((prev) => [...prev, value]);
    } else {
      const getEditedState = (arr, newItem) => {
        const ind = arr.findIndex(({ id }) => id === newItem.id);
        return [...arr.slice(0, ind), newItem, ...arr.slice(ind + 1)];
      };
      setResults((prev) => getEditedState(prev, value));
      setEditedItemResult(null);
    }
  };
  // назначим редактируемый результат
  const initEditableResult = (value) => {
    console.log("initEditableResult", value);
    setEditedItemResult(value);
  };
  // удалить строку результата
  const deleteResult = (value) => {
    const getEditedState = (arr, newItem) => {
      const ind = arr.findIndex(({ id }) => id === newItem.id);
      return [...arr.slice(0, ind), ...arr.slice(ind + 1)];
    };
    setResults((prev) => getEditedState(prev, value));
  };
  // открыть-закрыть  дополнительные поля формы результат теги и тд
  const handlerTab = (tab) => {
    let item = { ...formTabs };
    let value = (item[`${tab}`] = !formTabs[`${tab}`]);
    setFormTabs(item, value);
  };

  // отправим на сервер данные формы при создании
  const onSubmitCreate = (data) => {
    // executor_id - ид-исполнителя,
    // responsible_id - ответственного,
    // project_members - массив сотрудников(нужен массив, даже, если 1 сотрудник)

    const body = {
      row: {
        title: data?.title_project || null,
        creator_id: userId,
        description: textFormat,
        company_id: companyId,
        locked: locked,
        date_start: data.deadline_start
          ? getFormatCalendarData(data.deadline_start)
          : null,
        date_finish: data?.deadline_end
          ? getFormatCalendarData(data.deadline_end)
          : null,
        executor_id: data?.executor?.value || null,
        responsible_id: data?.responsible?.value || null,
      },
      project_members: data?.attendee
        ? data.attendee.map((a) => {
            return { employee_id: a.id };
          })
        : [],
      project_tags: data?.tags
        ? data.tags.map((a) => {
            return { tag_id: a.id };
          })
        : [],
      form_id: formId,
      project_goals:
        results?.map((res) => {
          return { type: res.type, description: res.description };
        }) || [],
    };
    axios
      .post(url_post_created_project, body, {
        headers,
      })
      .then(
        (res) => {
          console.log(res, "res onSubmitCreate");
          onClose();
        },
        (error) => {
          console.log(error, "error  onSubmitCreate");
        }
      );
  };

  // отправим на сервер данные формы при редактировании
  const onSubmitEdit = (data) => {
    // executor_id - ид-исполнителя,
    // responsible_id - ответственного,
    // project_members - массив сотрудников(нужен массив, даже, если 1 сотрудник)
    const {
      description,
      project_goals,
      responsible_id,
      executor_id,
      date_finish,
      project_members,
      title,
      date_start,
      id,
    } = projectData || {};
    console.log(data, projectData);

    const body = {
      project_id: id,
      row: {
        title: data?.title_project || title || null,
        creator_id: userId,
        description: textFormat || description,
        company_id: companyId,
        locked: locked,
        date_start: data.deadline_start
          ? getFormatCalendarData(data.deadline_start)
          : date_start || null,
        date_finish: data?.deadline_end
          ? getFormatCalendarData(data.deadline_end)
          : date_finish || null,
        executor_id: data?.executor?.value || executor_id || null,
        responsible_id: data?.responsible?.value || responsible_id || null,
      },
      project_members: data?.attendee
        ? data.attendee.map((a) => {
            return { employee_id: a.id };
          })
        : project_members || [],
      project_goals:
        results?.map((res) => {
          return { type: res.type, description: res.description };
        }) ||
        project_goals ||
        [],
      project_tags: data?.tags
        ? data.tags.map((a) => {
            return { tag_id: a.id };
          })
        : [],
      deleted_files: deletedFiles || [],
      form_id: formId,
    };

    axios
      .put(url_put_projects_edit, body, {
        headers,
      })
      .then(
        (res) => {
          onClose();
          console.log(res, "res onSubmitEdit");
        },
        (error) => {
          console.log(error, "error  onSubmitEdit");
        }
      );
  };

  // при редактировании выявляем новые файлы, которые были загружены на сервер,  но нажали отмена - удаляем эти файлы с сервера
  const shouldBeRemoved = (project_files, all) => {
    let removeArr = all.filter((service) =>
      project_files.every((item) => item.file !== service.file)
    );
    return [...removeArr];
  };

  // при клике на отмену при созд/ ред. формы - для удаления с сервера файлов, кот не должны висеть без прикрепленной формы
  const removeFilesFromServer = (fileList) => {
    // если создание и есть список файлов
    if (!projectData?.id && fileList.length > 0) {
      const body = {
        form_id: formId,
        files: [...fileList],
      };
      axios
        .patch(url_patch_remove_files, body, {
          headers: {
            Authorization: auth.token,
          },
        })
        .then(
          (res) => console.log(res, "files has remowed"),
          (err) => {
            console.log(err, "error");
          }
        );
    } else {
      //  если редактирвоание и есть список добавленных файлов,  еще не прикрепленных к проекту
      let shouldBeRemovedList = shouldBeRemoved(project_files, fileList);
      if (shouldBeRemovedList.length > 0) {
        const body = {
          project_id: projectData.id,
          files: shouldBeRemoved(project_files, fileList).map((el) => el.file),
        };
        axios
          .patch(url_patch_remove_files, body, {
            headers: {
              Authorization: auth.token,
            },
          })
          .then(
            (res) => console.log(res, "files has remowed"),
            (err) => {
              console.log(err, "error");
            }
          );
      }
    }
  };

  // удаляем один файл при клике на крестик
  const removeFile = (file) => {
    // если есть project id - делаем сравнение, удаляемый файл был прикреплен к проекту? если да, запишем его в отдельный массив deleted_files  и отправим на сервер в поле body при отправке всей формы, если нет - делаем запрос на удаление этого файла, как при обычном удалении
    const { project_id } = file || {};

    if (project_id) {
      const { project_id, ...fileData } = file;

      let shouldBeRemovedList = shouldBeRemoved(project_files, fileList);
      if (shouldBeRemovedList.length > 0) {
        const body = {
          form_id: formId,
          project_id: project_id,
          files: shouldBeRemovedList.map((el) => el.file),
        };
        axios
          .patch(url_patch_remove_files, body, {
            headers: {
              Authorization: auth.token,
            },
          })
          .then(
            () => console.log("files has remowed"),
            (err) => {
              console.log(err, "error");
            }
          );
      } else {
        setDeletedFiles((prev) => [
          ...prev,
          { file_name: fileData.file, id: fileData.id },
        ]);
      }
    } else {
      const body = {
        form_id: formId,
        project_id: project_id || null,
        files: [file].map((el) => el.file),
      };
      axios
        .patch(url_patch_remove_files, body, {
          headers: {
            Authorization: auth.token,
          },
        })
        .then(
          () => console.log("files has remowed"),
          (err) => {
            console.log(err, "error");
          }
        );
    }
    setFileList(fileList.filter((item) => item !== file));
  };

  const handlerClose = (e) => {
    e.preventDefault();
    onClose();
    removeFilesFromServer(fileList);
  };
  const {
    title,
    description,
    attendee,
    responsible,
    executor,
    deadlines,
    tags,
  } = inputs;

  return (
    <>
      <ModalHeader
        title={
          projectData
            ? t(`${translateKey}.title_edit`)
            : t(`${translateKey}.title_create`)
        }
        onClose={handlerClose}
      />
      <form
        onDragStart={(e) => dragStartHandler(e)}
        onDragOver={(e) => dragStartHandler(e)}
        onDragLeave={(e) => onDragLeave(e)}
        onDrop={(e) => (drag ? onSubmitFiles(e) : null)}
        onSubmit={handleSubmit(projectData ? onSubmitEdit : onSubmitCreate)}
      >
        {/* название  */}
        <EmployeesFormCol
          setValue={setValue}
          prev={title.prev}
          key={1 + 200}
          input={title}
          control={control}
          settings={title}
          name={title.name}
        />
        {/* описание  */}
        <TextEditor
          prev={description.prev}
          sendFormat={setTextFormat}
          name={description.name} // name нужно для настройки react hook form
          height={114}
          addFiles={(files) => setFileList((prev) => [...prev, ...files])}
          projectId={projectData?.id}
          formId={formId}
          onSubmitFiles={onSubmitFiles}
        />
        {/* список загруженных файлов */}
        {fileList.length > 0 && (
          <DragFileList list={fileList} onRemoveFile={removeFile} />
        )}

        {/* Участники и роли */}
        <div className="modal__subtitle-wrapper">
          <h3 className="modal__subtitle">Участники и роли</h3>
          <div
            onClick={() => setLocked(!locked)}
            className="modal__controls modal__controls--lock"
          ></div>
        </div>
        <SelectMulty
          item={attendee}
          control={control}
          options={formatOptions([...attendee.options])}
        />
        {/* ответсвенный и исполнитель */}
        <div className="modal__row modal__row--start">
          <div className="modal__col">
            <div className="dropdown"></div>{" "}
            <SelectInput
              control={control}
              data={responsible}
              // для отображения в выпадашке
              value="first_name"
              value2="last_name"
            />
          </div>

          <div className="modal__col">
            <div className="dropdown"></div>{" "}
            <SelectInput
              control={control}
              data={executor}
              // для отображения в инпуте
              value="first_name"
              value2="last_name"
            />
          </div>
        </div>
        {/* сроки результат и тд вкладкиб разворачивающиеся  при клике */}
        <ProjectFormTabs handler={handlerTab} tabs={formTabs} />
        {/* результат */}
        {formTabs.result && (
          <ProjectFormResult
            tab="result"
            results={results}
            setResult={handlerAddResult}
            initEditableResult={initEditableResult}
            editedItemResult={editedItemResult}
            deleteResult={deleteResult}
          />
        )}
        {/* сроки  */}
        {formTabs.deadlines && (
          <>
            <h3 className="modal__subtitle">{deadlines.label}</h3>
            <div className="modal__row modal__row--start date-range">
              <CalendarForm
                data={deadlines.deadline_start}
                control={control}
                prev={projectData?.date_start}
              />
              <CalendarForm
                data={deadlines.deadline_end}
                control={control}
                prev={projectData?.date_finish}
              />
            </div>
          </>
        )}
        {/* тэги */}
        {formTabs.tags && (
          <>
            <h3 className="modal__subtitle">Тэги</h3>
            <SelectMulty
              item={tags}
              control={control}
              options={formatTags([...tags.options])}
            />
          </>
        )}
        <ModalBottom
          isValid={isValid}
          action={projectData ? "edit" : "create"}
          onCreate={handleSubmit(projectData ? onSubmitEdit : onSubmitCreate)}
          onClose={handlerClose}
        />
      </form>
    </>
  );
};

export default ProjectFormCreateEditBody;
