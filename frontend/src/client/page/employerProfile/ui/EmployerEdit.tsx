import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import {
  selectEmployerError,
  selectEmployersProfileInfo,
  selectEmployersProfileLoading,
} from '../../../../admin/page/employerPanel/model/employerSlice';
import {
  createEmployer,
  getEmployersProfileInfo,
  updateEmployer,
} from '../../../../admin/page/employerPanel/api/employerThunk';
import { getExtension } from '../../../../feachers/checkExtensiion';
import { Button, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export interface EmployerInfoApiMutation {
  email: string;
  password: string;
  companyName: string;
  industry: string;
  description: string;
  address: string;
  contacts: string;
  avatar: File | string | null;
  document: string | null;
  foundationYear: string;
}

export const EmployerEditPage = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [state, setState] = useState<EmployerInfoApiMutation>({
    email: '',
    password: '',
    industry: '',
    companyName: '',
    description: '',
    contacts: '',
    foundationYear: '',
    address: '',
    document: null,
    avatar: null,
  });
  const employer = useAppSelector(selectEmployersProfileInfo);
  const error = useAppSelector(selectEmployerError);
  const documentSelect = useRef<HTMLInputElement>(null);
  const imageSelect = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('');
  const [filenameImage, setFilenameImage] = useState('');
  const [errorDocument, setErrorDocument] = useState(false);

  const loading = useAppSelector(selectEmployersProfileLoading);
  const inputStyle = { borderRadius: '30px' };
  const registerStyle = pathname === '/register';

  useEffect(() => {
    if (id) {
      dispatch(getEmployersProfileInfo(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      ...employer,
    }));
  }, [employer]);

  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateEmployer = async (event: FormEvent) => {
    event.preventDefault();
    if (id) {
      await dispatch(updateEmployer({ id, data: state })).unwrap();
      setState({
        email: '',
        password: '',
        industry: '',
        companyName: '',
        description: '',
        contacts: '',
        foundationYear: '',
        address: '',
        document: null,
        avatar: null,
      });
      navigate(`/employersProfile/${id}`);
    } else {
      await dispatch(createEmployer(state)).unwrap();
    }
    setState({
      email: '',
      password: '',
      industry: '',
      companyName: '',
      description: '',
      contacts: '',
      foundationYear: '',
      address: '',
      document: null,
      avatar: null,
    });
    navigate(`/employersProfile/${id}`);
  };

  const changeFileFiled = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files && files[0]) {
      if (name === 'logo') {
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
              type="email"
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
              type="number"
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
            <input style={{ display: 'none' }} type="file" name="logo" onChange={changeFileFiled} ref={imageSelect} />
            <Grid container direction="row" spacing={2} alignItems="center">
              <Grid item xs>
                <TextField
                  disabled
                  label="Logo"
                  InputProps={{ style: inputStyle }}
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
              {filenameImage && filenameImage.toString().length !== 0 && (
                <Grid item>
                  <Button variant="contained" onClick={clearDocumentField}>
                    Clear
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={registerStyle ? 12 : 6}>
            <LoadingButton loading={loading} type="submit" variant="contained" sx={{ width: '100%' }}>
              Create
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
