import React, { useState } from 'react';
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
import ModalCrm from '../modalCrm/ModalCrm';

interface Props {
  moderators: ModeratorApi[];
  onArchiveModerator: (id: string) => void;
  isArchive?: boolean;
}

const ModeratorTableCrm: React.FC<Props> = ({ moderators, onArchiveModerator, isArchive = false }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const onModeratorDelete = async () => {
    if (isOpen) {
      try {
        await dispatch(deleteModerator(isOpen)).unwrap();
        await dispatch(getAllArchive());
        toast.success('Модератор удален!');
        setIsOpen(null);
      } catch (error) {
        toast.error('Что то пошло не так!');
        setIsOpen(null);
      }
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
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
                        <IconButton onClick={() => setIsOpen(moderator._id)}>
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
      <ModalCrm
        title={'удаление'}
        text={'Вы действительно хотите удалить этого модератора?'}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDeleteConfirm={onModeratorDelete}
      />
    </>
  );
};

export default ModeratorTableCrm;
