import React, { ChangeEvent } from 'react';
import { Grid, TextField } from '@mui/material';

interface Props {
  password: string;
  inputChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ChangePassword: React.FC<Props> = ({password, inputChangeHandler }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Пароль"
          type='password'
          name="password"
          value={password}
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

export default ChangePassword;