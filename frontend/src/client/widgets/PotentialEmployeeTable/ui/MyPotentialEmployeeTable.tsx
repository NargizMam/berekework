import {
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

interface Props {
  data: ApplicationResponse[];
  deleteHandle: (id: string) => void;
}

export const MyPotentialEmployeeTable: React.FC<Props> = ({ data, deleteHandle }) => {
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
            <TableCell align="center">Действие</TableCell>
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
              <TableCell align="left">
                {row.employerStatus === 'Заинтересован' ? row.user.contacts.phone : ''}
              </TableCell>
              <TableCell align="center">
                <Button variant="contained" onClick={() => deleteHandle(row._id)}>
                  {row.employerStatus === 'Отклонен' ? 'Удалить запись' : 'Отклонить'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
