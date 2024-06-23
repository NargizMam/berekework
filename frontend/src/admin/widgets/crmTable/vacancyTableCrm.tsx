import React from 'react';
import {
  IconButton,
  ListItemButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { VacancyApiData } from '../../../app/types';
import DeleteIcon from '@mui/icons-material/Delete';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import ArchiveIcon from '@mui/icons-material/Archive';
import { deleteVacancy } from '../../../feachers/vacancy/vacancyThunk';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../app/store/hooks';
import { getAllArchive } from '../../../feachers/user/usersThunk';

interface Props {
  vacancies: VacancyApiData[];
  archiveVacancyClick?: (id: string) => void;
  unArchiveVacancyClick?: (id: string, isArchive: boolean, employeeEmail: string) => void;
  isArchive?: boolean;
}

const LinkItem = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const VacancyTableCrm: React.FC<Props> = ({
  vacancies,
  isArchive = false,
  archiveVacancyClick,
  unArchiveVacancyClick,
}) => {
  const dispatch = useAppDispatch();

  const onDeleteVacancy = async (id: string) => {
    try {
      await dispatch(deleteVacancy(id));
      await dispatch(getAllArchive());
      toast.success('Вакансия удалена!');
    } catch (error) {
      toast.error('Что то пошло не так!');
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell>Вид занятости</TableCell>
            <TableCell align="right">Компания</TableCell>
            <TableCell>Город</TableCell>
            <TableCell>Заработная плата</TableCell>
            <TableCell>Дата создания</TableCell>
            <TableCell>Дата редактирования</TableCell>
            <TableCell align="center" colSpan={2}>
              Дейсвие
            </TableCell>
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
                {isArchive ? (
                  <>
                    {unArchiveVacancyClick && (
                      <Tooltip title={'Восстановить вакансию'}>
                        <IconButton
                          onClick={() =>
                            unArchiveVacancyClick(vacancy._id, vacancy.employer.isArchive, vacancy.employer.email)
                          }
                        >
                          <UnarchiveIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title={'Удалить вакансию'}>
                      <IconButton onClick={() => onDeleteVacancy(vacancy._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : (
                  archiveVacancyClick && (
                    <Tooltip title={'Архивировать вакансию'}>
                      <IconButton onClick={() => archiveVacancyClick(vacancy._id)}>
                        <ArchiveIcon />
                      </IconButton>
                    </Tooltip>
                  )
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VacancyTableCrm;
