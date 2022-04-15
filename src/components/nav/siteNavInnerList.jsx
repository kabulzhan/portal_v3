
import React from 'react'
import { Link } from "react-router-dom";
// выпадающий список
const SiteNavInnerList = ({ mobilMenu, navListOpen, id, list }) => {
  return (
    <div
      className={
        navListOpen === id
          ? "site-nav__inner-list z-index"
          : "site-nav__inner-list"
      }
    >
      {Object.keys(list).map((oneKey, i) => {
        if (list[oneKey].handler) {
          return (
            <div
              onClick={() => {
                list[oneKey].handler();
              }}
              key={i}
              className="site-nav__inner-link"
            >
              {oneKey}
            </div>
          );
        } else {
          return (
            <Link to={list[oneKey].to} key={i} className="site-nav__inner-link">
              {oneKey}
            </Link>
          );
        }
      })}
    </div>
  );
};


export default SiteNavInnerList;

