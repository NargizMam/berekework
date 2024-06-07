import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ApplicationResponse } from '../../../../feachers/aplication/types';
import React from 'react';
import { getCandidates, updateApplication } from '../../../../feachers/aplication/aplicationThunk';
import { useAppDispatch } from '../../../../app/store/hooks';

interface Props {
  data: ApplicationResponse[];
  deleteHandle: (id: string) => void;
}

export const NewPotentialEmployeeTable: React.FC<Props> = ({ data, deleteHandle }) => {
  const dispatch = useAppDispatch();

  const acceptedHandle = async (id: string) => {
    await dispatch(updateApplication({ id, employerStatus: 'Принят' })).unwrap();
    await dispatch(getCandidates());
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }}>
        <TableHead>
          <TableRow>
            <TableCell>ФИО</TableCell>
            <TableCell align="left">Возраст</TableCell>
            <TableCell align="left">Специальность</TableCell>
            <TableCell align="left">Вакансия</TableCell>
            <TableCell align="left">Статус</TableCell>
            <TableCell align="left">Контакты</TableCell>
            <TableCell align="left">Действие</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Tooltip title="Посмотреть профиль">
                  <Typography component={Link} sx={{ fontWeight: '600' }} to={`/user/${row.user._id}`}>
                    {row.user.surname} {row.user.name}
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell align="left">{row.user.dateOfBirth}</TableCell>
              <TableCell align="left">{row.user.preferredJob}</TableCell>
              <TableCell align="left">
                <Tooltip title="Посмотреть вакансию">
                  <Typography component={Link} sx={{ fontWeight: '600' }} to={`/vacancy/${row.vacancy._id}`}>
                    {row.vacancy.vacancyTitle}
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell align="left">{row.employerStatus}</TableCell>
              <TableCell align="left">{row.user.contacts.phone}</TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', justifyContent: 'spaceBetween' }}>
                  {row.employerStatus !== 'Принят' && (
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: 'green', marginRight: 1 }}
                      onClick={() => acceptedHandle(row._id)}
                    >
                      Принять
                    </Button>
                  )}
                  <Button variant="contained" onClick={() => deleteHandle(row._id)}>
                    Отклонить
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
