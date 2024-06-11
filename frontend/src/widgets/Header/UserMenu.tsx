import React, { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { logout } from '../../client/page/Auth/api/AuthThunk';
import { EmployerAuth, User } from '../../client/page/Auth/model/types';
import { useAppDispatch } from '../../app/store/hooks';
import { apiURL } from '../../constants';

interface Props {
  user: User | EmployerAuth | null;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const avatar = apiURL + '/avatars/' + user?.avatar;

  const handleLogout = () => {
    dispatch(logout()).unwrap();
    navigate('/login');
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const getProfile = () => {
    if (user?.role === 'employer') {
      return navigate(`/employersProfile/${user._id}`);
    } else if (user?.role === 'user') {
      return navigate(`/userProfile`);
    } else if (user?.role === 'admin' || user?.role === 'superadmin') {
      return navigate(`/admin`);
    }
    navigate('/');
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
    >
      <Avatar alt={user?.email} src={avatar} sx={{ borderRadius: 50 }} />
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMouseLeave}
      >
        {user?.role === 'admin' || user?.role === 'superadmin' ? (
          <MenuItem onClick={getProfile}>CRM</MenuItem>
        ) : (
          <MenuItem onClick={getProfile}>Мой личный кабинет</MenuItem>
        )}
        <MenuItem onClick={handleLogout}>Выйти</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
