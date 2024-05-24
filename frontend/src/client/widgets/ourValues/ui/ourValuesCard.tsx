import React from 'react';
import './ourValues.css';

interface Props {
  title: string;
  text: string;
  icon: {
    alt: string;
    url: string;
  };
}

const OurValuesCard: React.FC<Props> = ({title, text, icon}) => {
  return (
    <div className='ourValuesCard'>
      <div className='ourValuesImgFrame'>
        <img src={icon.url} alt={icon.alt}/>
      </div>
      <p className='ourValuesCardTitle'>{title}</p>
      <p className='ourValuesCardText'>{text}</p>
    </div>
  );
};

export default OurValuesCard;