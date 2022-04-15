import React from "react";
import useAuth from "../../hooks/useAuth";
import UserNavListItem from "./user-nav-list-item";
import { useTranslation } from "react-i18next";

const UserNavList = ({ handler, isOpen, handlerBlur }) => {
  const { t } = useTranslation();
  const auth = useAuth();

  const editProfile = () => {
    console.log("editProfile");
  };

  const getVacation = () => {
    console.log("getVacation");
    // navigate("/forgot", { replace: true });
  };

  const onLogOut = () => {
    auth.logOut();
    console.log(" разлогинились ");
  };

  return (
    <div
      className="header__user-nav user-nav"
      tabIndex={0}
      onBlur={() => {
        handlerBlur(false);
      }}
    >
      <div className="user-nav__list">
        <UserNavListItem
          id="user-nav__link--recent"
          handler={handler}
          isOpen={isOpen}
          classIcon="user-nav__link--recent"
          linkList={{
            Недавние: { to: "/" },
          }}
        />
        <UserNavListItem
          id="user-nav__link--star"
          handler={handler}
          isOpen={isOpen}
          classIcon="user-nav__link--star"
          linkList={{
            Избранные: { to: "/starred" },
          }}
        />

        <UserNavListItem
          id="user-nav__link--notify"
          handler={handler}
          isOpen={isOpen}
          classIcon="user-nav__link--notify"
          linkList={{
            Уведомления: { to: "./forgot", handler: getVacation },
          }}
        />
        <UserNavListItem
          handler={handler}
          isOpen={isOpen}
          profile
          id="user-nav__link--profile"
          classIcon="user-nav__link--profile"
          linkList={{
            [t("UserNavList.edit")]: {
              handler: editProfile,
              separator: true,
            },

            [t("UserNavList.request_for_vacation")]: {
              handler: getVacation,
              to: "./",
            },
            [t("UserNavList.log_out")]: {
              handler: onLogOut,
            },
          }}
        />
      </div>
    </div>
  );
};

export default UserNavList;
