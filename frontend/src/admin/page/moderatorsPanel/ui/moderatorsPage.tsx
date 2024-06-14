import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { deleteModerator, getAllModerators } from '../api/moderatorsThunk';
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
  Typography,
} from '@mui/material';
import { Loader } from '../../../../shared/loader';
import { selectModerators, selectModeratorsLoading } from '../model/moderatorsSlice';
import { ModeratorsForm } from './moderatorsForm';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const ModeratorsPage = () => {
  const dispatch = useAppDispatch();
  const moderators = useAppSelector(selectModerators);
  const loading = useAppSelector(selectModeratorsLoading);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    dispatch(getAllModerators());
  }, [dispatch]);

  const onDeleteModerator = async (id: string) => {
    await dispatch(deleteModerator(id)).unwrap();
    dispatch(getAllModerators());
  };

  return (
    <Box>
      {loading && <Loader />}
      <Button variant="outlined" onClick={() => setOpenForm(true)}>
        Создать модератора
      </Button>
      {moderators.length === 0 ? (
        <Typography sx={{ mt: 2 }}>Модераторы еще не созданы</Typography>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ mt: 5 }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">e-mail</TableCell>
                  <TableCell align="left">Роль</TableCell>
                  <TableCell align="left">Дата создания</TableCell>
                  <TableCell align="left">Дата редактирования</TableCell>
                  <TableCell align="left">Удалить</TableCell>
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
                      <Button onClick={() => onDeleteModerator(moderator._id)}>
                        <DeleteForeverIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {openForm && <ModeratorsForm close={() => setOpenForm(false)} />}
    </Box>
  );
};
