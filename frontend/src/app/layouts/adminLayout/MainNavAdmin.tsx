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
import logo from '../../../widgets/Header/images/logo-company.png';
import Tooltip from '@mui/material/Tooltip';

const MainNavAdmin = (): React.JSX.Element => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [openNav, setOpenNav] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));
  const user = useAppSelector(selectUser);

  const handleClickAvatar = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseMenu();
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
    <Box component="header" display="flex" position="relative">
      <Stack
        direction="row"
        spacing={2}
        sx={{alignItems: 'center', justifyContent: 'flex-start', minHeight: '64px', px: 2}}
      >
        {isMobileScreen && (
          <IconButton
            onClick={handleNavToggle}
            sx={{display: {lg: 'none'}}}
          >
            <ListIcon/>
          </IconButton>
        )}

      </Stack>
      {isMobileScreen ? (
        <SideNavAdmin open={openNav} onClose={() => setOpenNav(false)}/>
      ) : (
        <SideNavAdmin open={true}/>
      )}
      <Stack
        sx={{alignItems: 'center', justifyContent: 'flex-end', flexGrow: 1}}
        direction="row"
        spacing={5}
      >
        <Tooltip title="Вернуться на главную">
          <a href="/">
            <img src={logo} alt="logo"/>
          </a>
        </Tooltip>
        <Avatar src="/assets/avatar.png" sx={{cursor: 'pointer'}} onClick={handleClickAvatar}/>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu} keepMounted>
          {user ? (
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          ) : (
            <MenuItem>
              <Link component={RouterLink} to="/login">
                Login
              </Link>
            </MenuItem>
          )}
        </Menu>
      </Stack>
    </Box>
  );
};
export default MainNavAdmin;
