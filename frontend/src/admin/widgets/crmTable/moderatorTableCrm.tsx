import React from 'react';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import { ModeratorApi } from '../../../types';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useAppDispatch } from '../../../app/store/hooks';
import { getAllArchive } from '../../../feachers/user/usersThunk';
import { toast } from 'react-toastify';
import { deleteModerator } from '../../page/moderatorsPanel/api/moderatorsThunk';

interface Props {
  moderators: ModeratorApi[];
  onArchiveModerator: (id: string) => void;
  isArchive?: boolean;
}

const ModeratorTableCrm: React.FC<Props> = ({ moderators, onArchiveModerator, isArchive = false }) => {
  const dispatch = useAppDispatch();

  const onModeratorDelete = async (id: string) => {
    try {
      await dispatch(deleteModerator(id)).unwrap();
      await dispatch(getAllArchive());
      toast.success('Модератор удален!');
    } catch (error) {
      toast.error('Что то пошло не так!');
    }
    console.log(id);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 5 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="left">e-mail</TableCell>
            <TableCell align="left">Роль</TableCell>
            <TableCell align="left">Дата создания</TableCell>
            <TableCell align="left">Дата редактирования</TableCell>
            <TableCell align="left">Действие</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {moderators.map((moderator) => (
            <TableRow key={moderator._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left">{moderator.email}</TableCell>
              <TableCell align="left">{moderator.role}</TableCell>
              <TableCell align="left">{new Date(moderator.createdAt).toLocaleString()}</TableCell>
              <TableCell align="left">{new Date(moderator.updatedAt).toLocaleString()}</TableCell>
              <TableCell align="left">
                {isArchive ? (
                  <>
                    <Tooltip title={'Восстановить модератора'}>
                      <IconButton onClick={() => onArchiveModerator(moderator._id)}>
                        <UnarchiveIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={'Удалить модератора'}>
                      <IconButton onClick={() => onModeratorDelete(moderator._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : (
                  <Tooltip title={'Архивировать модератора'}>
                    <IconButton onClick={() => onArchiveModerator(moderator._id)}>
                      <ArchiveIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ModeratorTableCrm;
