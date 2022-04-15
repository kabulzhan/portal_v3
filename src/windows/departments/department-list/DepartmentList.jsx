import React  from "react";
import DepartmentItem from "./DepartmentItem";

const DepartmentList = ({ departments, onEdit, onDelete }) => {

    return (
      <>
        {departments?.map((item, i) => (
          <DepartmentItem
            key={i}
            item={item}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
        {/* {showWarningDelete && (
          <BeforeDeleteWarning
            agree={() => startDelete()}
            refuse={cancelDelete}
          />
        )} */}
      </>
    );
};

export default DepartmentList;
