import React, { useState } from "react";
// import SelectMulty from "../../components/form/select/SelectMulty";
// import FileList from "../form/FileList";
// import SelectMultyWihoutOptions from "../form/select/SelectMultyWihoutOptions";
// import DragFileList from "./DragFileList";
// import { Controller, useController, useForm } from "react-hook-form";
// import { url_post_add_files } from "../../settings/base-url";
import useAuth from "../../hooks/useAuth";

/**
 * 
 TODO: рабочий компонент - поле для перетягивания файлов для вставки в форму , пока не исп, 

 */
const axios = require("axios");

const DragField = (props) => {
  const { prev, formId, addFiles, projectId, onSubmitFiles } = props;
  const auth = useAuth();
  const [drag, setDrag] = useState(false);
  // const [dragFileList, setDragFileList] = useState([]);

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  // при отпускании
  const onDragLeave = (e) => {
    e.preventDefault();
    setDrag(false);
  };


  return (
    <div>
      {drag ? (
        <section
          className="modal__row drag-drop"
          onDragStart={(e) => dragStartHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDragLeave={(e) => onDragLeave(e)}
          onDrop={(e) => onSubmitFiles(e)}
        >
          <label className="drag-drop__label" for="upload"></label>
          <input
            className="drag-drop__input"
            type="file"
            id="upload"
            multiple="multiple"
          />
          <p className="drag-drop__text">Файлы загружаем</p>
        </section>
      ) : (
        <section
          className="modal__row drag-drop"
          onDragStart={(e) => dragStartHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDragLeave={(e) => onDragLeave(e)}
        >
          <label className="drag-drop__label" for="upload"></label>
          <input
            className="drag-drop__input"
            type="file"
            id="upload"
            multiple="multiple"
            onChange={onSubmitFiles}
          />
          <p className="drag-drop__text">
            Перетяните файлы
            <br />
            или кликните, чтобы выбрать
          </p>
        </section>
      )}
      {/* {fileList.length > 0 && (
          <DragFileList
            list={fileList}
            onRemoveFile={onRemoveFile}
          />
        )} */}
    </div>
  );
};

export default DragField;
