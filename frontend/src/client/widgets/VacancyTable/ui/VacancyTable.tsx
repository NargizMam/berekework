import React from 'react';
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
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import { VacancyApiData } from '../../../../app/types';
import { Link, useNavigate } from 'react-router-dom';

dayjs.extend(LocalizedFormat);

interface Props {
  vacancies: VacancyApiData[];
  vacancyDelete: (id: string) => void;
  deleteLoading: boolean;
}

export const VacancyTable: React.FC<Props> = ({ vacancies, vacancyDelete, deleteLoading }) => {
  const navigate = useNavigate();

  const onEdit = (id: string) => {
    navigate(`/vacancy/edit/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }}>
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell align="left">Дата создание</TableCell>
            <TableCell align="left">Дата обновление</TableCell>
            <TableCell align="left">Действие</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vacancies.map((row) => (
            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Tooltip title="Посмотреть вакансию">
                  <Typography component={Link} sx={{ fontWeight: '600' }} to={`/vacancy/${row._id}`}>
                    {row.vacancyTitle}
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell align="left"> {dayjs(row.createdAt).format('lll')}</TableCell>
              <TableCell align="left"> {dayjs(row.updatedAt).format('lll')}</TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', justifyContent: 'spaceBetween' }}>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: 'green', marginRight: 1 }}
                    onClick={() => onEdit(row._id)}
                  >
                    Редактировать
                  </Button>
                  <Button variant="contained" onClick={() => vacancyDelete(row._id)} disabled={deleteLoading}>
                    Удалить
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
