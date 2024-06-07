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

/*const data: {
  employeeId: string;
  employeeName: string;
  vacancyTitle: string;
  age: string;
  fieldOfWork: string;
  status: string;
  contacts: string;
}[] = [
  {
    employeeId: '123',
    employeeName: 'Ivan Ivanov',
    vacancyTitle: 'Вакансия повара',
    age: '22',
    fieldOfWork: 'Повар',
    status: 'Отклонен',
    contacts: '888777555',
  },
  {
    employeeId: '124',
    employeeName: 'Maria Petrova',
    vacancyTitle: 'Вакансия бармена',
    age: '28',
    fieldOfWork: 'Бармен',
    status: 'Заинтересован',
    contacts: '888777555',
  },
  {
    employeeId: '125',
    employeeName: 'Alexey Sidorov',
    vacancyTitle: 'Вакансия менеджера',
    age: '35',
    fieldOfWork: 'Менеджер',
    contacts: '888777555',
    status: 'Ожидание ответа',
  },
];*/

interface Props {
  data: ApplicationResponse[];
}

export const MyPotentialEmployeeTable: React.FC<Props> = ({ data }) => {
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
                <Button variant="contained">Отклонить</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
