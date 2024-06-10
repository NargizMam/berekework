import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import {
  Button,
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

export const VacancyPage = () => {
  const dispatch = useAppDispatch();
  const vacancies = useAppSelector(selectVacancies);
  const loading = useAppSelector(selectVacanciesLoading);

  useEffect(() => {
    dispatch(getAllVacancy());
  }, [dispatch]);

  const handleDeleteVacancy = async (id: string) => {
    await dispatch(deleteVacancy(id));
    await dispatch(getAllVacancy());
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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Type employment</TableCell>
            <TableCell align="right">Company</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Salary</TableCell>
            <TableCell align="right">Created</TableCell>
            <TableCell align="right">Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vacancies.map((vacancy) => (
            <TableRow key={vacancy._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {vacancy.vacancyTitle}
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
                <LinkItem target="_blank"  to={'/vacancy/' + vacancy._id}>
                  View
                </LinkItem>
              </TableCell>
              <TableCell align="right">
                <Button onClick={() => handleDeleteVacancy(vacancy._id)} variant="contained">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
