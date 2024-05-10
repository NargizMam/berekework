import React from 'react';

interface Props {
  text: string;
}

const FooterCopyrightAdmin:React.FC <Props> = ({text}) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
};

export default FooterCopyrightAdmin;