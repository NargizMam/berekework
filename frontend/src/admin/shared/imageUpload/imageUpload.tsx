import React, { useEffect, useRef, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { fileUpload } from '../../page/adminPages/api/imageUploadThunks';
import { useAppDispatch } from '../../../app/store/hooks';

interface Props {
  name: string;
}

const ImageUpload: React.FC<Props> = ({ name }) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<File | null>(null);
  const [filename, setFilename] = useState('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }

    const { files } = e.target;
    if (files) {
      setState(files[0]);
    }
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    if (filename.length > 0 && state) {
      dispatch(fileUpload(state));
    }
  }, [filename, dispatch, state]);

  return (
    <>
      <input style={{ display: 'none' }} type="file" name={name} onChange={onFileChange} ref={inputRef} />
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
