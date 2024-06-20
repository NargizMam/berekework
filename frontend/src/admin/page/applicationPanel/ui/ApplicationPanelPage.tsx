import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import {
  selectApplicationDeleteLoading,
  selectCandidates,
  selectCandidatesLoading,
} from '../../../../feachers/aplication/applicationSlice';
import { deleteReply, getCandidateByEmployer } from '../../../../feachers/aplication/aplicationThunk';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { Loader } from '../../../../shared/loader';
import StatusHistoryModal from './StatusHistoryModal';
import { ApplicationByVacancy, StatusHistory } from '../../../../app/types';

export const ApplicationPanelPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const applications = useAppSelector(selectCandidates);
  const isApplicationsLoading = useAppSelector(selectCandidatesLoading);
  const deleteLoading = useAppSelector(selectApplicationDeleteLoading);
  const [openModal, setOpenModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<StatusHistory[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [applicationIdToDelete, setApplicationIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(getCandidateByEmployer(id)).then((action) => {
        if (action.meta.requestStatus === 'rejected') {
          setNotFound(true);
        }
      });
    } else {
      setNotFound(true);
    }
  }, [dispatch, id, navigate]);

  const handleViewHistory = (history: StatusHistory[]) => {
    setSelectedHistory(history);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedHistory([]);
  };

  const handleDeleteClick = (applicationId: string) => {
    setApplicationIdToDelete(applicationId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (applicationIdToDelete) {
      await dispatch(deleteReply(applicationIdToDelete));
      if (id) {
        dispatch(getCandidateByEmployer(id));
      }
      setDeleteDialogOpen(false);
      setApplicationIdToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setApplicationIdToDelete(null);
  };

  if (isApplicationsLoading) {
    return <Loader />;
  }

  if (notFound) {
    navigate('/not-found');
    return null;
  }

  if (applications.length === 0) {
    return (
      <Box>
        <Typography variant='h6' component='div' sx={{ marginBottom: 1 }}>
          Нет откликов соискателей на эту вакансию.
        </Typography>
        <Typography variant='h6' component='div' sx={{ marginBottom: 1 }}>
          Работодатели не оставили откликов на потенциальных сотрудников для этой вакансии.
        </Typography>
      </Box>
    );
  }

  const companyName = applications.length > 0 ? applications[0].vacancy.employer.companyName : '';
  const vacancyTitle = applications.length > 0 ? applications[0].vacancy.vacancyTitle : '';

  return (
    <>
      <Typography variant='h6' component='div' sx={{ marginBottom: 1 }}>
        {companyName}
      </Typography>
      <Typography variant='subtitle1' component='div' sx={{ marginBottom: 1 }}>
        {vacancyTitle}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='applications table'>
          <TableHead>
            <TableRow>
              <TableCell>Кандидат</TableCell>
              <TableCell>Статус кандидата</TableCell>
              <TableCell>Статус работодателя</TableCell>
              <TableCell>Дата подачи</TableCell>
              <TableCell>Дата обновления</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application: ApplicationByVacancy) => (
              <TableRow key={application._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{application.user.email}</TableCell>
                <TableCell>{application.userStatus}</TableCell>
                <TableCell>{application.employerStatus}</TableCell>
                <TableCell>{dayjs(application.createdAt).format('DD MMMM YYYY')}</TableCell>
                <TableCell>{dayjs(application.updatedAt).format('DD MMMM YYYY')}</TableCell>
                <TableCell align='right'>
                  <Button sx={{ whiteSpace: 'noWrap' }} variant='contained'
                          onClick={() => handleViewHistory(application.statusHistory)}>
                    Просмотр
                  </Button>
                </TableCell>
                <TableCell align='right'>
                  <Button variant='contained' onClick={() => handleDeleteClick(application._id)} disabled={deleteLoading}>
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <StatusHistoryModal open={openModal} handleClose={handleCloseModal} history={selectedHistory} />

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Подтвердите удаление</DialogTitle>
        <DialogContent>Вы действительно хотите удалить эту заявку и все связанные с ней отклики?</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirm} color='primary'>
            Да
          </Button>
          <Button onClick={handleDeleteCancel} color='secondary'>
            Нет
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
