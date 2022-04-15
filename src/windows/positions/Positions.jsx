import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import {
  url_get_positions_list,
  companyId,
  url_post_new_positions,
  url_put_positions,
} from "../../settings/base-url";
import WindowList from "../../components/window/WindowList";
import { useTranslation } from "react-i18next";
import WindowHeaderAdd from "../../components/window/WindowHeaderAdd";
import PositionFormCreateEdit from "./PositionFormCreateEdit";
import { initSocket } from "../../settings/sockets";
import Preloader from "../../components/preloaders/Preloader";
import WindowSubTitle from "../../components/window/WindowSubTitle";

const axios = require("axios");

const Positions = (props) => {
  // настройки
  const auth = useAuth();
  const { t } = useTranslation();
  const translateKey = "Positions"; // для перевода
  const socket = initSocket(auth.token);
  // поле формы
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: auth.token,
  };
  // список должностей и статус загпузки
  const [infoIsLoad, setInfoIsLoad] = useState({
    positions: null,
    loaded: false,
  });
  //предыдущее значение навания должности
  const [prevPositionData, setPrevPositionData] = useState(null);
  // статус модального окна
  const [modalAddEdit, setModalAddEdit] = useState({
    isOpen: false,
    action: null,
  });

  useEffect(() => {
    socket.on("position_changed", (data, action) => {
      // после изменений на сервере меняем стейт локально
      const updateState = (data, action) => {
        // добавим должность в список стейта
        const getStateAfterAdding = (prev, data) => {
          return {
            positions: [...prev.positions, data],
            loaded: false,
          };
        };
        // заменяем название должности
        const getStateAfterEditing = (prev, newItem) => {
          const ind = prev.positions.findIndex(({ id }) => id === newItem.id);
          return {
            positions: [
              ...prev.positions.slice(0, ind),
              newItem,
              ...prev.positions.slice(ind + 1),
            ],
            loaded: false,
          };
        };
        const getStateAfterDeleting = (prev) => {
          return {
            loaded: false,
            positions: prev.positions.filter((item) => item.id !== data.id),
          };
        };

        switch (action) {
          case "added":
            setInfoIsLoad((prev) => getStateAfterAdding(prev, data));
            break;
          case "edited":
            setInfoIsLoad((prev) => getStateAfterEditing(prev, data));
            break;
          case "deleted":
            setInfoIsLoad((prev) => getStateAfterDeleting(prev, data));
            break;
          default:
        }
      };
      updateState(data, action);
    });
  }, []); // как правильно указывать тут зависимости?

  // список должностей , вход в комнату
  useEffect(() => {
    socket.emit("add_to_room", "positions_list");
    axios
      .get(url_get_positions_list, {
        headers,
      })
      .then(
        (res) => {
          setInfoIsLoad({ loaded: true, positions: res.data.positions });
        },
        (error) => {
          console.log(" информация не загрузилась", error);
        }
      );
  }, [auth.token]);

  // вызов модального окна для добавления должности
  const handlerAdd = () => {
    setModalAddEdit({ isOpen: true, action: "add" });
  };
  // настройка для полей формы название должности
  const title = {
    name: "title",
    icon: true,
    placeholder:
      modalAddEdit.action === "edit"
        ? t(`${translateKey}.title_edit`)
        : t(`${translateKey}.title_create`),
    label: t(`${translateKey}.label_title`),
    type: "text",
  };
  const inputs = { title: { ...title } };
  // отправляем data о новом отделе на сервер, закрываем модалку создания
  const addNewPosition = (data) => {
    const { title } = data;
    let body = {
      row: {
        company_id: companyId,
        title: title,
      },
    };

    axios.post(url_post_new_positions, body, { headers }).then(
      (res) => {
        console.log("Добавили должность ", res);
        onCloseAddModal();
      },
      (err) => {
        console.log(err, "  ошибка при добавлении должности ");
      }
    );
  };

  const handlerDelete = (data) => {
    fetch("http://80.78.248.55:3212/api/positions/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify({ position_id: data.id }),
    })
      .then((res) => res.json())
      .then((res) => console.log(" delete sucseccful ", res));
  };
  // закрыть окно создания-редактирования
  const onCloseAddModal = () => {
    setModalAddEdit({ isOpen: false, action: null });
    // setInfoIsLoad(false);
    setPrevPositionData(null);
  };
  // отправим на сервер измененные данные
  const sendEditPosition = (data) => {
    let body = {
      row: {
        company_id: companyId,
        title: data.title,
      },
      position_id: prevPositionData.id,
    };
    axios.put(url_put_positions, body, { headers }).then(
      (res) => {
        console.log("отредактировали отдел ");
        onCloseAddModal();
      },
      (err) => {
        console.log(err, "ошибка при редактировании тдела ");
      }
    );
  };
  // срабатывает на кнопку отправить в форме (submit)
  const sendDataForm = (data) => {
    switch (modalAddEdit.action) {
      case "add":
        return addNewPosition(data);
      case "edit":
        return sendEditPosition(data);
      default:
        return addNewPosition(data);
    }
  };

  // получить редактируемую должность при клике на карандаш, вызвать модалку редактирования
  const handlerEdit = (data) => {
    setPrevPositionData(data);
    setModalAddEdit({ isOpen: true, action: "edit" });
  };
  // при клике на крестик модалки с списком  => вышли из комнаты
  const handlerCloseWindow = () => {
    socket.emit("leave_room", "positions_list");
    props.onClose();
  };

  if (infoIsLoad) {
    return (
      <>
        {(modalAddEdit.action === "edit" || modalAddEdit.action === "add") && (
          <section className="modal">
            <div className="modal__wrapper">
              <div className="modal__inner modal__inner--medium">
                <section className="modal__body">
                  <WindowHeaderAdd
                    addDepartment
                    title="Создание должности"
                    //   title={t("TeamHeader.depatrments")}
                    onClose={onCloseAddModal}
                  />
                  <PositionFormCreateEdit
                    infoIsLoad={infoIsLoad}
                    prevData={prevPositionData} //  данные с сервера об отделе
                    action={modalAddEdit.action === "add" ? "add" : "edit"}
                    inputs={inputs} // поля hook forms
                    onClose={onCloseAddModal}
                    onCreate={sendDataForm}
                  />
                </section>
              </div>
            </div>
          </section>
        )}
        {!modalAddEdit.isOpen && (
          <WindowList
            list={infoIsLoad.positions}
            onClose={handlerCloseWindow}
            onAdd={handlerAdd}
            onEdit={handlerEdit}
            onDelete={handlerDelete}
          >
            <WindowSubTitle
              columns={{
                col_1: t(`${translateKey}.position`),
                col_2: t(`${translateKey}.employees`),
              }}
            />
          </WindowList>
        )}
      </>
    );
  } else {
    return <Preloader />;
  }
};

export default Positions;
