import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectTariffs, selectTariffsLoading } from '../model/tariffSlice';
import { getAllTariff } from '../api/tariffThunk';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Loader } from '../../../../shared/loader';

export const TariffPanelPage = () => {
  const dispatch = useAppDispatch();
  const tariffs = useAppSelector(selectTariffs);
  const loading = useAppSelector(selectTariffsLoading);

  useEffect(() => {
    dispatch(getAllTariff());
  }, [dispatch]);

  if(loading) {
    return <Loader/>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tariffs.map((tariff) => (
            <TableRow
              key={tariff._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {tariff.title}
              </TableCell>
              <TableCell align="right">{tariff.description.join(' ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};