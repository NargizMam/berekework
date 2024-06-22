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
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from '../../../app/types';

interface Props {
  users: User[];
  archiveUser: (id: string) => void;
  isArchive?: boolean;
}

const UserCrmTable: React.FC<Props> = ({ users, archiveUser, isArchive = false }) => {
  const deleteUser = (id: string) => {
    console.log(id);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Профессия</TableCell>
              <TableCell>Номер</TableCell>
              <TableCell>Город</TableCell>
              <TableCell>Страна</TableCell>
              <TableCell align="right">Роль</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {user.email}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.preferredJob}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.contacts?.phone}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.city}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.country}
                </TableCell>
                <TableCell align="right">{user.role}</TableCell>
                <TableCell align="right">
                  {isArchive ? (
                    <>
                      <Tooltip title={'Восстановить пользователя'}>
                        <IconButton onClick={() => archiveUser(user._id)}>
                          <UnarchiveIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={'Удалить пользователя'}>
                        <IconButton onClick={() => deleteUser(user._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : (
                    <Tooltip title={'Архивировать пользователя'}>
                      <IconButton onClick={() => archiveUser(user._id)}>
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
    </>
  );
};

export default UserCrmTable;
