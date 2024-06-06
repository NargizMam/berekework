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

const data: {
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
    vacancyTitle: 'Повар',
    age: '22',
    fieldOfWork: 'Повар',
    status: 'Новая заявка',
    contacts: '888999444',
  },
  {
    employeeId: '124',
    employeeName: 'Maria Petrova',
    vacancyTitle: 'Вакансия Бармен',
    age: '28',
    fieldOfWork: 'Бармен',
    status: 'Принят',
    contacts: '999888777',
  },
  {
    employeeId: '125',
    employeeName: 'Alexey Sidorov',
    vacancyTitle: 'Вакансия Менеджер',
    age: '35',
    fieldOfWork: 'Менеджер',
    status: 'Принят',
    contacts: '999888777',
  },
];

export const NewPotentialEmployeeTable = () => {
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
            <TableRow key={row.employeeId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Tooltip title="Посмотреть профиль">
                  <Typography component={Link} sx={{ fontWeight: '600' }} to={`/potential-employees/${row.employeeId}`}>
                    {row.employeeName}
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell align="left">{row.age}</TableCell>
              <TableCell align="left">{row.fieldOfWork}</TableCell>
              <TableCell align="left">{row.vacancyTitle}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left">{row.contacts}</TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', justifyContent: 'spaceBetween' }}>
                  <Button variant="contained" sx={{ backgroundColor: 'green', marginRight: 1 }}>
                    Принять
                  </Button>
                  <Button variant="contained">Отклонить</Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
