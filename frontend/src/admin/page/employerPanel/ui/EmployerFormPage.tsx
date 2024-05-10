import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { EmployerMutation } from '../model/types';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { createEmployer } from '../api/employerThunk';
import { selectEmployerError } from '../model/employerSlice';
import { getExtension } from '../../../../feachers/checkExtensiion';

export const EmployerFormPage = () => {
  const [state, setState] = useState<EmployerMutation>({
    email: '',
    password: '',
    companyName: '',
    scope: '',
    action: '',
    foundationYear: '',
    document: null,
    address: '',
    avatar: null,
  });
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectEmployerError);
  const documentSelect = useRef<HTMLInputElement>(null);
  const imageSelect = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('');
  const [filenameImage, setFilenameImage] = useState('');
  const [errorDocument, setErrorDocument] = useState(false);

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
      document: null,
      address: '',
      avatar: null,
    });
  };

  const changeFileFiled = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files && files[0]) {
      if (name === 'avatar'){
        setFilenameImage(files[0].name);
      } else if (name === 'document') {
        setFilename(files[0].name);
      }
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }

    if (name === 'document') {
      setErrorDocument(getExtension(filename)?.toLowerCase() !== 'pdf');
    }
  };

  const clearDocumentField = () => {
    setFilename('');
    setFilenameImage('');
    setState((prevState) => ({
      ...prevState,
      avatar: null,
    }));
    if (documentSelect.current) {
      documentSelect.current.value = '';
    }
  };

  const selectFile = (type: string) => {
    if (type === 'document') {
      if (documentSelect.current) {
        documentSelect.current.click();
      }
    } else if (type === 'image') {
      if (imageSelect.current) {
        imageSelect.current.click();
      }
    }
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
        <Grid item xs={12}>
          <TextField
            value={state.address}
            onChange={changeField}
            name="address"
            id="standard-basic"
            label="Address"
            variant="outlined"
            required={true}
            error={Boolean(getFieldError('address'))}
            helperText={getFieldError('address')}
          />
        </Grid>
        <Grid item xs={12}>
          <input
            style={{ display: 'none' }}
            type="file"
            name="document"
            onChange={changeFileFiled}
            ref={documentSelect}
          />
          <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item xs>
              <TextField
                disabled
                label="document"
                value={filename || ''}
                onClick={() => selectFile('document')}
                error={!errorDocument}
                helperText={!errorDocument ? 'PDF format!' : null}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => selectFile('document')}>
                Browse
              </Button>
            </Grid>
            {filename.length !== 0 && (
              <Grid item>
                <Button variant="contained" onClick={clearDocumentField}>
                  Clear
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <input
            style={{ display: 'none' }}
            type="file"
            name="avatar"
            onChange={changeFileFiled}
            ref={imageSelect}
          />
          <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item xs>
              <TextField
                disabled
                label="avatar"
                value={filenameImage || ''}
                onClick={() => selectFile('image')}
                error={Boolean(getFieldError('avatar'))}
                helperText={getFieldError('avatar')}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => selectFile('image')}>
                Browse
              </Button>
            </Grid>
            {filenameImage.length !== 0 && (
              <Grid item>
                <Button variant="contained" onClick={clearDocumentField}>
                  Clear
                </Button>
              </Grid>
            )}
          </Grid>
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
