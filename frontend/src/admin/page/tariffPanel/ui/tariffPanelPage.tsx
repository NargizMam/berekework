import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectTariffs, selectTariffsLoading } from '../model/tariffSlice';
import { deleteTariff, getAllTariff } from '../api/tariffThunk';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Loader } from '../../../../shared/loader';

export const TariffPanelPage = () => {
  const dispatch = useAppDispatch();
  const tariffs = useAppSelector(selectTariffs);
  const loading = useAppSelector(selectTariffsLoading);

  useEffect(() => {
    dispatch(getAllTariff());
  }, [dispatch]);

  const handleDeleteTariff = async (id: string) => {
    await dispatch(deleteTariff(id));
    await dispatch(getAllTariff());
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tariffs.map((tariff) => (
            <TableRow key={tariff._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {tariff.title}
              </TableCell>
              <TableCell>{tariff.description.join(', ')}</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleDeleteTariff(tariff._id)} variant="contained">
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
