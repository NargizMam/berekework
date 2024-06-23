import React, { ChangeEvent } from 'react';
import { Grid, TextField } from '@mui/material';

interface Props {
  otp: string;
  inputChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SendOtp: React.FC<Props> = ({otp, inputChangeHandler }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Otp"
          name="otp"
          value={otp}
          onChange={inputChangeHandler}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '30px',
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default SendOtp;