import { Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Budget } from '../../../widgets/adminPageStatistics/Budget';
import { TotalProfit } from '../../../widgets/adminPageStatistics/TotalProfit';
import { Traffic } from '../../../widgets/adminPageStatistics/Traffic';
import { TasksProgress } from '../../../widgets/adminPageStatistics/TasksProgress';
import { TotalCustomers } from '../../../widgets/adminPageStatistics/TotalCustomers';


export const AdminMainPage = () => {
  return (
    <>
      <Paper style={{ padding: '20px', margin: '20px', flex: 1 }}>
        <Typography sx={{ margin: 2 }} variant="h5">Общая статистическая информация</Typography>
        <Grid container spacing={3}>
          <Grid lg={3} sm={6} xs={12}>
            <Budget />
          </Grid>
          <Grid lg={3} sm={6} xs={12}>
            <TotalCustomers />
          </Grid>
          <Grid lg={3} sm={6} xs={12}>
            <TasksProgress />
          </Grid>
          <Grid lg={3} sm={6} xs={12}>
            <TotalProfit />
          </Grid>
          <Grid lg={4} md={6} xs={12}>
            <Traffic />
          </Grid>
          <Grid lg={8} md={12} xs={12}>
          </Grid>
        </Grid>
      </Paper>
    </>

  );
};