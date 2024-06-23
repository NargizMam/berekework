import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectEmployers, selectEmployersLoading, selectEmployerUpdateLoading } from '../model/employerSlice';
import { getAllEmployer, updateStatusEmployer } from '../api/employerThunk';
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
  Select,
  Typography,
} from '@mui/material';
import { Loader } from '../../../../shared/loader';
import { Link as RouterLink } from 'react-router-dom';
import { usePrismicDocumentByUID } from '@prismicio/react';
import { toast } from 'react-toastify';
import { archiveModels } from '../../../../feachers/user/usersThunk';
import { selectArchivesLoading } from '../../../../feachers/user/usersSlice';
import EmployeeTable from '../../../widgets/crmTable/employeeTable';

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
  const [employeeId, setEmployeeId] = useState<{ id: string; email: string } | null>(null);
  const [open, setOpen] = useState(false);
  const [employer, setEmployer] = useState({
    id: '',
    email: '',
  });
  const [daysLeftMap, setDaysLeftMap] = useState<{ [key: string]: number }>({});
  const tariffs = document?.data.body.filter((slice: TariffGet) => slice.slice_type === 'tariff')[0].items || [];
  const updateLoading = useAppSelector(selectEmployerUpdateLoading);
  const archiveLoading = useAppSelector(selectArchivesLoading);
  const currentDate = new Date();

  useEffect(() => {
    if (employers) {
      const newDaysLeftMap: { [key: string]: number } = {};
      employers.forEach((employer) => {
        const tariffDate = new Date(employer.tariff.data);
        const diffTime = Math.abs(currentDate.getTime() - tariffDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (employer.tariff.titleTariff === 'Разовый') {
          newDaysLeftMap[employer._id] = 1 - diffDays;
        } else if (employer.tariff.titleTariff === 'Месячный') {
          newDaysLeftMap[employer._id] = 30 - diffDays;
        } else if (employer.tariff.titleTariff === 'Полугодовой') {
          newDaysLeftMap[employer._id] = 183 - diffDays;
        } else {
          newDaysLeftMap[employer._id] = 0;
        }
      });
      setDaysLeftMap(newDaysLeftMap);
    }
  }, [employers, currentDate]);

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
    setEmployeeId({
      id,
      email,
    });
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

  const onDeleteConfirm = async () => {
    if (employeeId?.id && employeeId?.email) {
      try {
        // await dispatch(deleteEmployer({ id: employeeId.id, email: employeeId.email })).unwrap();
        await dispatch(
          archiveModels({
            id: employeeId.id,
            model: 'employee',
          }),
        );
        await dispatch(getAllEmployer()).unwrap();
        toast.success(`${employeeId.email} архивирован!`);
      } catch (error) {
        toast.error('Что то пошло не так!');
      }
      setEmployeeId(null);
    }
  };

  const onDeleteCancel = () => {
    setEmployeeId(null);
  };

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
      <EmployeeTable
        employers={employers}
        archiveLoading={archiveLoading}
        handleClickOpen={handleClickOpen}
        handleArchiveEmployer={handleDeleteEmployer}
        daysLeftMap={daysLeftMap}
      />
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
      <Dialog open={Boolean(employeeId)} onClose={onDeleteCancel}>
        <DialogTitle>Подтвердите архивирование</DialogTitle>
        <DialogContent>Вы действительно хотите архивировать этого работодателя?</DialogContent>
        <DialogActions>
          <Button onClick={onDeleteConfirm} disabled={archiveLoading}>
            Да
          </Button>
          <Button onClick={onDeleteCancel} disabled={archiveLoading}>
            Нет
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
