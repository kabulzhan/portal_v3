import React from 'react';

const TeamListSearchItem = () => {
  return (
    <div className="team__card team-card team-card--work">
      <a href="#link" className="team-card__link"></a>
      <span className="team-card__state person-state">Поиск сотрудника</span>
      <span className="team-card__position">Дизайнер</span>
      <span className="team-card__group">Отдел</span>
      <span className="team-card__date">С 15 сентября</span>
      <span className="team-card__pay">до 90 000 рублей</span>
    </div>
  );
};

export default TeamListSearchItem;
