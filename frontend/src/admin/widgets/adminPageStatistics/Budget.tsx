import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid, Paper } from '@mui/material';
import { BarChart } from '@mui/x-charts';

export function Budget(): React.JSX.Element {
  return (
    <Paper sx={{ marginBottom: '30px', padding: '20px' }}>
      <Typography color="text.secondary" variant="h6" marginBottom="20px">
        Budget
      </Typography>
      <Grid>
        <BarChart
          series={[
            { data: [35, 44, 24, 34] },
            { data: [51, 6, 49, 30] },
            { data: [15, 25, 30, 50] },
            { data: [60, 50, 15, 25] },
          ]}
          height={290}
          xAxis={[{ data: ['Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'], scaleType: 'band' }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      </Grid>
    </Paper>
  );
}
