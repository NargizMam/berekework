import Typography from '@mui/material/Typography';
import { Grid, Paper } from '@mui/material';
import { PieChart } from '@mui/x-charts';


export function TotalCustomers() {

  return (
    <Paper sx={{marginBottom: '30px', padding: '20px'}}>
      <Typography color="text.secondary" variant="h6" marginBottom="20px">
        Customers
      </Typography>
      <Grid display="flex">
        <Grid>
          <Typography marginBottom="10px">New customers</Typography>
          <PieChart
            series={[
              {
                data: [
                  {id: 0, value: 10, label: 'Employers'},
                  {id: 1, value: 15, label: 'Applicants'},
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </Grid>
        <Grid>
          <Typography marginBottom="10px">Lost</Typography>
          <PieChart
            series={[
              {
                data: [
                  {id: 1, value: 30, label: 'Employers'},
                  {id: 2, value: 25, label: 'Applicants'},
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </Grid>

      </Grid>
    </Paper>
  );
}
