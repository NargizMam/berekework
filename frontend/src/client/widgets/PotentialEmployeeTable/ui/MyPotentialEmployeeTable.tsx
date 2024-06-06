import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const data: {
  employeeId: string;
  employeeName: string;
  age: string;
  fieldOfWork: string;
  status: string;
  contacts: string;
}[] = [
  {
    employeeId: '123',
    employeeName: 'Ivan Ivanov',
    age: '22',
    fieldOfWork: 'Повар',
    status: 'Отклонен',
    contacts: '',
  },
  {
    employeeId: '124',
    employeeName: 'Maria Petrova',
    age: '28',
    fieldOfWork: 'Бармен',
    status: 'Заинтересован',
    contacts: 'maria@example.com',
  },
  {
    employeeId: '125',
    employeeName: 'Alexey Sidorov',
    age: '35',
    fieldOfWork: 'Менеджер',
    status: 'Ожидание ответа',
    contacts: '',
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
            <TableCell align="left">Статус</TableCell>
            <TableCell align="left">Контакты</TableCell>
            <TableCell align="center">Действие</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.employeeId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.employeeName}
              </TableCell>
              <TableCell align="left">{row.age}</TableCell>
              <TableCell align="left">{row.fieldOfWork}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left">{row.contacts}</TableCell>
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
