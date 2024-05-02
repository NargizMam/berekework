import React, { ChangeEvent } from 'react';
import { Grid, TextField } from '@mui/material';
import FileInput from '../../../../shared/fileInput/FileInput';

interface Props {
  logoName: string;
  logoUrl: string;
  fileName?: string | undefined;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFileInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const HeaderLogoForm: React.FC<Props> = ({ logoName, logoUrl, onInputChange, onFileInputChange, fileName }) => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <TextField id="name" label="Name" name="name" value={logoName} onChange={onInputChange} required />
      </Grid>
      <Grid item>
        <TextField id="url" label="URL" name="url" value={logoUrl} onChange={onInputChange} required />
      </Grid>
      <Grid item>
        <FileInput label="Logo" name="logo" onChange={onFileInputChange} filename={fileName} />
      </Grid>
    </Grid>
  );
};

export default HeaderLogoForm;