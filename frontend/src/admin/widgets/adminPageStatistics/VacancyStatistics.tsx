import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { VacancyApiData } from '../../../app/types';
import React from 'react';
import dayjs from 'dayjs';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
  vacancies: VacancyApiData[];
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

export const VacancyStatistics: React.FC<Props> = ({ vacancies }) => {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const initializeCountObject = (labels: string[]) => {
    return labels.reduce(
      (acc, label: string) => {
        acc[label] = 0;
        return acc;
      },
      {} as Record<string, number>,
    );
  };

  const userCountByMonth = initializeCountObject(labels);

  vacancies.forEach((vacancy) => {
    const month = dayjs(vacancy.createdAt).format('MMMM');
    if (userCountByMonth[month] !== undefined) {
      userCountByMonth[month]++;
    }
  });

  const vacancyCount = labels.map((label) => userCountByMonth[label]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Вакансии',
        data: vacancyCount,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };
  return <Line options={options} data={data} />;
};
