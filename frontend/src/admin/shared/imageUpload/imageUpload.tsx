import React, { useRef, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import axiosApi from '../../../app/axiosApi';

interface Props {
  value: string;
  onChangeImage: (imageLoc: string) => void;
}

const ImageUpload: React.FC<Props> = ({ onChangeImage, value = '' }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState(value);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }

    const { files } = e.target;
    if (files) {
      if (files[0].name) {
        const formData = new FormData();
        formData.append('image', files[0]);

        const response = await axiosApi.post('/upload-image', formData);
        onChangeImage(response.data.filename);
      }
    }
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

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
