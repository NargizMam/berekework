import React, { useRef } from 'react';
import { Button, Grid, TextField } from '@mui/material';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  filename?: string;
}

const FileInput: React.FC<Props> = ({ onChange, name, label, filename }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input style={{ display: 'none' }} type="file" name={name} onChange={onChange} ref={inputRef} />
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item xs>
          <TextField disabled label={label} value={filename || ''} onClick={activateInput} />
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

export default FileInput;