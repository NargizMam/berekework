import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { TariffMutation } from '../model/types';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { createTariff, getSingleTariff, updateTariff } from '../api/tariffThunk';
import { useParams } from 'react-router-dom';
import { selectTariff, selectTariffError, selectTariffLoading } from '../model/tariffSlice';
import { Loader } from '../../../../shared/loader';

const TariffFormPage = () => {
  const [state, setState] = useState<TariffMutation>({
    title: '',
    description: [],
  });
  const [description, setDescription] = useState('');
  const tariff = useAppSelector(selectTariff);
  const loading = useAppSelector(selectTariffLoading);
  const error = useAppSelector(selectTariffError);
  const [errorDesc, setErrorDesc] = useState(false);
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };

  useEffect(() => {
    if (id) {
      dispatch(getSingleTariff(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && tariff) {
      setState((prevState) => ({
        ...prevState,
        ...tariff.tariffs[0],
      }));
    }
  }, [id, tariff]);

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

  const deleteDescription = (id: number) => {
    setState((prevState) => {
      const filterDesc = prevState.description.filter((_, index) => index !== id);
      return {
        ...prevState,
        description: filterDesc,
      };
    });
  };

  const handleCreateTariff = async (event: FormEvent) => {
    event.preventDefault();
    if (state.description.length === 0) {
      setErrorDesc(true);
      return false;
    }
    if (id) {
      await dispatch(updateTariff({ id, data: state })).unwrap();
    } else {
      await dispatch(createTariff(state)).unwrap();
    }
    setState({
      title: '',
      description: [],
    });
    setDescription('');
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  if (loading) {
    return <Loader />;
  }

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
            value={state.title}
            onChange={changeField}
            name="title"
            id="standard-basic"
            label="Title"
            variant="outlined"
            required={true}
            error={Boolean(getFieldError('title'))}
            helperText={getFieldError('title')}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px 0' }}>
            {state.description.map((desc, index) => (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <Typography key={index}>{desc}</Typography>
                <Button onClick={() => deleteDescription(index)} type="button" variant="outlined">
                  delete
                </Button>
              </Box>
            ))}
            <TextField
              value={description}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}
              name="description"
              id="standard-basic"
              label="description"
              variant="outlined"
              error={Boolean(getFieldError('description'))}
              helperText={errorDesc ? 'Description dont empty' : getFieldError('description')}
            />
            <Button onClick={addDescription} type="button" variant="outlined">
              Add
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Button type="submit" variant="contained">
            {id ? 'Updated' : 'Create'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TariffFormPage;
