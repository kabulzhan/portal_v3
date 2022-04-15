import React from "react";
import { Link } from "react-router-dom";
import logo from "./userpic.png";

const TeamListItem = ({
  id,
  first_name,
  last_name,
  status,
  email,
  contacts_phone,
  position,
  department,
  data,
  location,
}) => {
  return (
    <div className="team__card team-card">
      <div className="team-card__info">
        <span className="team-card__position">
          {(position && position) || "Без должности"}
          <span className="team-card__slash">/</span>
          <span className="team-card__position">
            {(department && department) || "Отдел не назначен"}
          </span>
        </span>
      </div>

      <div className="team-card__user-wrapper">
        <img className="team-card__userpic" src={logo} alt="" />
        <Link
          state={{ backgroundLocation: location }}
          to={{
            pathname: `/team/users/${id}`,
          }}
        >
          <span className="team-card__username">
            {last_name} {first_name}
          </span>
          <p className="team-card__status">
            {(status && status) || "Статус не указан"}
          </p>
        </Link>
      </div>
      <a href="mailto:Under-attack@mail.ru" className="team-card__mail">
        <span className="social-link social-link--mail"></span>
        <span className="team-card__social-text">{email}</span>{" "}
      </a>
      <a href="tel:+79533125120" className="team-card__phone">
        <span className="social-link social-link--phone"></span>
        {/* <span className="team-card__social-text">+7 953 312 51 23</span> */}

        <span className="team-card__social-text">{contacts_phone}</span>
      </a>
      <div>
        {/* <a
          href={() => false}
          className="team-card__social-link social-link social-link--twi"
        ></a>
        <a
          href={() => false}
          className="team-card__social-link social-link social-link--insta"
        ></a>
        <a
          href={() => false}
          className="team-card__social-link social-link social-link--fb"
        ></a> */}
      </div>
    </div>
  );
};

export default TeamListItem;
