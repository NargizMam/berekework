import Typography from '@mui/material/Typography';
import { Grid, Paper } from '@mui/material';
import { BarChart } from '@mui/x-charts';

export function TotalProfit() {
  return (
    <Paper sx={{ marginBottom: '30px', padding: '20px' }}>
      <Typography color="text.secondary" variant="h6" marginBottom="20px">
        Total profit
      </Typography>
      <Grid>
        <BarChart
          series={[{ data: [35] }, { data: [51] }, { data: [15] }, { data: [60] }]}
          height={290}
          xAxis={[{ data: ['Сентябрь'], scaleType: 'band' }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      </Grid>
    </Paper>
  );
}
