import React from 'react';
import './PotentialEmployeesPageCard.css';
import { API_URL } from '../../../../app/constants/links';
import { useNavigate } from 'react-router-dom';

export interface PotentialEmployeesPageCardProps {
  _id?: string;
  name?: string;
  surname?: string;
  avatar?: string | null;
  preferredJob?: string;
  dateOfBirth?: string;
  country?: string;
  city?: string;
  education?: string;
  workExperience?: {
    fieldOfWork: string;
    duration: string;
  }[];
}

interface Props {
  data: PotentialEmployeesPageCardProps;
}

const PotentialEmployeesPageCard: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/user/${data._id}`);
  };

  if (!data.name || !data.surname) {
    return null;
  }
  const education = data.education ? data.education : 'Не указано';
  const experience = data.workExperience?.reduce((acc, item) => acc + parseFloat(item.duration), 0);
  const workExperience = data.workExperience ? `${experience}` : 'Не указано';
  const image = data.avatar ? API_URL + data.avatar : null;
  const avatar = image ? <img className="PotentialEmployeesPageCard__photo" src={image} alt={data.name} /> : 'Нет фото';

  const birthDate = data.dateOfBirth ? new Date(data.dateOfBirth) : null;
  let age = null;

  if (birthDate) {
    const today = new Date();
    age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  }

  const getYearWord = (years: number): string => {
    if (years % 10 === 1 && years % 100 !== 11) {
      return 'год';
    } else if ([2, 3, 4].includes(years % 10) && ![12, 13, 14].includes(years % 100)) {
      return 'года';
    } else {
      return 'лет';
    }
  };

  return (
    <div className="PotentialEmployeesPageCard__card">
      <div className="PotentialEmployeesPageCard__content">
        <div className="PotentialEmployeesPageCard__photo-wrapper">{avatar}</div>
        <div className="PotentialEmployeesPageCard__info">
          <h5 className="PotentialEmployeesPageCard__name">
            {data.name} {data.surname}
          </h5>
          <span className="PotentialEmployeesPageCard__profession">{data.preferredJob || 'не указано'}</span>

          <div className="PotentialEmployeesPageCard__row">
            <span className="PotentialEmployeesPageCard__age">
              {age !== null ? `${age} ${getYearWord(age)}` : 'Возраст не указан'}
            </span>
            <div className="PotentialEmployeesPageCard__location">
              <span className="PotentialEmployeesPageCard__country">
                {data.country || 'Страна не указана'}, {data.city || 'Город не указан'}
              </span>
            </div>
          </div>
          <div className="PotentialEmployeesPageCard__row">
            <span className="PotentialEmployeesPageCard__education-wrapper">
              Образование: <span className="PotentialEmployeesPageCard__education">{education}</span>
            </span>
            <span className="PotentialEmployeesPageCard__experience-wrapper">
              Опыт работы: <span className="PotentialEmployeesPageCard__experience">{workExperience}</span>
            </span>
          </div>
        </div>
      </div>
      <button className="PotentialEmployeesPageCard__button" onClick={handleProfileClick}>
        Посмотреть профиль
      </button>
    </div>
  );
};

export default PotentialEmployeesPageCard;
