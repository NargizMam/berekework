import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { deleteModerator, getAllModerators } from '../api/moderatorsThunk';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { Loader } from '../../../../shared/loader';
import { selectModerators, selectModeratorsLoading } from '../model/moderatorsSlice';
import { ModeratorsForm } from './moderatorsForm';

export const ModeratorsPage = () => {
  const dispatch = useAppDispatch();
  const moderators = useAppSelector(selectModerators);
  const loading = useAppSelector(selectModeratorsLoading);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    dispatch(getAllModerators());
  }, [dispatch]);

  if (loading) {
    return <Loader/>;
  }
  const onDeleteModerator = async (id: string) => {
    await dispatch(deleteModerator(id)).unwrap();
    dispatch(getAllModerators());
  };

  return (
    <>
      {loading && <Loader/>}
      {moderators.length === 0 ??
        <Typography>Модераторы еще не созданы</Typography>}
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}}>
            <TableHead>
              <TableRow>
                <TableCell align="left">e-mail</TableCell>
                <TableCell align="left">Role</TableCell>
                <TableCell align="left">Created</TableCell>
                <TableCell align="left">Updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {moderators.map((moderator) => (
                <TableRow key={moderator._id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                  <TableCell align="left">{moderator.email}</TableCell>
                  <TableCell align="left">{moderator.password}</TableCell>
                  <TableCell align="left">{moderator.role}</TableCell>
                  <TableCell align="left">{moderator.createdAt}</TableCell>
                  <TableCell align="left">{moderator.updatedAt}</TableCell>
                  <TableCell align="left">
                    <Button onClick={() => onDeleteModerator(moderator._id)}>X</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{position: 'fixed', top: 'auto', right: 20, zIndex: 999, margin: '5px'}}>
          <Button variant="outlined" onClick={() =>setOpenForm(true)}>Create moderator</Button>
        </div>
      {openForm && <ModeratorsForm close={() =>setOpenForm(false)}/>}
    </>

  );
};
