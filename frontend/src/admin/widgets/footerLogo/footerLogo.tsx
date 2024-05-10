import React from 'react';
import { API_URL } from '../../../app/constants/links';

interface Props {
  image: File | null;
}

const FooterLogo: React.FC<Props> = ({image}) => {
  const cardImage = API_URL + '/logoFooter/' + image;

  console.log(cardImage);

  return (
    <div style={{ width: '250px', margin: '50px 0' }}>
      <img src={cardImage} title="logo" alt="logo"/>
    </div>
  );
};

export default FooterLogo;