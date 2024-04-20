import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';
import MainNav from '../layout/Main-nav';
import SideNav from '../layout/Side-nav';
import {Outlet} from "react-router-dom";


interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps): React.JSX.Element => (
  <>
    <GlobalStyles
      styles={{
        body: {
          '--MainNav-height': '56px',
          '--MainNav-zIndex': 1000,
          '--SideNav-width': '280px',
          '--SideNav-zIndex': 1100,
          '--MobileNav-width': '320px',
          '--MobileNav-zIndex': 1100,
        },
      }}
    />
    <Box
      sx={{
        bgcolor: 'var(--mui-palette-background-default)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        minHeight: '100%',
      }}
    >
      <SideNav/>
      <Box sx={{display: 'flex', flex: '1 1 auto', flexDirection: 'column', pl: {lg: 'var(--SideNav-width)'}}}>
        <MainNav/>
        <main>
          <Container maxWidth="xl" sx={{py: '64px'}}>
            {children}
              <Outlet/>
          </Container>
        </main>
      </Box>
    </Box>
  </>
);
export default Layout;
