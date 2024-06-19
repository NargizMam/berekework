import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Box from '@mui/material/Box';
import { Employer } from '../../page/employerPanel/model/types';
import { User } from '../../../app/types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  employers: Employer[];
  users: User[];
}

export const TotalCustomers: React.FC<Props> = ({ employers, users }) => {
  const data = {
    labels: ['Соискатель', 'Работодатель'],
    datasets: [
      {
        label: 'Колличество',
        data: [employers.length, users.length],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      sx={{
        width: '500px',
      }}
    >
      <Pie data={data} />
    </Box>
  );
};
