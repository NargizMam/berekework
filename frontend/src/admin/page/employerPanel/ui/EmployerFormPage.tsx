import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { EmployerMutation } from '../model/types';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { createEmployer } from '../api/employerThunk';
import { selectEmployerError } from '../model/employerSlice';
import { getExtension } from '../../../../feachers/checkExtensiion';
import { useLocation, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  selectEmployersProfileInfo,
  selectEmployersProfileLoading
} from '../../../../client/page/employerProfile/model/employerProfileSlice';
import { LoadingButton } from '@mui/lab';

const initialState = {
  email: '',
  password: '',
  industry: '',
  companyName: '',
  description: '',
  contacts: '',
  foundationYear: '',
  document: null,
  address: '',
  logo: null,
  avatar: null
}

export const EmployerFormPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [state, setState] = useState<EmployerMutation>(initialState);
  const error = useAppSelector(selectEmployerError);
  const documentSelect = useRef<HTMLInputElement>(null);
  const imageSelect = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('');
  const [filenameImage, setFilenameImage] = useState('');
  const [errorDocument, setErrorDocument] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const employerInfo = useAppSelector(selectEmployersProfileInfo);
  const loading = useAppSelector(selectEmployersProfileLoading);
  const inputStyle = {borderRadius: '30px'}
  const registerStyle = pathname === '/register';

  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  };
  const handleCreateEmployer = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(createEmployer(state)).unwrap();
    }finally{
      setState(initialState);
      if(registerStyle && employerInfo){
        navigate(`/employer/${employerInfo._id}`);
      }else{
        navigate('');
      }
    }
    };
  const changeFileFiled = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files && files[0]) {
      if (name === 'logo'){
        setFilenameImage(files[0].name);
      } else if (name === 'document') {
        setFilename(files[0].name);
        setErrorDocument(getExtension(files[0].name)?.toLowerCase() !== 'pdf');
      }
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }

  };
  const clearDocumentField = () => {
    setFilename('');
    setFilenameImage('');
    setState((prevState) => ({
      ...prevState,
      logo: null,
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
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
    <form
      style={{
        margin: '30px auto',
      }}
      autoComplete="off"
      onSubmit={handleCreateEmployer}
    >
      <Grid container spacing={2}>
        <Grid item xs={registerStyle ? 12 : 6}>
          <TextField
            value={state.email}
            onChange={changeField}
            name="email"
            type='email'
            id="standard-basic"
            label="Email"
            variant="outlined"
            required={true}
            InputProps={{ style: inputStyle }}
            error={Boolean(getFieldError('email'))}
            helperText={getFieldError('email')}
          />
        </Grid>
        <Grid item xs={registerStyle ? 12 : 6}>
          <TextField
            value={state.password}
            onChange={changeField}
            name="password"
            id="standard-basic"
            label="Password"
            type="password"
            variant="outlined"
            required={true}
            InputProps={{ style: inputStyle,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )}}
            error={Boolean(getFieldError('password'))}
            helperText={getFieldError('password')}
          />
        </Grid>
        <Grid item xs={registerStyle ? 12 : 6}>
          <TextField
            value={state.companyName}
            onChange={changeField}
            name="companyName"
            id="standard-basic"
            label="Company name"
            variant="outlined"
            required={true}
            InputProps={{ style: inputStyle }}
            error={Boolean(getFieldError('companyName'))}
            helperText={getFieldError('companyName')}
          />
        </Grid>
        <Grid item xs={registerStyle ? 12 : 6}>
          <TextField
            value={state.industry}
            onChange={changeField}
            name="industry"
            id="standard-basic"
            label="industry"
            variant="outlined"
            required={true}
            InputProps={{ style: inputStyle }}
            error={Boolean(getFieldError('industry'))}
            helperText={getFieldError('industry')}
          />
        </Grid>
        <Grid item xs={registerStyle ? 12 : 6}>
          <TextField
            value={state.description}
            onChange={changeField}
            name="description"
            id="standard-basic"
            label="description"
            variant="outlined"
            required={true}
            InputProps={{ style: inputStyle }}
            error={Boolean(getFieldError('description'))}
            helperText={getFieldError('description')}
          />
        </Grid>
        <Grid item xs={registerStyle ? 12 : 6}>
          <TextField
            value={state.foundationYear}
            onChange={changeField}
            name="foundationYear"
            id="standard-basic"
            label="Foundation Year"
            variant="outlined"
            required={true}
            InputProps={{ style: inputStyle }}
            error={Boolean(getFieldError('foundationYear'))}
            helperText={getFieldError('foundationYear')}
          />
        </Grid>
        <Grid item xs={registerStyle ? 12 : 6}>
          <TextField
            value={state.address}
            onChange={changeField}
            name="address"
            id="standard-basic"
            label="Address"
            variant="outlined"
            required={true}
            InputProps={{ style: inputStyle }}
            error={Boolean(getFieldError('address'))}
            helperText={getFieldError('address')}
          />
        </Grid>
        <Grid item xs={registerStyle ? 12 : 6}>
          <TextField
            value={state.contacts}
            onChange={changeField}
            name="contacts"
            id="standard-basic"
            label="Contacts"
            variant="outlined"
            required={true}
            InputProps={{ style: inputStyle }}
            error={Boolean(getFieldError('contacts'))}
            helperText={getFieldError('contacts')}
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
                InputProps={{ style: inputStyle }}
                onClick={() => selectFile('document')}
                error={errorDocument}
                helperText={errorDocument ? 'PDF format!' : null}
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
            name="logo"
            onChange={changeFileFiled}
            ref={imageSelect}
          />
          <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item xs>
              <TextField
                disabled
                label="Logo"
                InputProps={{ style: inputStyle}}
                value={filenameImage || ''}
                onClick={() => selectFile('image')}
                error={Boolean(getFieldError('logo'))}
                helperText={getFieldError('logo')}
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
        <Grid item xs={registerStyle ? 12 : 6}>
          <LoadingButton
            loading={loading}
            type="submit"
            variant="contained"
            sx={{width: '100%'}}
            disabled={state === initialState}
          >
            Create
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
    </>

  );
};
