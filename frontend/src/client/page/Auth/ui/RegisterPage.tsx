import { useState } from 'react';
import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import UserRegisterForm from './UserRegisterForm';
import EmployerRegisterForm from './EmployerRegisterForm';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { googleAuth } from '../api/AuthThunk';
import { useAppDispatch } from '../../../../app/store/hooks';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [alignment, setAlignment] = useState('applicant');
  const [showGoogleLogin, setShowGoogleLogin] = useState(false);

  const handleAlignment = (newAlignment: string) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleAuth(credential)).unwrap();
    navigate('/');
  };

  const handleGoogleButtonClick = () => {
    setShowGoogleLogin(true);
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
        <Typography component="h1" variant="h5" sx={{mb:2}}>
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
          <ToggleButton value="applicant" sx={{ borderRadius: '30px 0 0 30px' }}>Поиск работы</ToggleButton>
          <ToggleButton value="employer" sx={{ borderRadius: '0 30px 30px 0' }}>Поиск сотрудников</ToggleButton>
        </ToggleButtonGroup>
        {alignment === 'applicant' ? <UserRegisterForm /> : <EmployerRegisterForm />}
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: '#4285F4',
            color: 'white',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            mt: 2,
            textTransform: 'none'
          }}
          onClick={handleGoogleButtonClick}
        >
          <GoogleIcon sx={{ mr: 1, py: 1}} /> Войти с помощью Google
        </Button>
        {showGoogleLogin && (
          <GoogleLogin
            onSuccess={(credentialResponse: CredentialResponse) => {
              if (credentialResponse.credential) {
                void googleLoginHandler(credentialResponse.credential);
              }
              setShowGoogleLogin(false);
            }}
            onError={() => {
              console.log('Login failed!');
              setShowGoogleLogin(false);
            }}
            useOneTap
          />
        )}
      </Box>
    </Container>
  );
};

