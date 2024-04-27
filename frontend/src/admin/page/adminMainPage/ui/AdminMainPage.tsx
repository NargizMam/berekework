import { Typography } from '@mui/material';
import { Budget } from '../../../widgets/adminPageStatistics/Budget';
import { TotalProfit } from '../../../widgets/adminPageStatistics/TotalProfit';
import { Traffic } from '../../../widgets/adminPageStatistics/Traffic';
import { TasksProgress } from '../../../widgets/adminPageStatistics/TasksProgress';
import { TotalCustomers } from '../../../widgets/adminPageStatistics/TotalCustomers';


export const AdminMainPage = () => {
  return (
    <>
      <Typography sx={{ margin: 2 }} variant="h4">Общая статистическая информация</Typography>
      <Budget />
      <TotalCustomers />
      <TasksProgress />
      <TotalProfit />
      <Traffic />
    </>

  );
};