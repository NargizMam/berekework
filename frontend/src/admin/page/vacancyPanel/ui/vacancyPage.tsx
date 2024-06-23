import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Loader } from '../../../../shared/loader';
import { selectVacancies, selectVacanciesLoading } from '../../../../feachers/vacancy/vacancySlice';
import { deleteVacancy, getAllVacancy } from '../../../../feachers/vacancy/vacancyThunk';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

export const VacancyPage = () => {
  const dispatch = useAppDispatch();
  const vacancies = useAppSelector(selectVacancies);
  const [vacancyId, setVacancyId] = useState<string | null>(null);
  const loading = useAppSelector(selectVacanciesLoading);

  useEffect(() => {
    dispatch(getAllVacancy());
  }, [dispatch]);

  const handleDeleteVacancy = async (id: string) => {
    setVacancyId(id);
  };

  const LinkItem = styled(Link)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit',
    },
  });

  if (loading) {
    return <Loader />;
  }

  const onDeleteConfirm = async () => {
    if (vacancyId) {
      try {
        await dispatch(deleteVacancy(vacancyId));
        await dispatch(getAllVacancy());
        toast.success('Вакансия удалена!');
        setVacancyId(null);
      } catch (error) {
        toast.error('Что то пошло не так!');
        setVacancyId(null);
      }
    }
  };

  const onDeleteCancel = () => {
    setVacancyId(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Вид занятости</TableCell>
              <TableCell align="right">Компания</TableCell>
              <TableCell align="right">город</TableCell>
              <TableCell align="right">Заработная плата</TableCell>
              <TableCell align="right">Дата создания</TableCell>
              <TableCell align="right">Дата редактирования</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vacancies.map((vacancy) => (
              <TableRow key={vacancy._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <ListItemButton component={Link} to={`/admin/applications/${vacancy._id}`}>
                    {vacancy.vacancyTitle}
                  </ListItemButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {vacancy.employmentType}
                </TableCell>
                <TableCell>{vacancy.employer?.companyName}</TableCell>
                <TableCell component="th" scope="row">
                  {vacancy.city}
                </TableCell>
                {vacancy.salary ? (
                  <TableCell component="th" scope="row">
                    {vacancy.salary.minSalary} - {vacancy.salary.maxSalary}
                  </TableCell>
                ) : (
                  <TableCell align="right">No salary</TableCell>
                )}
                <TableCell component="th" scope="row">
                  {dayjs(vacancy.createdAt).format('DD MMMM YYYY')}
                </TableCell>
                <TableCell component="th" scope="row">
                  {dayjs(vacancy.updatedAt).format('DD MMMM YYYY')}
                </TableCell>
                <TableCell align="right">
                  <LinkItem to={'/vacancy/' + vacancy._id} target="_blank">
                    Предпросмотр
                  </LinkItem>
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleDeleteVacancy(vacancy._id)} variant="contained">
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={Boolean(vacancyId)} onClose={onDeleteCancel}>
        <DialogTitle>Подтвердите удаление</DialogTitle>
        <DialogContent>Вы действительно хотите удалить эту вакансию?</DialogContent>
        <DialogActions>
          <Button onClick={onDeleteConfirm}>Да</Button>
          <Button onClick={onDeleteCancel}>Нет</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
