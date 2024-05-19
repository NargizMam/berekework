import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectEmployerLoading, selectEmployers } from '../model/employerSlice';
import { deleteEmployer, getAllEmployer } from '../api/employerThunk';
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
  TableRow, Typography,
} from '@mui/material';
import { Loader } from '../../../../shared/loader';
import { Link as RouterLink } from 'react-router-dom';
import { API_URL } from '../../../../app/constants/links';

export const EmployerPanelPage = () => {
  const dispatch = useAppDispatch();
  const employers = useAppSelector(selectEmployers);
  const loading = useAppSelector(selectEmployerLoading);

  useEffect(() => {
    dispatch(getAllEmployer());
  }, [dispatch]);

  const handleDeleteEmployer = async (id: string) => {
    await dispatch(deleteEmployer(id)).unwrap();
    await dispatch(getAllEmployer());
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px 0' }}>
      <Box sx={{display: 'flex', justifyContent: 'right'}}>
        <Link
          sx={{ position: 'fixed', top: '14%', right: 100, zIndex: 999 , border: '1px solid #ccc', p: 1, borderRadius: '5px'}}
          underline="none"
          component={RouterLink}
          to="/admin/employers-submit"
        >
          <Typography>
            Create employer
          </Typography>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 , mt: 4}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Industry</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Document</TableCell>
              <TableCell>Foundation Year</TableCell>
              <TableCell align="right">Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employers.map((employer) => (
              <TableRow key={employer._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {employer.email}
                </TableCell>
                <TableCell component="th" scope="row">
                  {employer.companyName}
                </TableCell>
                <TableCell component="th" scope="row">
                  <img src={API_URL + '/' + employer.logo} alt="Logo" />
                </TableCell>
                <TableCell component="th" scope="row">
                  {employer.industry}
                </TableCell>
                <TableCell component="th" scope="row">
                  {employer.description}
                </TableCell>
                <TableCell component="th" scope="row">
                  {employer.address}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Link href={API_URL + '/' + employer.document}>PDF</Link>
                </TableCell>
                <TableCell component="th" scope="row">
                  {employer.foundationYear}
                </TableCell>
                <TableCell>{employer.role}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleDeleteEmployer(employer._id)} variant="contained">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
