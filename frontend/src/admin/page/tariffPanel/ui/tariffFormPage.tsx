import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { TariffMutation } from '../model/types';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { createTariff, getSingleTariff } from '../api/tariffThunk';
import { useParams } from 'react-router-dom';
import { selectTariff, selectTariffLoading } from '../model/tariffSlice';

const TariffFormPage = () => {
  const [state, setState] = useState<TariffMutation>({
    title: '',
    mainTitle: '',
    description: [],
  });
  const [description, setDescription] = useState('');
  const tariff = useAppSelector(selectTariff);
  const loading = useAppSelector(selectTariffLoading);
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };

  useEffect(() => {
    dispatch(getSingleTariff(id));
  }, [dispatch, id]);

  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addDescription = () => {
    setState((prevState) => ({
      ...prevState,
      description: [...prevState.description, description],
    }));
    setDescription('');
  };

  const handleCreateTariff = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(createTariff(state)).unwrap();
    setState({
      title: '',
      description: [],
      mainTitle: '',
    });
    setDescription('');
  };

  // if(!loading && tariff){
  //   setState(prevState => ({
  //     ...prevState,
  //     mainTitle: tariff.mainTitle,
  //   }));
  // }

  return (
    <form
      style={{
        margin: '30px auto',
      }}
      autoComplete="off"
      onSubmit={handleCreateTariff}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            value={state.mainTitle}
            onChange={changeField}
            name="mainTitle"
            id="standard-basic"
            label="Main Title"
            variant="outlined"
            required={true}
            // error={Boolean(getFieldError('companyName'))}
            // helperText={getFieldError('companyName')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={state.title}
            onChange={changeField}
            name="title"
            id="standard-basic"
            label="Title"
            variant="outlined"
            required={true}
            // error={Boolean(getFieldError('companyName'))}
            // helperText={getFieldError('companyName')}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px 0' }}>
            {state.description.map((desc, index) => (
              <Typography key={index}>{desc}</Typography>
            ))}
            <TextField
              value={description}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}
              name="description"
              id="standard-basic"
              label="description"
              variant="outlined"
              // error={Boolean(getFieldError('scope'))}
              // helperText={getFieldError('scope')}
            />
            <Button onClick={addDescription} type="button" variant="outlined">
              Add
            </Button>
          </Box>
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

export default TariffFormPage;
