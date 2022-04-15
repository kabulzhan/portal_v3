import React from 'react'
import WindowHeaderAdd from './WindowHeaderAdd';
import WindowItemDeleteEdit from './WindowItemDeleteEdit';
// переиспользуемый контейнер модального окна, доработать

const WindowList = (props) => {
const { list, onDelete, onEdit, onClose, onAdd } = props;

  return (
    <section className="modal">
      {props.children}
      <div className="modal__wrapper">
        <div className="modal__inner">
          <section className="modal__body">
            <WindowHeaderAdd
              addDepartment
              title="Должность"
              //   title={t("TeamHeader.depatrments")}
                onClose={onClose}
                onAdd={onAdd}
            />
            <div className="modal__grid modal-grid modal-grid--three">
              {props.children}

              {list?.map((item, i) => (
                <WindowItemDeleteEdit
                  key={i}
                  item={item}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
              {/* <WindowItemDeleteEdit /> */}
            </div>
          </section>
        </div>
      </div>
    </section>

  );
};

export default WindowList
