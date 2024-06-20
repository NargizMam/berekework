import { Paper, Typography } from '@mui/material';
import { TotalCustomers } from '../../../widgets/adminPageStatistics/TotalCustomers';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectEmployersLoading, selectEmployers } from '../../employerPanel/model/employerSlice';
import { selectUsers } from '../../../../feachers/user/usersSlice';
import { useEffect } from 'react';
import { getAllEmployer } from '../../employerPanel/api/employerThunk';
import { getAllUser } from '../../../../feachers/user/usersThunk';
import { Budget } from '../../../widgets/adminPageStatistics/Budget';
import { Loader } from '../../../../shared/loader';
import { selectVacancies } from '../../../../feachers/vacancy/vacancySlice';
import { getAllVacancy } from '../../../../feachers/vacancy/vacancyThunk';
import { VacancyStatistics } from '../../../widgets/adminPageStatistics/VacancyStatistics';

export const AdminMainPage = () => {
  const employers = useAppSelector(selectEmployers);
  const users = useAppSelector(selectUsers);
  const vacancies = useAppSelector(selectVacancies);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectEmployersLoading);

  useEffect(() => {
    dispatch(getAllEmployer());
    dispatch(getAllUser());
    dispatch(getAllVacancy());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Typography sx={{ margin: 2 }} variant="h4">
        Общая статистическая информация
      </Typography>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px 0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <TotalCustomers employers={employers} users={users} />
        </Box>
        <Typography sx={{ margin: 1 }} variant="h5">Работодатели и соискатели</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Budget employers={employers} users={users} />
        </Box>
        <Typography sx={{ margin: 1 }} variant="h5">Вакансии</Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
          <VacancyStatistics vacancies={vacancies}/>
        </Box>
      </Paper>
    </>
  );
};
