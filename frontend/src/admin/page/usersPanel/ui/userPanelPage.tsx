import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { deleteUser, getAllUser } from '../api/usersThunk';
import { selectUsers, selectUsersLoading } from '../model/usersSlice';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Loader } from '../../../../shared/loader';

export const UserPanelPage = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const loading = useAppSelector(selectUsersLoading);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const handleDeleteUser = async (id: string) => {
    await dispatch(deleteUser(id)).unwrap();
    await dispatch(getAllUser());
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Prof</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Country</TableCell>
            <TableCell align="right">Role</TableCell>
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
                <Button onClick={() => handleDeleteUser(user._id)} variant="contained">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
