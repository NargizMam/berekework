import React from 'react';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ListIcon from '@mui/icons-material/List';
import { Link, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../../client/page/Auth/api/AuthThunk';
import { selectUser } from '../../../client/page/Auth/model/AuthSlice';
import SideNavAdmin from './SideNavAdmin';

const MainNavAdmin = (): React.JSX.Element => {
  const [openNav, setOpenNav] = React.useState<boolean>(false);
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

  let sideNavBar = <SideNavAdmin open={true} />;

  if (window.innerWidth < 1000) {
    sideNavBar = <SideNavAdmin open={openNav} onClose={() => setOpenNav(false)} />;
  }

  useEffect(() => {
    const handleResize = () => {
      setOpenNav(window.innerWidth < 1000);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Box component="header">
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'flex-start', minHeight: '64px', px: 2 }}
        >
          <IconButton
            onClick={(): void => {
              setOpenNav(true);
            }}
            sx={{ display: { lg: 'none' } }}
          >
            <ListIcon />
          </IconButton>
        </Stack>
        {sideNavBar}
        <Stack
          onClick={handleClick}
          sx={{ alignItems: 'center', justifyContent: 'flex-end', flexGrow: 1 }}
          direction="row"
          spacing={5}
        >
          <Avatar src="/assets/avatar.png" sx={{ cursor: 'pointer' }} />
        </Stack>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
          {user ? (
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          ) : (
            <MenuItem onClick={handleLogout}>
              <Link component={RouterLink} to="/login">
                Login
              </Link>
            </MenuItem>
          )}
        </Menu>
      </Box>
    </>
  );
};
export default MainNavAdmin;
