import { useState } from 'react';
import { Box, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import UserRegisterForm from './UserRegisterForm';
import EmployerRegisterForm from './EmployerRegisterForm';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { googleAuth } from '../api/AuthThunk';
import { useAppDispatch } from '../../../../app/store/hooks';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [alignment, setAlignment] = useState('applicant');

  const handleAlignment = (newAlignment: string) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleAuth(credential)).unwrap();
    navigate('/');
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
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
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
            borderRadius: '30px',
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
          <ToggleButton value="applicant" sx={{ borderRadius: '30px 0 0 30px' }}>
            Поиск работы
          </ToggleButton>
          <ToggleButton value="employer" sx={{ borderRadius: '0 30px 30px 0' }}>
            Поиск сотрудников
          </ToggleButton>
        </ToggleButtonGroup>
        {alignment === 'applicant' ? <UserRegisterForm /> : <EmployerRegisterForm />}
        <Grid sx={{ my: 3 }}>
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
      </Box>
    </Container>
  );
};
