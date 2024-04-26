import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ListIcon from '@mui/icons-material/List';
import MobileNav from './MobileNav';
import { Link, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../../client/page/Auth/api/AuthThunk';
import { selectUser } from '../../../client/page/Auth/model/AuthSlice';

const MainNavAdmin = (): React.JSX.Element => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const user = useAppSelector(selectUser);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          borderBottom: '1px solid var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-background-paper)',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--mui-zIndex-appBar)',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 2 }}
        >
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <IconButton
              onClick={(): void => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: 'none' } }}
            >
              <ListIcon />
            </IconButton>
          </Stack>
          <Stack onClick={handleClick} sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <Avatar src="/assets/avatar.png" sx={{ cursor: 'pointer' }} />
          </Stack>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
            {
              user ?
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                :
                <MenuItem onClick={handleLogout}><Link component={RouterLink} to='/login'>Login</Link></MenuItem>
            }
          </Menu>
        </Stack>
      </Box>
      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
};
export default MainNavAdmin;
