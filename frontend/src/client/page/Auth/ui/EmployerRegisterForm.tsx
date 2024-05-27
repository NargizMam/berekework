import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Box, Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectRegisterError, selectRegisterLoading } from '../model/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { EmployerMutation } from '../../../../admin/page/employerPanel/model/types';
import { registerEmployer } from '../api/AuthThunk';

const EmployerRegisterForm = () => {
  const [state, setState] = useState<EmployerMutation>({
    email: '',
    password: '',
    avatar: null,
    companyName: '',
    industry: '',
    description: '',
    address: '',
    contacts: '',
    documents: null,
    logo: null,
    foundationYear: '',
  });
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
    await dispatch(registerEmployer(state)).unwrap();
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
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Название компании"
            name="companyName"
            value={state.companyName}
            onChange={changeFields}
            autoComplete="organization"
            error={Boolean(getFieldError('companyName'))}
            helperText={getFieldError('companyName')}
            InputProps={{
              style: { borderRadius: '30px' },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Отрасль"
            name="industry"
            value={state.industry}
            onChange={changeFields}
            error={Boolean(getFieldError('industry'))}
            helperText={getFieldError('industry')}
            InputProps={{
              style: { borderRadius: '30px' },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Описание"
            name="description"
            value={state.description}
            onChange={changeFields}
            error={Boolean(getFieldError('description'))}
            helperText={getFieldError('description')}
            InputProps={{
              style: { borderRadius: '30px' },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Адрес"
            name="address"
            value={state.address}
            onChange={changeFields}
            error={Boolean(getFieldError('address'))}
            helperText={getFieldError('address')}
            InputProps={{
              style: { borderRadius: '30px' },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Контакты"
            name="contacts"
            value={state.contacts}
            onChange={changeFields}
            error={Boolean(getFieldError('contacts'))}
            helperText={getFieldError('contacts')}
            InputProps={{
              style: { borderRadius: '30px' },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Год основания"
            name="foundationYear"
            value={state.foundationYear}
            onChange={changeFields}
            error={Boolean(getFieldError('foundationYear'))}
            helperText={getFieldError('foundationYear')}
            InputProps={{
              style: { borderRadius: '30px' },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2,  borderRadius: '30px' }}
          >
            Загрузить аватар
            <input
              type="file"
              hidden
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  avatar: e.target.files ? e.target.files[0] : null,
                }))
              }
            />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2,  borderRadius: '30px' }}
          >
            Загрузить документ
            <input
              type="file"
              hidden
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  documents: e.target.files ? e.target.files[0] : null,
                }))
              }
            />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2,  borderRadius: '30px' }}
          >
            Загрузить логотип
            <input
              type="file"
              hidden
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  logo: e.target.files ? e.target.files[0] : null,
                }))
              }
            />
          </Button>
        </Grid>
      </Grid>
      <LoadingButton
        loading={loading}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, py: 2, backgroundColor: '#FFD700', borderRadius: '30px' }}
      >
        Зарегистрироваться
      </LoadingButton>
    </Box>
  );
};

export default EmployerRegisterForm;
