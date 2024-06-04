import { Typography } from '@mui/material';
import React from 'react';
import './UserPageCard.css';
import UserPageCardStyle from './UserPageCard-style';
import FormatDate from '../model/FormatDate';

export interface CardProps {
  title: string;
  description?: string;
  logo?: string;
  company: string;
  city: string;
  status: string;
  data: string;
  salary?: {
    min?: number;
    max?: number;
  };
  url: string;
}

interface Props {
  data: CardProps;
}

const UserPageCard: React.FC<Props> = ({ data }) => {
  let salary = 'з/п не указана';

  if (data.salary?.min && data.salary.max) {
    salary = `от ${data.salary.min} до ${data.salary.max} сом`;
  } else if (data.salary?.min) {
    salary = `от ${data.salary.min} сом`;
  } else if (data.salary?.max) {
    salary = `до ${data.salary.max} сом`;
  }

  return (
    <div className="UserPageCard">
      <Typography className="UserPageCard__status" sx={UserPageCardStyle.subText}>
        {data.status}
      </Typography>
      <div className="UserPageCard__logoWrapper">
        <img src={data.logo} alt={data.title} />
      </div>
      <Typography sx={{ ...UserPageCardStyle.titleText, ...UserPageCardStyle.title }}>{data.title}</Typography>
      <Typography sx={{ ...UserPageCardStyle.subText, ...UserPageCardStyle.colorGray }}>
        {data.company}, {data.city}
      </Typography>
      <Typography sx={{ ...UserPageCardStyle.titleText, ...UserPageCardStyle.salary }}>{salary}</Typography>
      <Typography sx={{ ...UserPageCardStyle.subText, ...UserPageCardStyle.date }}>
        Дата: <span className="UserPageCard__date">{new FormatDate(data.data).getFormatDate()}</span>
      </Typography>
      <div className="UserPageCard__btnWrapper">
        <a href="#" className="UserPageCard__btn UserPageCard__btn_connect">
          <Typography sx={UserPageCardStyle.button}>Связаться</Typography>
        </a>
        <a href="#" className="UserPageCard__btn UserPageCard__btn_cencel">
          <Typography sx={UserPageCardStyle.button}>Отозвать</Typography>
        </a>
      </div>
    </div>
  );
};
// <Typography
//   sx={{ ...UserPageCardStyle.subText, ...UserPageCardStyle.colorGray }}
//   className="UserPageCard__date"
// ></Typography>
export default UserPageCard;
