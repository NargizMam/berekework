import { Typography } from '@mui/material';
import React, { useState } from 'react';
import './EmployerBlock.css';
import EmployerCard from '../../../feachers/employerCard/ui/EmployerCard';

export interface EmployerBlockApiData {
  primary: {
    empltitle: { text: string }[];
  };
  items: {
    emplinfo: { type: string; text: string }[];
    image: { url: string };
    id: string;
  }[];
}

interface Props {
  slice: EmployerBlockApiData;
}

export const EmployerBlock: React.FC<Props> = ({ slice }) => {
  const [currentRow, setCurrentRow] = useState(5);
  const [currentWrap, setCurrentWrap] = useState(false);

  const showMore = () => {
    setCurrentRow((prev) => prev + 5);
    setCurrentWrap(true);
  };

  return (
    <>
      <div>
        <Typography id='our-staff' variant="h3" sx={{ mb: 5, fontWeight: 'bold' }}>
          {slice?.primary.empltitle[0].text}
        </Typography>
      </div>
      <div
        className="EmployerBlock__flex"
        style={{
          flexWrap: currentWrap ? 'wrap' : 'nowrap',
        }}
      >
        {slice.items.slice(0, currentRow).map((employer, index) => (
          <EmployerCard key={index} data={employer} />
        ))}
      </div>
      {slice.items.length > currentRow && (
        <div className="EmployerBlock__buttonWrapper">
          <button className="EmployerBlock__button" onClick={showMore}>
            <Typography>Смотреть еще</Typography>
          </button>
        </div>
      )}
    </>
  );
};
