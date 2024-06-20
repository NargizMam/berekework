import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { User } from '../../../app/types';
import { Employer } from '../../page/employerPanel/model/types';
import React from 'react';
import dayjs from 'dayjs';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
  users: User[];
  employers: Employer[];
}

export const options = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Line Chart - Multi Axis',
    },
  },
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

export const Budget: React.FC<Props> = ({ employers, users }) => {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const initializeCountObject = (labels: string[]) => {
    return labels.reduce(
      (acc, label: string) => {
        acc[label] = 0;
        return acc;
      },
      {} as Record<string, number>,
    );
  };

  const employerCountByMonth = initializeCountObject(labels);
  const userCountByMonth = initializeCountObject(labels);

  employers.forEach((employer) => {
    const month = dayjs(employer.createdAt).format('MMMM');
    if (employerCountByMonth[month] !== undefined) {
      employerCountByMonth[month]++;
    }
  });

  users.forEach((user) => {
    const month = dayjs(user.createdAt).format('MMMM');
    if (userCountByMonth[month] !== undefined) {
      userCountByMonth[month]++;
    }
  });

  const employerCounts = labels.map((label) => employerCountByMonth[label]);
  const userCounts = labels.map((label) => userCountByMonth[label]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Работодатель',
        data: employerCounts,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Соискатель',
        data: userCounts,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };
  return <Line options={options} data={data} />;
};
