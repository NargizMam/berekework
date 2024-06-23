import React from 'react';
import {
  IconButton,
  Link,
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
import { API_URL } from '../../../app/constants/links';
import EditIcon from '@mui/icons-material/Edit';
import { Link as RouterLink } from 'react-router-dom';
import ArchiveIcon from '@mui/icons-material/Archive';
import { Employer } from '../../page/employerPanel/model/types';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllArchive } from '../../../feachers/user/usersThunk';
import { deleteEmployer } from '../../page/employerPanel/api/employerThunk';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../app/store/hooks';

interface Props {
  employers: Employer[];
  archiveLoading: boolean;
  handleClickOpen?: (id: string, email: string) => void;
  handleArchiveEmployer: (id: string, email: string) => void;
  daysLeftMap?: { [key: string]: number };
  isArchive?: boolean;
}

const EmployeeTable: React.FC<Props> = ({
  employers,
  archiveLoading,
  handleClickOpen,
  handleArchiveEmployer,
  daysLeftMap = {},
  isArchive = false,
}) => {
  const dispatch = useAppDispatch();

  const onDeleteEmployee = async (id: string, email: string) => {
    try {
      await dispatch(deleteEmployer({ id, email })).unwrap();
      await dispatch(getAllArchive());
      toast.success(`${email} удален!`);
    } catch (error) {
      toast.error('Что то пошло не так!');
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500, overflowX: 'auto' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Название компании</TableCell>
            <TableCell align="left">Вид деятельности</TableCell>
            <TableCell align="left">Адрес</TableCell>
            <TableCell align="left">Контакты</TableCell>
            <TableCell align="left">Документы</TableCell>
            {!isArchive ? (
              <>
                <TableCell align="left">Статус</TableCell>
                <TableCell align="left">До конца подписки</TableCell>
                <TableCell align="left">Оплата</TableCell>
              </>
            ) : (
              ''
            )}
            <TableCell align="center" colSpan={2}>
              Дейсвие
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employers.map((employer) => (
            <TableRow key={employer._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {employer.email}
              </TableCell>
              <TableCell component="th" scope="row">
                {employer.companyName}
              </TableCell>
              <TableCell component="th" scope="row">
                {employer.industry}
              </TableCell>
              <TableCell component="th" scope="row">
                {employer.address}
              </TableCell>
              <TableCell component="th" scope="row">
                {employer.contacts}
              </TableCell>
              <TableCell component="th" scope="row">
                <Link target="_blank" href={API_URL + '/' + employer.documents}>
                  PDF
                </Link>
              </TableCell>
              {!isArchive ? (
                <>
                  <TableCell>{employer.tariff.titleTariff}</TableCell>
                  <TableCell>{daysLeftMap[employer._id]}</TableCell>
                  <TableCell>{employer.isPublished ? 'Оплатил' : 'Не оплатил'}</TableCell>
                  <TableCell align="right">
                    {handleClickOpen && (
                      <Tooltip title={'Изменить статус'}>
                        <IconButton onClick={() => handleClickOpen(employer._id, employer.email)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Link underline="none" component={RouterLink} to={`/admin/employers-submit/${employer._id}`}>
                      <Typography>Изменить</Typography>
                    </Link>
                  </TableCell>
                </>
              ) : (
                ''
              )}
              <TableCell align="center">
                {!isArchive ? (
                  <Tooltip title={'Архивировать работодателя'}>
                    <IconButton
                      aria-label="delete"
                      disabled={archiveLoading}
                      onClick={() => handleArchiveEmployer(employer._id, employer.email)}
                    >
                      <ArchiveIcon sx={{ fontSize: '30px' }} />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <>
                    <Tooltip title={'Восстановить работодателя'}>
                      <IconButton onClick={() => handleArchiveEmployer(employer._id, employer.email)}>
                        <UnarchiveIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={'Удалить работодателя'}>
                      <IconButton onClick={() => onDeleteEmployee(employer._id, employer.email)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
