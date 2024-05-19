import * as React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavAdmin from './MainNavAdmin';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: LayoutProps): React.JSX.Element => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.between('md','xl'));
  console.log(isSmallScreen, isMediumScreen);
  const getPadding = () => {
    if (isSmallScreen) return '30%';
    if (isMediumScreen) return '18%';
    if (isLargeScreen) return '18%';
    return '0%';
  };

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          padding: '20px'
        }}
      >
        <MainNavAdmin/>
        <main>
          <Container maxWidth="xl" sx={{ mx: getPadding() }}>
            {children}
            <Outlet/>
          </Container>
        </main>
      </Container>
    </>
  );
};

export default AdminLayout;
