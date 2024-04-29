import { ChangeEvent, FormEvent, useState } from 'react';
import { RegisterMutation } from '../model/types';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useAppDispatch } from '../../../../app/store/hooks';
import { register } from '../api/AuthThunk';

export const RegisterPage = () => {
  const [state, setState] = useState<RegisterMutation>({
    email: '',
    password: '',
    avatar: null,
  });
  const dispatch = useAppDispatch();

  const changeFields = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(register(state)).unwrap();
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
          Sign up
        </Typography>
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                name="email"
                value={state.email}
                onChange={changeFields}
                autoComplete="new-username"
                // error={Boolean(getFieldError('username'))}
                // helperText={getFieldError('username')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                value={state.password}
                onChange={changeFields}
                autoComplete="new-password"
                // error={Boolean(getFieldError('password'))}
                // helperText={getFieldError('password')}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          {/*<Grid container justifyContent="flex-end">*/}
          {/*  <Grid item>*/}
          {/*    <Link component={RouterLink} to="/login" variant="body2">*/}
          {/*      Already have an account? Sign in*/}
          {/*    </Link>*/}
          {/*  </Grid>*/}
          {/*</Grid>*/}
        </Box>
      </Box>
    </Container>
  );
};
