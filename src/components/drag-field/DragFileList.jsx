import React from "react";
// удаляем id в имени у файлов 
const cutIdInName = (name) => {
  let arr = name.split("_");
  let arr2 = arr[1].split(".");
  return [arr[0], arr2[1]].join(".");
};
const DragFileListItem = ({ file, onDelete }) => {
  return (
    <div className="attach__item">
      <div className="attach__image attach__image--xls"></div>
      <span> {cutIdInName(file.file) }</span>
      <div
        className="attach__button-delete"
        onClick={() => {
          onDelete(file);
        }}
      ></div>
    </div>
  );
};

// список загруженных файлов, отображаем под описанием
const DragFileList = ({ list, onRemoveFile }) => {
  return (
    <div className="chat__attach attach">
      {list.map((file, ind) => {
        return (
          <DragFileListItem file={file} onDelete={onRemoveFile} key={ind} />
        );
      })}
    </div>
  );
};

export default DragFileList;
