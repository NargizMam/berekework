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

export const AdminMainPage = () => {
  const employers = useAppSelector(selectEmployers);
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectEmployersLoading);

  useEffect(() => {
    dispatch(getAllEmployer());
    dispatch(getAllUser());
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Budget employers={employers} users={users} />
        </Box>
      </Paper>
    </>
  );
};
