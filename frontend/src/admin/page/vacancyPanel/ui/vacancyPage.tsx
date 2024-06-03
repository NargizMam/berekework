import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { deleteVacancy, getAllVacancy } from '../api/vacancyThunk';
import { selectVacancies, selectVacanciesLoading } from '../model/vacancySlice';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Loader } from '../../../../shared/loader';

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

  if (loading) {
    return <Loader />;
  }

  console.log(vacancies);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
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
                {vacancy.title}
              </TableCell>
              <TableCell align="right">{vacancy.company}</TableCell>
              <TableCell align="right">{vacancy.city}</TableCell>
              {vacancy.salary ? (
                <TableCell align="right">
                  {vacancy.salary.min} - {vacancy.salary.max}
                </TableCell>
              ) : (
                <TableCell align="right">No salary</TableCell>
              )}
              <TableCell align="right">{vacancy.createdAt}</TableCell>
              <TableCell align="right">{vacancy.updatedAt}</TableCell>
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
