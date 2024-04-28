import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { SIDE_BAR_LINKS } from '../../constants/links';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import React from 'react';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export interface SideNavProps {
  open?: boolean;
  onClose?: () => void;
}

export const SideNavAdmin: React.FC<SideNavProps> = ({open, onClose}) => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        bgcolor: '#cfd8dc',
        flexDirection: 'column',
        height: '100%',
        left: 0,
        width: '18%',
        display: open ? 'flex' : 'none',
        padding: '5px',
        position: 'fixed',
        scrollbarWidth: 'none',
        top: 0,
        transition: 'width 0.3s ease-in-out',
        overflowX: 'hidden',
        '&:hover': {
          width: '18%'
        },
      }}
    >
      <Typography
        variant={open ? 'h6' : 'body1'}
        paddingTop={4}
        paddingBottom={2}
        sx={{color: 'black', textDecoration: 'none'}}
        component={Link}
        to="/admin"
      >
        Bereke Admin
      </Typography>
      {isMobileScreen &&
      <FirstPageIcon onClick={onClose}
                     sx={{
                       position: 'absolute',
                       top: '10px',
                       right: '10px',
                       cursor: 'pointer'}}/>}
      <Divider sx={{mt: '10px'}}/>
      <Box component="nav" sx={{flex: '1 1 auto', p: '12px'}}>
        <List>
          {SIDE_BAR_LINKS.map((sideLink) => (
            <ListItem disablePadding key={sideLink.id}>
              <ListItemButton component={Link} to={sideLink.path} sx={{
                marginBottom: '10px',
                width: '100%',
              }}>
                <ListItemIcon>
                  <LabelImportantIcon/>
                </ListItemIcon>
                <ListItemText primary={sideLink.value}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider sx={{borderColor: '#000'}}/>
    </Box>
  );
};
