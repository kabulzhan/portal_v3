import React, { useState } from "react";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import UserNavLists from "./user-nav-list";
import HeaderSiteNavList from "./header-site-nav-list";
// import { useTranslation } from "react-i18next";

const Nav = ({ window }) => {
  const [navListOpen, setNavListOpen] = useState(false);
  const [mobilMenu, setMobilMenu] = useState(false);
  // const { i18n } = useTranslation();

  const handlerMobilMenu = (value) => {
    if (!value) {
      setMobilMenu(!mobilMenu);
      // console.log(mobilMenu, "mobilMenu");
      setNavListOpen(false);
    } else {
      setMobilMenu(false);
    }
  };
  // const changeLanguage = (language) => {
  //   i18n.changeLanguage(language);
  // };
  const handlerSelectList = (value) => {
    value === navListOpen ? setNavListOpen(false) : setNavListOpen(value);
  };
  const handlerBlur = () => {
    setNavListOpen(false);
    // для закрытия списка при клике на пустую область
  };

  return (
    <header className="header">
      <nav className="header__nav container">
        <div className="header__logo-wrapper">
          <div
            className={
              mobilMenu ? "header__mobile-menu _active" : "header__mobile-menu"
            }
            onClick={() => handlerMobilMenu()}
          >
            <span></span>
          </div>
          <Link className="site-nav__link" to="/">
            <img src={Logo} alt="Лого компании" />
          </Link>
        </div>
        {/* <button onClick={() => changeLanguage("en")}>EN</button> */}
        {/* <button onClick={() => changeLanguage("ru")}>RU</button> */}

        <HeaderSiteNavList
          window={window}
          mobilMenu={mobilMenu}
          navListOpen={navListOpen}
          handlerSelectList={handlerSelectList}
          handlerBlur={handlerBlur}
          handlerMobilMenu={handlerMobilMenu}
        />

        {/* избранные , прошлые действия, уведомления  */}
        <UserNavLists
          handler={handlerSelectList}
          handlerBlur={handlerBlur}
          isOpen={navListOpen}
        />
      </nav>
    </header>
  );
};

export default Nav;
