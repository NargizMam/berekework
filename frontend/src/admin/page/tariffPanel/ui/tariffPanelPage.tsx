import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectTariffs, selectTariffsLoading } from '../model/tariffSlice';
import { deleteTariff, getAllTariff } from '../api/tariffThunk';
import {
  Box,
  Button,
  Link,
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
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export const TariffPanelPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px 0' }}>
      <Box sx={{ display: 'flex', justifyContent: 'right' }}>
        <Link
          sx={{
            background: 'green',
            padding: '5px',
            color: '#fff',
            borderRadius: '5px',
          }}
          underline="none"
          component={RouterLink}
          to="/admin/tariffs-new"
        >
          <Typography>Create</Typography>
        </Link>
      </Box>
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
              <>
                {tariff.tariffs.map((item) => (
                  <TableRow key={item._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {item.title}
                    </TableCell>
                    <TableCell>{item.description.join(', ')}</TableCell>
                    <TableCell align="right">
                      <Button onClick={() => navigate(`/admin/tariffs-submit/${tariff._id}`)} variant="contained">
                        Change
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button onClick={() => handleDeleteTariff(tariff._id)} variant="contained">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
