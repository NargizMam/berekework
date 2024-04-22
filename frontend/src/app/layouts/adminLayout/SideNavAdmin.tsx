import React from 'react';
import { Box, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { SIDE_BAR_LINKS } from '../../constants/links';

const SideNavAdmin: React.FC = () => {
  return (
    <Box
      sx={{
        '--SideNav-background': 'var(--mui-palette-neutral-950)',
        '--SideNav-color': 'var(--mui-palette-common-white)',
        '--NavItem-color': 'var(--mui-palette-neutral-300)',
        '--NavItem-hover-background': 'rgba(255, 255, 255, 0.04)',
        '--NavItem-active-background': 'var(--mui-palette-primary-main)',
        '--NavItem-active-color': 'var(--mui-palette-primary-contrastText)',
        '--NavItem-disabled-color': 'var(--mui-palette-neutral-500)',
        '--NavItem-icon-color': 'var(--mui-palette-neutral-400)',
        '--NavItem-icon-active-color': 'var(--mui-palette-primary-contrastText)',
        '--NavItem-icon-disabled-color': 'var(--mui-palette-neutral-600)',
        bgcolor: '#ccc',
        color: '#fff',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        height: '100%',
        left: 0,
        maxWidth: '100%',
        position: 'fixed',
        scrollbarWidth: 'none',
        top: 0,
        width: 'var(--SideNavAdmin-width)',
        zIndex: 'var(--SideNavAdmin-zIndex)',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      <Typography
        sx={{ p: '12px', textAlign: 'center', color: 'black', textDecoration: 'none', fontWeight: 'bold' }}
        component={Link}
        to="/"
      >
        Bereke Admin
      </Typography>
      <Divider sx={{ borderColor: '#000' }} />
      <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
        <List>
          {SIDE_BAR_LINKS.map((sideLink) => (
            <ListItem disablePadding key={sideLink.id}>
              <ListItemButton component={Link} to={sideLink.path} sx={{
                borderRadius: '4px',
                marginBottom: '8px',
                width: '100%',
                borderBottom: '1px solid #000',
              }}>
                <ListItemText primary={sideLink.value} />
              </ListItemButton>
            </ListItem>
          ))}
         {/* <ListItem disablePadding>
            <ListItemButton component={Link} to="pages" sx={{
              borderRadius: '4px',
              marginBottom: '8px',
              width: '100%',
              borderBottom: '1px solid #000',
            }}>
              <ListItemText primary="Pages" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="users" sx={{
              borderRadius: '4px',
              marginBottom: '8px',
              width: '100%',
              borderBottom: '1px solid #000',
            }}>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="vacance" sx={{
              borderRadius: '4px',
              marginBottom: '8px',
              width: '100%',
              borderBottom: '1px solid #000',
            }}>
              <ListItemText primary="Vacance" />
            </ListItemButton>
          </ListItem>*/}
        </List>
      </Box>
      <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />
    </Box>
  );
};

export default SideNavAdmin;
