export interface CardProps {
  name: string;
  photo: string;
  profession: string;
  iconAge: string;
  iconLocation: string;
  age: number;
  country: string;
  city: string;
  education?: string;
  experience?: number;
  button: string;
}

interface Props {
  data: CardProps;
}

const ProtentialEmployeesPageCard: React.FC<Props> = ({ data }) => {
  const education = data.education ? data.education : null;
  const experience = data.experience ? data.experience : null;

  return (
    <div className="ProtentialEmployeesPageCard__container">
      <div className="ProtentialEmployeesPageCard__content">
        <div className="ProtentialEmployeesPageCard__photo-wrapper">
          <img className="ProtentialEmployeesPageCard__photo" src={data.photo} alt={data.name} />
        </div>
        <div className="ProtentialEmployeesPageCard__info">
          <h5 className="ProtentialEmployeesPageCard__name">{data.name}</h5>
          <p className="ProtentialEmployeesPageCard__name">{data.profession}</p>

          <div className="ProtentialEmployeesPageCard__row">
            <div className="ProtentialEmployeesPageCard__details-wrapper">
              <span className="ProtentialEmployeesPageCard__age">{data.iconAge}</span>
              <span className="ProtentialEmployeesPageCard__age">{data.age}</span>
            </div>

            <div className="ProtentialEmployeesPageCard__details-wrapper">
              <span className="ProtentialEmployeesPageCard__age">{data.iconLocation}</span>
              <span className="ProtentialEmployeesPageCard__age">{data.country}</span>
              <span className="ProtentialEmployeesPageCard__age">{data.city}</span>
            </div>
          </div>

          <div className="ProtentialEmployeesPageCard__row">
            <p className="ProtentialEmployeesPageCard__education-wrapper">
              Образование: <span className="ProtentialEmployeesPageCard__age">{education}</span>
            </p>

            <p className="ProtentialEmployeesPageCard__experience-wrapper">
              Опыт работы: <span className="ProtentialEmployeesPageCard__age">{experience}</span>
            </p>
          </div>
        </div>
      </div>
      <button className="ProtentialEmployeesPageCard__button">{data.button}</button>
    </div>
  );
};

export default ProtentialEmployeesPageCard;
