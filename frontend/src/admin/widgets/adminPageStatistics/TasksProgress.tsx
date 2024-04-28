import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid, Paper } from '@mui/material';
import { BarChart } from '@mui/x-charts';


export function TasksProgress(): React.JSX.Element {
  const chartSetting = {
    xAxis: [
      {
        label: 'Progress (%)',
      },
    ],
    width: 500,
    height: 400,
  };
  const dataset = [
    {
      progress: 21,
      month: 'Jan',
    },
    {
      progress: 28,
      month: 'Fev',
    },
    {
      progress: 41,
      month: 'Mar',
    },
    {
      progress: 73,
      month: 'Apr',
    },
    {
      progress: 99,
      month: 'May',
    },
    {
      progress: 80,
      month: 'June',
    },
    {
      progress: 11,
      month: 'July',
    },
    {
      progress: 16,
      month: 'Aug',
    },
    {
      progress: 25,
      month: 'Sept',
    },
    {
      progress: 55,
      month: 'Oct',
    },
    {
      progress: 48,
      month: 'Nov',
    },
    {
      progress: 25,
      month: 'Dec',
    },
  ];

  const valueFormatter = (value: number | null) => `${value}mm`;
  return (
    <Paper sx={{marginBottom: '30px', padding: '20px'}}>
      <Typography color="text.secondary" variant="h6" marginBottom='20px'>
        Task progress
      </Typography>
      <Grid>
        <BarChart
          dataset={dataset}
          yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
          series={[{ dataKey: 'progress', valueFormatter }]}
          layout="horizontal"
          {...chartSetting}
        />
      </Grid>
    </Paper>
  );
}
