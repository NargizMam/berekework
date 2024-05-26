import React, { ChangeEvent, FormEvent, useState } from 'react';
import { RegisterMutation } from '../model/types';
import { Box, Button, Grid, TextField, InputAdornment, IconButton, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectRegisterError, selectRegisterLoading } from '../model/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import {  useGoogleLogin } from '@react-oauth/google';
import { googleAuth, register } from '../api/AuthThunk';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const RegisterPage = () => {
  const [state, setState] = useState<RegisterMutation>({
    name: '',
    surname: '',
    email: '',
    password: '',
    avatar: null,
  });
  const [alignment, setAlignment] = useState('jobSearch');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const loading = useAppSelector(selectRegisterLoading);

  const changeFields = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAlignment = (newAlignment: string) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const submitFormHandler = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(register(state)).unwrap();
    navigate('/');
  };

  const googleLoginHandler = async (tokenResponse: any) => {
    const credential = tokenResponse.credential;
    await dispatch(googleAuth(credential)).unwrap();
    navigate('/');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const googleLogin = useGoogleLogin({
    onSuccess: googleLoginHandler,
    onError: () => console.log('Login failed!'),
  });

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
          Регистрация
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={(_, newAlignment) => handleAlignment(newAlignment)}
          aria-label="Platform"
          sx={{
            marginBottom: 2,
            padding: 1,
            overflow: 'hidden',
            '& .MuiToggleButton-root': {
              border: 'none',
              '&.Mui-selected': {
                backgroundColor: 'white',
                color: 'black',
              },
              '&:not(.Mui-selected)': {
                backgroundColor: '#E9E9E9',
                color: 'black',
              },
            },
          }}
        >
          <ToggleButton value="jobSearch" sx={{ borderRadius: '30px'}}>Поиск работы</ToggleButton>
          <ToggleButton value="employeeSearch" sx={{ borderRadius: '30px' }}>Поиск сотрудников</ToggleButton>
        </ToggleButtonGroup>

        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Имя"
                name="name"
                value={state.name}
                onChange={changeFields}
                autoComplete="given-name"
                error={Boolean(getFieldError('name'))}
                helperText={getFieldError('name')}
                InputProps={{
                  style: { borderRadius: '30px' },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Фамилия"
                name="surname"
                value={state.surname}
                onChange={changeFields}
                autoComplete="family-name"
                error={Boolean(getFieldError('surname'))}
                helperText={getFieldError('surname')}
                InputProps={{
                  style: { borderRadius: '30px' },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={state.email}
                onChange={changeFields}
                autoComplete="new-email"
                error={Boolean(getFieldError('email'))}
                helperText={getFieldError('email')}
                InputProps={{
                  style: { borderRadius: '30px' },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Пароль"
                type={showPassword ? 'text' : 'password'}
                value={state.password}
                onChange={changeFields}
                autoComplete="new-password"
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
                InputProps={{
                  style: { borderRadius: '30px' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <LoadingButton
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#FFD700', borderRadius: '30px' }}
          >
            Войти
          </LoadingButton>
          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: '#4285F4', color: 'white', borderRadius: '30px', mt: 2 }}
            onClick={() => googleLogin()}
          >
            Войти с помощью Google
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
