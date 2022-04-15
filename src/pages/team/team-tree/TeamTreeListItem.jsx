import React from 'react';
import logo from "./userpic.png";
import { Link } from "react-router-dom";

const TeamTreeListItem = ({ item, location }) => {
  let children = null;
  if (item.employees && item.employees.length) {
    children = (
      <ul>
        {item.employees.map((i) => (
          <TeamTreeListItem item={i} key={i.id} location={location} />
        ))}
      </ul>
    );
  }

  return (
    <>
      {item.last_name && (
        <li className="team-tree__item">
          <div className="team-tree__card team-tree-card">
            {/* <a className="team-tree-card__link" href="#link-to-profile"></a> */}
            <img className="team-tree-card__userpic" src={logo} alt="" />
            <div className="team-tree-card__info">
              {item.last_name && (
                <Link
                  state={{ backgroundLocation: location }}
                  to={{
                    pathname: `/team/departments/${item.id}`,
                  }}
                  className="team-tree-card__username"
                >
                  {item.last_name + " "}
                  {item.first_name}
                </Link>
              )}

              {/* {item.last_name && (
                <p className="team-tree-card__username">
                  {item.last_name + " "}
                  {item.first_name}
                </p>
              )} */}

              <span className="team-tree-card__position">{item.position}</span>
              <span className="team-tree-card__status team-tree-card__status--fired">
                {item.comments}
                Собирается в отпуск
              </span>
            </div>
          </div>
        </li>
      )}
      {children && <li className="team-tree__item">{children}</li>}
    </>
  );
};

export default TeamTreeListItem;
