import React, { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { logout } from '../../client/page/Auth/api/AuthThunk';
import { User } from '../../client/page/Auth/model/types';
import { useAppDispatch } from '../../app/store/hooks';
import { apiURL } from '../../constants';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const avatar = apiURL + '/avatars/' + user.avatar;

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
    if (user.role === 'employer') {
      return navigate(`/employersProfile/${user._id}`);
    }
    navigate('/');
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mr: 5 }}
    >
      <Typography p={2}>Hello, {user.email}!</Typography>
      {avatar && <Avatar alt={user.email} src={avatar} sx={{ borderRadius: 50 }} />}
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
        <MenuItem onClick={getProfile}>My profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
