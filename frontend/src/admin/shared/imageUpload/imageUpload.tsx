import React, { useEffect, useRef, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
// import { fileUpload } from '../../page/adminPages/api/imageUploadThunks';
import { useAppDispatch } from '../../../app/store/hooks';
import axiosApi from '../../../app/axiosApi';

interface Props {
  /*name: string;
  fileName: string;*/
  value: string;
  onChangeImage: (imageLoc: string) => void;
}

const ImageUpload: React.FC<Props> = ({ onChangeImage, value = '' }) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<File | null>(null);
  const [filename, setFilename] = useState(value);

  // todo нужно передать именно не value а existingImage = и ее отрисовать тоже через useEffect
  console.log('HERE');
  /*if (value.length) {
    const image = value.split('&')[1] + '.' + value.slice(-3);
    console.log('Come image', image);
    // setFilename(image);
  }*/

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log('Set filename');
      setFilename(e.target.files[0].name);
    } else {
      console.log('Set empty');
      setFilename('');
    }

    const { files } = e.target;
    if (files) {
      setState(files[0]);
      // console.log(files[0]);
      if (files[0].name) {
        // console.log('HERE');
        // dispatch(fileUpload(files[0]));
        const formData = new FormData();
        formData.append('image', files[0]);

        const response = await axiosApi.post('/upload-image', formData);
        // console.log('After dispatch', response.data.filename);
        onChangeImage(response.data.filename);
      }
    }
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    if (filename.length > 0 && state) {
      // dispatch(fileUpload(state));
      // setTimeout(() => {
      //   onChangeImage(imageLocation);
      // }, 4000);
    }
  }, [filename, dispatch, state]);

  return (
    <>
      <input style={{ display: 'none' }} type="file" name={'image'} onChange={onFileChange} ref={inputRef} />
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item xs>
          <TextField disabled label={'Image'} value={filename} onClick={activateInput} />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={activateInput}>
            Browse
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ImageUpload;
