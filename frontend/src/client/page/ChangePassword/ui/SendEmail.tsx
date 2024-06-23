import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { Alert, Box, Container, Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { changePassword, sendEmail, sendOtp } from '../api/ChangePasswordThunk';
import { selectChangePasswordError, selectSendEmailLoading } from '../model/ChangePasswordSlice';
import SendOtp from './SendOtp';
import { ChangePasswordData, SendOtpPayload } from '../types';
import ChangePassword from './ChangePassword';
import { useNavigate } from 'react-router-dom';


const SendEmail = () => {
  const dispatch = useAppDispatch();
  const [isEmailSended, setIsEmailSended] = useState(false);
  const [isOtpSended, setIsOtpSended] = useState(false);
  const error = useAppSelector(selectChangePasswordError);
  const loading = useAppSelector(selectSendEmailLoading);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<SendOtpPayload>({
    email: '',
    otp: '',
  });
  const [changePasswordData, setChangePasswordData] = useState<ChangePasswordData>({
    email: '',
    password: '',
  });
  console.log(otp);
  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (!isEmailSended && !isOtpSended) {
      setEmail(value);
    } else if (isEmailSended) {
      setOtp((prevState) => ({
        ...prevState,
        [name]: value,
        email: email,
      }));
    } else if (isOtpSended) {
      setChangePasswordData((prevState) => ({
        ...prevState,
        [name]: value,
        email: email,
      }));
    }
  };

  const submitFormHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (!isEmailSended && !isOtpSended) {
      await dispatch(sendEmail(email)).unwrap();
      setIsEmailSended(true);
    } else if (isEmailSended) {
      await dispatch(sendOtp(otp)).unwrap();
      setIsEmailSended(false);
      setIsOtpSended(true);
    } else if (isOtpSended) {
      await dispatch(changePassword(changePasswordData)).unwrap();
      navigate('/login');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{mt: 5}}>
      <Typography component="h1" variant="h5" sx={{fontWeight: 'bold', textAlign: 'center'}}>
        Bereke work
      </Typography>
      {error && (
        <Alert severity="error" sx={{mt: 3, width: '100%'}}>
          {error.error}
        </Alert>
      )}
      <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3, width: '100%'}}>
        <Grid container spacing={2}>
          {isEmailSended &&
            <Typography>Otp был отправлен на Вашу почту</Typography>
          }
          {isOtpSended &&
            <Typography>Смените пароль</Typography>
          }
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              autoComplete="current-username"
              value={email}
              onChange={inputChangeHandler}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px',
                },
                marginBottom: '10px'
              }}
              disabled={isEmailSended}
            />
          </Grid>
        </Grid>
        {isEmailSended && <SendOtp otp={otp.otp} inputChangeHandler={inputChangeHandler}/>}
        {isOtpSended &&
          <ChangePassword password={changePasswordData.password} inputChangeHandler={inputChangeHandler}/>}
        <LoadingButton
          loading={loading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: '#FFE585',
            color: 'black',
            borderRadius: '30px',
            p: 1.5,
          }}
        >
          Далее
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default SendEmail;