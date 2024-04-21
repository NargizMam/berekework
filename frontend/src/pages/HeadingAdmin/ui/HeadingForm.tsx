import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { HeadingMutation } from '../model/types';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '../../../app/store/hooks';
import { createHeading, getAllHeading, getSingleHeading, updateHeading } from '../api/HeadingThunk';

interface Props {
  id?: string;
  heading?: HeadingMutation;
  location?: string;
}

const HeadingForm: React.FC<Props> = ({id, heading, location}) => {
  const [state, setState] = useState<HeadingMutation>(heading || {
    title: '',
    description: '',
    location: '',
    image: null,
  });
  const dispatch = useAppDispatch();
  const imageSelect = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('');
  const [imageData, setImageData] = useState('');
  const selectImage = () => {
    if (imageSelect.current) {
      imageSelect.current.click();
    }
  };

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => (
      {...prevState, [name]: value}
    ));
  };


  const changeImageField = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    if (files && files[0]) {
      setFilename(files[0].name);
      const imageUrl = URL.createObjectURL(files[0]);
      setImageData(imageUrl);
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const clearImageField = () => {
    setFilename('');
    setImageData('');
    setState((prevState) => ({
      ...prevState,
      image: null,
    }));
    if (imageSelect.current) {
      imageSelect.current.value = '';
    }
  };

  const createHeadingHandle = async (event: FormEvent) => {
    event.preventDefault();
    if (heading && id && location) {
      await dispatch(updateHeading({id, heading: state})).unwrap();
      await dispatch(getSingleHeading(location));
    } else {
      await dispatch(createHeading(state)).unwrap();
    }
    await dispatch(getAllHeading());
    console.log('created!');
  };

  return (
    <Box sx={{
      padding: 2,
    }}>
      <form onSubmit={createHeadingHandle}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="title"
              type="text"
              value={state.title}
              onChange={inputChangeHandler}
              autoComplete="Title"
              // error={Boolean(getFieldError('phone'))}
              // helperText={getFieldError('phone')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="description"
              type="text"
              value={state.description}
              onChange={inputChangeHandler}
              autoComplete="Describe of title"
              // error={Boolean(getFieldError('phone'))}
              // helperText={getFieldError('phone')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="location"
              label="Link to page"
              type="text"
              value={state.location}
              onChange={inputChangeHandler}
              autoComplete="Link to page"
              // error={Boolean(getFieldError('phone'))}
              // helperText={getFieldError('phone')}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">
              Image
            </Typography>
            <input
              style={{display: 'none'}}
              type="file"
              name="image"
              onChange={changeImageField}
              ref={imageSelect}
            />
            {
              filename.length === 0 ?
                <Box
                  sx={{
                    border: '1px dashed #000',
                    textAlign: 'center',
                  }}
                  onClick={selectImage}
                >
                  <Typography variant="h4">image</Typography>
                </Box>
                :
                <Box
                  sx={{
                    display: 'flex',
                    position: 'relative',
                  }}
                >
                  <img
                    style={{
                      width: '100%',
                      objectFit: 'contain',
                      maxHeight: '350px',
                    }}
                    src={imageData}
                    alt="preview"
                  />
                  <button
                    onClick={clearImageField}
                    type="button"
                    style={{
                      position: 'absolute',
                      background: '#ff6314',
                      color: '#fff',
                      padding: '2px 10px',
                      textAlign: 'center',
                      right: '15px',
                      top: '15px',
                      borderRadius: '50%',
                    }}
                  >
                    x
                  </button>
                </Box>
            }
          </Grid>
          <Grid item xs>
            <Button type="submit" variant="outlined">{heading ? 'Update' : 'Add'}</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default HeadingForm;