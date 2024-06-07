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
];

export const MyPotentialEmployeeTable = () => {
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
              <TableCell align="left">{row.status === 'Заинтересован' ? row.contacts : ''}</TableCell>
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
