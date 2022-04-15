import React  from "react";
import Avatar from "../../assets/images/userpic.png";
import { Link } from "react-router-dom";

const UserNavListItem = ({
  id,
  handler,
  isOpen,
  linkList,
  classIcon,
  profile,
}) => {

  const basicClass = profile
    ? "user-nav__item user-nav__item--profile"
    : "user-nav__item";
  return (
    <div
      key={id}
      data-menu
      className={isOpen === id ? basicClass + " _active" : basicClass}
    >
      {/* закрыть список */}
      <div
        onClick={() => {
          handler(id);
        }}
        className={`${"user-nav__link " + classIcon}`}
        // to="./login"
      >
        {profile && (
          <img alt="avatar" className="user-nav__userpic" src={Avatar} />
        )}
      </div>

      <div
        className={
          isOpen === id
            ? "user-nav__inner-list z-index"
            : "user-nav__inner-list"
        }
      >
        <>
          {Object.keys(linkList).map((oneKey, i) => {
            if (linkList[oneKey].handler) {
              return (
                <div key={i}>
                  <div
                    onClick={() => {
                      linkList[oneKey].handler();
                    }}
                    className="user-nav__link"
                  >
                    {oneKey}
                  </div>
                  {linkList[oneKey].separator && (
                    <span className="separator"></span>
                  )}
                </div>
              );
            } else {
              return (
                <Link
                  to={linkList[oneKey].to}
                  key={linkList[oneKey]}
                  className="user-nav__link"
                >
                  {oneKey}
                </Link>
              );
            }
          })}
        </>
      </div>
    </div>
  );
};
export default UserNavListItem;