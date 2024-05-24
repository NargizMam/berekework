import { Typography } from '@mui/material';
import React, { useState } from 'react';
import EmployerCard, { EmployerCardApiData } from '../../../feachers/employerCard/ui/EmployerCard';
import './EmployerBlock.css';
import EmployerBlockStyle from './EmployerBlock-style';

export interface EmployerBlockApiData {
  title: { text: string }[];
  body:  EmployerCardApiData[];
}

interface Props {
  slice: EmployerBlockApiData;
}

const EmployerBlock: React.FC<Props> = ({ slice }) => {
  const [currentRow, setCurrentRow] = useState(5);
  const [currentWrap, setCurrentWrap] = useState(false);
  let button;
  console.log(slice);

  const showMore = () => {
    setCurrentRow((prev) => prev + 5);
    setCurrentWrap(true);
  };

  if (slice?.body.length > 5) {
    button = (
      <div className="EmployerBlock__buttonWrapper">
        <button className="EmployerBlock__button" onClick={showMore}>
          <Typography sx={EmployerBlockStyle.button}>Смотреть еще</Typography>
        </button>
      </div>
    );
  }
  return (
    <>
      <div>
        <Typography sx={EmployerBlockStyle.title}>{slice?.title[0].text}</Typography>
      </div>
      <div
        className="EmployerBlock__flex"
        style={{
          flexWrap: currentWrap ? 'wrap' : 'nowrap',
        }}
      >
        {slice.body.map((data, index) => (
          <EmployerCard key={data.id} data={data} viseble={index >= currentRow ? false : true} />
        ))}
      </div>
      {button}
    </>
  );
};

export default EmployerBlock;
