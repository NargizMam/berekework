import React, { PropsWithChildren } from 'react';
import MainNavAdmin from './MainNavAdmin';
import Container from '@mui/material/Container';

const AdminLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          padding: '20px',
          border: '1px solid black',
        }}
      >
        <MainNavAdmin />
        <main style={{ border: '1px solid red' }}>
          <Container sx={{ border: '1px solid black' }}>{children}</Container>
        </main>
      </Container>
    </>
  );
};
export default AdminLayout;
