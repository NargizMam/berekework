import { Alert, Box, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import { LoginMutation } from '../model/types';
import { googleAuth, login } from '../api/AuthThunk';
import { selectLoginError, selectLoginLoading } from '../model/AuthSlice';
import { LoadingButton } from '@mui/lab';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

const initialState = {
  email: '',
  password: '',
};

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectLoginError);
  const loading = useAppSelector(selectLoginLoading);
  const [state, setState] = useState<LoginMutation>(initialState);


  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(login(state)).unwrap();
    setState(initialState);
    navigate('/');
  };
  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleAuth(credential)).unwrap();
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 5}}>
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Bereke work
        </Typography>
      <Grid >
        <GoogleLogin
          onSuccess={(credentialResponse: CredentialResponse) => {
            if (credentialResponse.credential) {
              void googleLoginHandler(credentialResponse.credential);
            }
          }}
          onError={() => {
            console.log('Login failed!');
          }}
          useOneTap
        />
      </Grid>
        {error && (
          <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
            {error.error}
          </Alert>
        )}
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3, width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="E-mail"
                name="email"
                autoComplete="current-username"
                value={state.email}
                onChange={inputChangeHandler}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '30px',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                value={state.password}
                onChange={inputChangeHandler}
                autoComplete="current-password"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '30px',
                  },
                }}
              />
            </Grid>
          </Grid>
          <LoadingButton
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#FFE585', color: 'black', borderRadius: '30px', p: 1.5 }}
          >
            Войти
          </LoadingButton>
          <Grid container justifyContent="flex-end" sx={{ my: 3}}>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2" sx={{ color: '#0866FF'}}>
                Зарегистрироваться
              </Link>
            </Grid>
          </Grid>
        </Box>
    </Container>
  );
};
