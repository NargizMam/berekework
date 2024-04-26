import { Typography } from '@mui/material';
import React, { useState } from 'react';
import EmployerCard, { EmployerCardApiData } from '../../../feachers/employerCard/ui/EmployerCard';
import './EmployerBlock.css';
import EmployerBlockStyle from './EmployerBlock-style';

export interface EmployerBlockApiData {
  title: string;
  employers: EmployerCardApiData[];
  location: string;
}

interface Props {
  data: EmployerBlockApiData;
}

const EmployerBlock: React.FC<Props> = ({ data }) => {
  const [currentRow, setCurrentRow] = useState(5);
  const [currentWrap, setCurrentWrap] = useState(false);
  let button;

  const showMore = () => {
    setCurrentRow((prev) => prev + 5);
    setCurrentWrap(true);
  };

  if (data.employers.length > 5) {
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
        <Typography sx={EmployerBlockStyle.title}>{data.title}</Typography>
      </div>
      <div
        className="EmployerBlock__flex"
        style={{
          flexWrap: currentWrap ? 'wrap' : 'nowrap',
        }}
      >
        {data.employers.map((data, index) => (
          <EmployerCard key={data._id} data={data} viseble={index >= currentRow ? false : true} />
        ))}
      </div>
      {button}
    </>
  );
};

export default EmployerBlock;
