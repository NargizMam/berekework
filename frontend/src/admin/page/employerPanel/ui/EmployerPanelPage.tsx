import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectEmployerLoading, selectEmployers } from '../model/employerSlice';
import { deleteEmployer, getAllEmployer, updateStatusEmployer } from '../api/employerThunk';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Loader } from '../../../../shared/loader';
import { Link as RouterLink } from 'react-router-dom';
import { API_URL } from '../../../../app/constants/links';
import { usePrismicDocumentByUID } from '@prismicio/react';

interface TariffGet {
  slice_type: string;
}

interface Tariff {
  tariffdescription: { text: string }[];
  tarifftitle: string;
  tarriflink: {
    target: string;
    url: string;
  };
}

export const EmployerPanelPage = () => {
  const [document] = usePrismicDocumentByUID('pages', 'foremployer');
  const dispatch = useAppDispatch();
  const employers = useAppSelector(selectEmployers);
  const loading = useAppSelector(selectEmployerLoading);
  const [selectTariff, setSelectTariff] = useState('');
  const [open, setOpen] = useState(false);
  const [employer, setEmployer] = useState({
    id: '',
    email: '',
  });
  const tariffs = document?.data.body.filter((slice: TariffGet) => slice.slice_type === 'tariff')[0].items || [];

  useEffect(() => {
    dispatch(getAllEmployer());
  }, [dispatch]);

  const handleUpdateEmployer = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(updateStatusEmployer({ ...employer, tariff: selectTariff })).unwrap();
    await dispatch(getAllEmployer()).unwrap();
    setOpen(false);
  };

  const handleDeleteEmployer = async (id: string) => {
    await dispatch(deleteEmployer(id)).unwrap();
    await dispatch(getAllEmployer());
  };

  const handleClickOpen = (id: string, email: string) => {
    setEmployer({ id, email });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px 0' }}>
      <Box sx={{ display: 'flex', justifyContent: 'right' }}>
        <Link
          sx={{ margin: '5px', backgroundColor: 'gray', borderRadius: '5px', padding: '5px 10px', color: '#fff' }}
          underline="none"
          component={RouterLink}
          to="/admin/employers-submit"
        >
          <Typography>Create</Typography>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Foundation Year</TableCell>
              <TableCell>Industry</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Contacts</TableCell>
              <TableCell>Document</TableCell>
              <TableCell>Tariff</TableCell>
              <TableCell align="right">Published</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employers.map((employer) => (
              <TableRow key={employer._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {employer.email}
                </TableCell>
                <TableCell component="th" scope="row">
                  {employer.companyName}
                </TableCell>
                <TableCell component="th" scope="row">
                  <img src={API_URL + '/' + employer.avatar} alt="Logo" />
                </TableCell>
                <TableCell component="th" scope="row">
                  {employer.foundationYear}
                </TableCell>
                <TableCell component="th" scope="row">
                  {employer.industry}
                </TableCell>
                <TableCell component="th" scope="row">
                  {employer.description}
                </TableCell>
                <TableCell component="th" scope="row">
                  {employer.address}
                </TableCell>
                <TableCell component="th" scope="row">
                  {employer.contacts}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Link href={API_URL + '/' + employer.documents}>PDF</Link>
                </TableCell>
                <TableCell>{employer.tariff}</TableCell>
                <TableCell>{employer.isPublished ? 'Оплатил' : 'Не оплатил'}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleClickOpen(employer._id, employer.email)} variant="contained">
                    Изменить статус
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleDeleteEmployer(employer._id)} variant="contained">
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={handleUpdateEmployer}>
          <DialogTitle id="alert-dialog-title">Поменять статус у работодателя {employer.email}</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Тариф</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectTariff}
                label="Тариф"
                onChange={(event) => setSelectTariff(event.target.value)}
              >
                <MenuItem value="">Не оплата</MenuItem>
                {tariffs.map((tariff: Tariff, index: number) => (
                  <MenuItem key={index} value={tariff.tarifftitle}>
                    {tariff.tarifftitle}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleClose}>
              Disagree
            </Button>
            <Button type="submit">Agree</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
