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
          sx={{position: 'fixed', top: 'auto', right: 20, zIndex: 999, margin: '5px'}}
          underline="none"
          component={RouterLink}
          to="/admin/employers-submit"
        >
          <Typography>
            Create
          </Typography>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Foundation Year</TableCell>
              <TableCell>Industry</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Contacts</TableCell>
              <TableCell>Document</TableCell>
              <TableCell align="right">Published</TableCell>
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
                  {employer.foundationYear}
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
                  {employer.contacts}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Link href={API_URL + '/' + employer.document}>PDF</Link>
                </TableCell>
                <TableCell>{employer.isPublished}</TableCell>
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
