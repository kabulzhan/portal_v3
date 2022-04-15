import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SiteNavInnerList from "./siteNavInnerList";
import {
  department_window,
  project_window,
  position_window,
} from "../../settings/window-types";

const HeaderSiteNavList = ({
  mobilMenu,
  navListOpen,
  handlerSelectList,
  handlerBlur,
  handlerMobilMenu,
  window,
}) => {
  const { t } = useTranslation();
  //  заглушка под обработчик событий для перехода в шапке профиля по ссылкам, не испольуется
  const handlerLink = () => {
    console.log("handlerLink");
  };
  return (
    <div
      tabIndex={1}
      onBlur={() => {
        handlerBlur();
      }}
      className={
        mobilMenu
          ? "header__site-nav site-nav _active"
          : "header__site-nav site-nav"
      }
    >
      <Link
        onClick={() => handlerMobilMenu("close")}
        className="site-nav__link"
        to="/team"
      >
        {t("HeaderSiteNavList.team")}
      </Link>
      <Link
        onClick={() => handlerMobilMenu("close")}
        className="site-nav__link"
        to="/projects"
      >
        {t("HeaderSiteNavList.projects")}
      </Link>
      <Link
        onClick={() => handlerMobilMenu("close")}
        className="site-nav__link"
        to="/tasks"
      >
        {t("HeaderSiteNavList.tasks")}
      </Link>
      <div
        data-menu
        className={
          (mobilMenu || navListOpen) === "settings"
            ? "site-nav__list _active"
            : "site-nav__list"
        }
      >
        <span
          className="site-nav__link"
          onClick={!mobilMenu ? () => handlerSelectList("settings") : null}
        >
          {t("HeaderSiteNavList.settings")}
        </span>
        <SiteNavInnerList
          mobilMenu={mobilMenu}
          navListOpen={navListOpen}
          id="settings"
          list={{
            [t("SiteNavInnerList_1.manage_department")]: {
              // открыть окно с списком отделов
              handler: () => window.props.onOpen(department_window),
            },
            [t("SiteNavInnerList_1.manage_position")]: {
              // открыть окно с списком должностей
              handler: () => window.props.onOpen(position_window),
              // to: "./",
            },
          }}
        />
      </div>
      <button onClick={()=>{window.props.onOpen(project_window)} }>+</button>
      <div
        data-menu
        className={
          mobilMenu || navListOpen === "links"
            ? "site-nav__list _active"
            : "site-nav__list"
        }
      >
        <span
          className="site-nav__link"
          onClick={!mobilMenu ? () => handlerSelectList("links") : null}
          tabIndex={1}
          onBlur={() => {
            handlerBlur();
          }}
        >
          {t("HeaderSiteNavList.links")}
        </span>

        <SiteNavInnerList
          mobilMenu={mobilMenu}
          navListOpen={navListOpen}
          id="links"
          list={{
            Ссылки: { handler: handlerLink },
            "Главная страница": { handler: handlerLink, to: "./" },
            Тэги: { handler: handlerLink, to: "./" },
            "Управление должностями": { to: "./" },
          }}
        />
      </div>

      <Link
        onClick={() => handlerMobilMenu("close")}
        className="site-nav__link"
        to="/contacts"
      >
        {t("HeaderSiteNavList.contankts")}
      </Link>
    </div>
  );
};

export default HeaderSiteNavList;
