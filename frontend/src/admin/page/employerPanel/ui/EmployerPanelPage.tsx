import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import {
  selectEmployerDeleteLoading,
  selectEmployersLoading,
  selectEmployers,
  selectEmployerUpdateLoading,
} from '../model/employerSlice';
import { deleteEmployer, getAllEmployer, updateStatusEmployer } from '../api/employerThunk';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
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
  Tooltip,
  Typography,
} from '@mui/material';
import { Loader } from '../../../../shared/loader';
import { Link as RouterLink } from 'react-router-dom';
import { API_URL } from '../../../../app/constants/links';
import { usePrismicDocumentByUID } from '@prismicio/react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';

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
  const loading = useAppSelector(selectEmployersLoading);
  const [selectTariff, setSelectTariff] = useState('');
  const [open, setOpen] = useState(false);
  const [employer, setEmployer] = useState({
    id: '',
    email: '',
  });
  const tariffs = document?.data.body.filter((slice: TariffGet) => slice.slice_type === 'tariff')[0].items || [];
  const updateLoading = useAppSelector(selectEmployerUpdateLoading);
  const deleteLoading = useAppSelector(selectEmployerDeleteLoading);

  useEffect(() => {
    dispatch(getAllEmployer());
  }, [dispatch]);

  const handleUpdateEmployer = async (event: FormEvent) => {
    try {
      event.preventDefault();
      await dispatch(updateStatusEmployer({ ...employer, tariff: selectTariff })).unwrap();
      await dispatch(getAllEmployer()).unwrap();
      setOpen(false);
      toast.success('Успешно обновлен и отправлен на почту!');
      setSelectTariff('');
    } catch (error) {
      toast.error('Что то пошло не так!');
    }
  };

  const handleDeleteEmployer = async (id: string, email: string) => {
    try {
      await dispatch(deleteEmployer({ id, email })).unwrap();
      await dispatch(getAllEmployer()).unwrap();
      toast.success(`${email} удален!`);
    } catch (error) {
      toast.error('Что то пошло не так!');
    }
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
          sx={{ margin: '5px', backgroundColor: 'gray', borderRadius: '5px', padding: '8px 20px', color: '#fff' }}
          underline="none"
          component={RouterLink}
          to="/admin/employers-submit"
        >
          <Typography variant={'h6'}>Создать</Typography>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500, overflowX: 'auto' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Название компании</TableCell>
              <TableCell align="left">Вид деятельности</TableCell>
              <TableCell align="left">Адрес</TableCell>
              <TableCell align="left">Контакты</TableCell>
              <TableCell align="left">Документы</TableCell>
              <TableCell align="left">Статус</TableCell>
              <TableCell align="left">Оплата</TableCell>
              <TableCell align="center" colSpan={2}>
                Дейсвие
              </TableCell>
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
                  {employer.industry}
                </TableCell>
                <TableCell component="th" scope="row">
                  {employer.address}
                </TableCell>
                <TableCell component="th" scope="row">
                  {employer.contacts}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Link target="_blank" href={API_URL + '/' + employer.documents}>
                    PDF
                  </Link>
                </TableCell>
                <TableCell>{employer.tariff}</TableCell>
                <TableCell>{employer.isPublished ? 'Оплатил' : 'Не оплатил'}</TableCell>
                <TableCell align="right">
                  <Tooltip title={'Изменить статус'}>
                    <IconButton onClick={() => handleClickOpen(employer._id, employer.email)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align="right">
                  <Link underline="none" component={RouterLink} to={`/admin/employers-submit/${employer._id}`}>
                    <Typography>Изменить</Typography>
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title={'Удалить работодателя'}>
                    <IconButton
                      aria-label="delete"
                      disabled={deleteLoading}
                      onClick={() => handleDeleteEmployer(employer._id, employer.email)}
                    >
                      <DeleteIcon color={'error'} sx={{ fontSize: '30px' }} />
                    </IconButton>
                  </Tooltip>
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
              Отклонить
            </Button>
            <Button type="submit" disabled={updateLoading}>
              {updateLoading ? 'Loading' : 'Подтвердить'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
