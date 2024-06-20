import React from 'react';
import { Link as NavLink } from 'react-router-dom';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUser } from '../../../client/page/Auth/model/AuthSlice';
import { dashboardAdminRouters, dashboardSuperAdminRoutes } from '../../constants/links';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { logout } from '../../../client/page/Auth/api/AuthThunk';
import { Container, Tooltip } from '@mui/material';

const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const DashboardAdmin: React.FC<React.PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const user = useAppSelector(selectUser);

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {user ? (
        <>
          <AppBar position="fixed" open={open} sx={{ backgroundColor: theme.palette.background.paper }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  padding: '0 0 0 4px',
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon sx={{ color: 'black', fontSize: '30px' }} />
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ color: 'black' }}>
                Добро пожаловать! {user?.email}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              {theme.direction !== 'rtl' && (
                <>
                  <Typography
                    variant={'h6'}
                    component={'div'}
                    sx={{
                      fontWeight: 'bold',
                      marginRight: 2,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        color: theme.palette.primary.main,
                      }}
                    >
                      Bereke CRM
                    </span>
                  </Typography>
                  <IconButton onClick={handleDrawerClose}>
                    <ChevronRightIcon />
                  </IconButton>
                </>
              )}
            </DrawerHeader>
            <Divider />
            <List>
              {dashboardAdminRouters.map((item) => (
                <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
                  <Tooltip title={item.tooltip} placement={'right'}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                      component={NavLink}
                      to={`/admin/${item.url}`}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        {React.createElement(item.icon)}
                      </ListItemIcon>
                      <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {user?.role === 'superadmin' &&
                dashboardSuperAdminRoutes.map((item) => (
                  <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
                    <Tooltip title={item.tooltip} placement={'right'}>
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                        }}
                        component={NavLink}
                        to={item.tooltip === 'Prismic' ? item.url : `/${item.url}`}
                        target={item.tooltip === 'Prismic' ? '_blank' : ''}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                          }}
                        >
                          {React.createElement(item.icon)}
                        </ListItemIcon>
                        <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                ))}
            </List>
            <List>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <Tooltip title="На гланую страницу" placement={'right'}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    component={NavLink}
                    to={`/`}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={'На главную страницу'} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <Tooltip title="Выйти" placement={'right'}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={() => handleLogout()}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Выйти'} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </List>
          </Drawer>
        </>
      ) : (
        ''
      )}
      <Box sx={{ flexGrow: 1, paddingTop: 3, paddingBottom: 3 }}>
        <DrawerHeader />
        <Container maxWidth={'xl'}>{children}</Container>
      </Box>
    </Box>
  );
};

export default DashboardAdmin;
