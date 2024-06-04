import PotentialEmployeesPageCard from './PotentialEmployeesPageCard';
import './PotentialEmployeesPageCardsBlock.css';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectUsers, selectUsersLoading } from '../../../../feachers/user/usersSlice';
import React, { FormEvent, useEffect, useState } from 'react';
import { getAllUser } from '../../../../feachers/user/usersThunk';
import { Loader } from '../../../../shared/loader';
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export interface PotentialEmployeesCardsBlockTitleApiData {
  primary: {
    titletext: string;
  };
}

interface Props {
  slice: PotentialEmployeesCardsBlockTitleApiData;
}

export const PotentialEmployeesPageCardsBlock: React.FC<Props> = ({ slice }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const isLoading = useAppSelector(selectUsersLoading);
  const [prof, setProf] = useState('');

	useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
	
	console.log('users', users);

  const searchHandle = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(getAllUser(prof));
  };

  if (isLoading) {
    return (
      <div className="PotentialEmployeesPageCardsBlock__container">
        <Loader />;
      </div>
    );
  }

  return (
    <div className="PotentialEmployeesPageCardsBlock__container">
      <h2 className="PotentialEmployeesPageCardsBlock__title">{slice.primary.titletext}</h2>
      <form onSubmit={searchHandle}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0 15px',
          margin: '15px 0',
        }}>
          <TextField
            fullWidth
            value={prof}
            onChange={event => setProf(event.target.value)}
            autoComplete="new-email"
            placeholder="Frontend developer...."
            InputProps={{
              style: { borderRadius: '30px' },
            }}
          />
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            sx={{ py: 2, backgroundColor: '#FFD700', borderRadius: '30px' }}
          >
            Искать
          </LoadingButton>
        </Box>
      </form>
      {users.length === 0 ? (
        <p className="PotentialEmployeesPageCardsBlock__subtitle-no-cards">Нет сотрудников для отображения</p>
      ) : (
        <div className="PotentialEmployeesPageCardsBlock__cards">
          {users.map((user) => (
            <PotentialEmployeesPageCard key={user._id} data={user} />
          ))}
        </div>
      )}
    </div>
  );
};
