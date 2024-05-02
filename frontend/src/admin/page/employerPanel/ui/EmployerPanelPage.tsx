import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectEmployerLoading, selectEmployers } from '../model/employerSlice';
import { deleteEmployer, getAllEmployer } from '../api/employerThunk';
import { Button, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Loader } from '../../../../shared/loader';
import { Link as RouterLink } from 'react-router-dom';

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

  if(loading) {
    return <Loader/>;
  }

  return (
    <TableContainer component={Paper}>
      <Link component={RouterLink} to='/admin/new-employer'>Create</Link>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Scope</TableCell>
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
                {employer.action}
              </TableCell>
              <TableCell component="th" scope="row">
                {employer.scope}
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
  );
};
