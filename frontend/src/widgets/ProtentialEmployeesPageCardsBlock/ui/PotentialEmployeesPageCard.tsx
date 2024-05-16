import './PotentialEmployeesPageCard.css';

export interface PotentialEmployeesPageCardProps {
  _id?: string;
  name: string;
  photo?: string;
  profession: string;
  age: number;
  country: string;
  city: string;
  education?: string;
  experience?: number;
}

interface Props {
  data: PotentialEmployeesPageCardProps;
}

const PotentialEmployeesPageCard: React.FC<Props> = ({ data }) => {
  const education = data.education ? data.education : null;
  const experience = data.experience ? `${data.experience} года` : null;
  const photo = data.photo ? (
    <img className="PotentialEmployeesPageCard__photo" src={data.photo} alt={data.name} />
  ) : null;

  return (
    <div className="PotentialEmployeesPageCard__card">
      <div className="PotentialEmployeesPageCard__content">
        <div className="PotentialEmployeesPageCard__photo-wrapper">{photo}</div>
        <div className="PotentialEmployeesPageCard__info">
          <h5 className="PotentialEmployeesPageCard__name">{data.name}</h5>
          <span className="PotentialEmployeesPageCard__profession">{data.profession}</span>

          <div className="PotentialEmployeesPageCard__row">
            <span className="PotentialEmployeesPageCard__age">{data.age} года</span>
            <div className="PotentialEmployeesPageCard__location">
              <span className="PotentialEmployeesPageCard__country">
                {data.country}, {data.city}
              </span>
            </div>
          </div>
          <div className="PotentialEmployeesPageCard__row">
            <span className="PotentialEmployeesPageCard__education-wrapper">
              Образование: <span className="PotentialEmployeesPageCard__education">{education}</span>
            </span>
            <span className="PotentialEmployeesPageCard__experience-wrapper">
              Опыт работы: <span className="PotentialEmployeesPageCard__experience">{experience}</span>
            </span>
          </div>
        </div>
      </div>
      <button className="PotentialEmployeesPageCard__button">Сохранить изменения</button>
    </div>
  );
};

export default PotentialEmployeesPageCard;
