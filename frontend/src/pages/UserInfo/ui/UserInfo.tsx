import React from 'react';
import { Typography } from '@mui/material';
import { MapPin, PaintBrush, User } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import PhotoAvatar from '../../PhotoAvatar/ui/PhotoAvatar';
import UserInfoStyle from './UserInfo-style';
import './UserInfo.css';

interface Props {
  photo: string;
  name: string;
  jobTitle: string;
  age: string;
  location: string;
  description: string;
  button: {
    url: string;
    text: string;
  };
}

const UserInfo: React.FC<Props> = ({ photo, name, jobTitle, age, location, description, button }) => {
  let editButton;

  if (button) {
    editButton = (
      <Link to={button.url} className="UserInfo__button">
        <Typography sx={UserInfoStyle.button} className="UserInfo__buttonText">
          <PaintBrush size={24} color="#ffffff" />
          {button.text}
        </Typography>
      </Link>
    );
  }

  return (
    <div className="UserInfo">
      <PhotoAvatar src={photo} alt={name} width={280} height={280} button />
      <Typography sx={UserInfoStyle.name}>{name}</Typography>
      <Typography sx={UserInfoStyle.subText}>{jobTitle}</Typography>
      <div className="UserInfo__info">
        <Typography className="UserInfo__age" sx={UserInfoStyle.subText}>
          <User size={24} color="#030303" />
          {age} года
        </Typography>
        <Typography className="UserInfo__location" sx={UserInfoStyle.subText}>
          <MapPin size={24} color="#030303" />
          {location}
        </Typography>
      </div>
      <Typography className="UserInfo__description" sx={UserInfoStyle.discription}>
        {description}
      </Typography>
      {editButton}
    </div>
  );
};

export default UserInfo;
