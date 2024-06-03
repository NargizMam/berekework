import React, { ChangeEvent, FormEvent, useState } from 'react';
import { RegisterMutation } from '../model/types';
import { Box, Grid, TextField, InputAdornment, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectRegisterError, selectRegisterLoading } from '../model/AuthSlice';
import { register } from '../api/AuthThunk';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  surname: '',
  email: '',
  password: '',
  avatar: null,
};

const UserRegisterForm = () => {
  const [state, setState] = useState<RegisterMutation>(initialState);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const loading = useAppSelector(selectRegisterLoading);
  const navigate = useNavigate();

  const changeFields = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
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
        sx={{ my: 3, py: 2, backgroundColor: '#FFD700', borderRadius: '30px' }}
      >
        Зарегистрироваться
      </LoadingButton>
    </Box>
  );
};

export default UserRegisterForm;
