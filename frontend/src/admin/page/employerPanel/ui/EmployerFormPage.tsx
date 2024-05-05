import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { EmployerMutation } from '../model/types';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { createEmployer } from '../api/employerThunk';
import { selectEmployerError } from '../model/employerSlice';

export const EmployerFormPage = () => {
  const [state, setState] = useState<EmployerMutation>({
    email: '',
    password: '',
    companyName: '',
    scope: '',
    action: '',
    foundationYear: '',
  });
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectEmployerError);

  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateEmployer = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(createEmployer(state)).unwrap();
    setState({
      email: '',
      password: '',
      companyName: '',
      scope: '',
      action: '',
      foundationYear: '',
    });
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.error[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <form
      style={{
        margin: '30px auto',
      }}
      autoComplete="off"
      onSubmit={handleCreateEmployer}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            value={state.email}
            onChange={changeField}
            name="email"
            id="standard-basic"
            label="Email"
            variant="outlined"
            required={true}
            error={Boolean(getFieldError('email'))}
            helperText={getFieldError('email')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            value={state.password}
            onChange={changeField}
            name="password"
            id="standard-basic"
            label="Password"
            variant="outlined"
            required={true}
            error={Boolean(getFieldError('password'))}
            helperText={getFieldError('password')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            value={state.companyName}
            onChange={changeField}
            name="companyName"
            id="standard-basic"
            label="Company name"
            variant="outlined"
            required={true}
            error={Boolean(getFieldError('companyName'))}
            helperText={getFieldError('companyName')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            value={state.scope}
            onChange={changeField}
            name="scope"
            id="standard-basic"
            label="Scope"
            variant="outlined"
            required={true}
            error={Boolean(getFieldError('scope'))}
            helperText={getFieldError('scope')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            value={state.action}
            onChange={changeField}
            name="action"
            id="standard-basic"
            label="Action"
            variant="outlined"
            required={true}
            error={Boolean(getFieldError('action'))}
            helperText={getFieldError('action')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            value={state.foundationYear}
            onChange={changeField}
            name="foundationYear"
            id="standard-basic"
            label="Foundation Year"
            variant="outlined"
            required={true}
            error={Boolean(getFieldError('foundationYear'))}
            helperText={getFieldError('foundationYear')}
          />
        </Grid>
        <Grid item xs={6}>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
