import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectModeratorsCreating } from '../model/moderatorsSlice';
import { createModerator, getAllModerators } from '../api/moderatorsThunk';
import { Moderator } from '../../../../types';

interface Props {
  close: () => void;
}

const initialState = {
  name: '',
  email: '',
  password: '',
};

export const ModeratorsForm: React.FC<Props> = ({ close }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectModeratorsCreating);
  const [state, setState] = useState<Moderator>(initialState);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { name, email, password } = state;
    setIsFormValid(name.trim() !== '' && email.trim() !== '' && password.trim() !== '');
  }, [state]);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(createModerator(state)).unwrap();
    dispatch(getAllModerators());
    setState(initialState);
    close();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Создайте модератора
        </Typography>
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Имя"
                name="name"
                required
                autoComplete="current-username"
                value={state.name}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="E-mail"
                name="email"
                type="email"
                required
                autoComplete="current-username"
                value={state.email}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Пароль"
                type="password"
                required
                value={state.password}
                onChange={inputChangeHandler}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <LoadingButton
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#0866FF', borderRadius: '30px' }}
            disabled={!isFormValid}
          >
            Создать
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};
