import * as React from 'react';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ListIcon from '@mui/icons-material/List';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SideNavAdmin } from './SideNavAdmin';
import { Link, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../../client/page/Auth/api/AuthThunk';
import { selectUser } from '../../../client/page/Auth/model/AuthSlice';

const MainNavAdmin = (): React.JSX.Element => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [openNav, setOpenNav] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));
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

  const handleNavToggle = () => {
    setOpenNav((prev) => !prev);
  };

  useEffect(() => {
    if (!isMobileScreen) {
      setOpenNav(true);
    }
  }, [isMobileScreen]);

  return (
    <Box component="header" display='flex' position="relative">
      <Stack
        direction="row"
        spacing={2}
        sx={{alignItems: 'center', justifyContent: 'flex-start', minHeight: '64px', px: 2}}
      >
        {isMobileScreen && (
          <IconButton
            onClick={handleNavToggle}
            sx={{ display: { lg: 'none' } }}
          >
            <ListIcon />
          </IconButton>
        )}

      </Stack>
      {isMobileScreen ? (
        <SideNavAdmin open={openNav} onClose={() => setOpenNav(false)} />
      ) : (
        <SideNavAdmin open={true}/>
      )}
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
  );
};
export default MainNavAdmin;

