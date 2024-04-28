import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import MainNavAdmin from './MainNavAdmin';


interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: LayoutProps): React.JSX.Element => {

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '100%',
          padding: '20px'
        }}
      >
        <MainNavAdmin/>
        <main>
          <Container sx={{mx: '18%'}}>
            {children}
            <Outlet/>
          </Container>
        </main>
      </Box>
    </>
  );

};
export default AdminLayout;