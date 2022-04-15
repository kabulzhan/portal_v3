import React from "react";
import ResultItem from "./ResultItem";
import ResultTextareaBlock from "./ResultTextareaBlock";

const ProjectFormResult = ({
  setResult,
  results,
  initEditableResult,
  editedItemResult,
  deleteResult,
}) => {
  return (
    <>
      <h3 className="modal__subtitle">Результат</h3>
      <ol className="modal__list modal-list">
        {results.length > 0 &&
          results.map((res, ind) => {
            return (
              <ResultItem
                item={res}
                ind={ind}
                initEditableResult={initEditableResult}
                deleteResult={deleteResult}
              />
            );
          })}
        {/*  */}
      </ol>
      {/* поле ввода для добавления результата */}
      <ResultTextareaBlock
        editedItemResult={editedItemResult}
        results={results}
        setResult={setResult}
      />
    </>
  );
};

export default ProjectFormResult;
