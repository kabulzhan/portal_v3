import React from 'react'
// доп колонка с инфой для компонента positions 
const WindowSubTitle = ({ columns }) => {
  const { col_1, col_2, col_3 } = columns;
  return (
    <div className="modal-grid__header">
      <div className="modal-grid__td">{col_1}</div>
      <div className="modal-grid__td">{col_2}</div>
      <div className="modal-grid__td">{col_3}</div>
    </div>
  );
};

export default WindowSubTitle