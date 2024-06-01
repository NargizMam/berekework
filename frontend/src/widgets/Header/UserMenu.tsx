import React, { useState } from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { logout } from '../../client/page/Auth/api/AuthThunk';
import { User } from '../../client/page/Auth/model/types';
import { useAppDispatch } from '../../app/store/hooks';
import { apiURL } from '../../constants';
import './css/media.css';
import { getProfile } from './feauteres/user/user';

interface Props {
  user: User;
}

const   UserMenu: React.FC<Props> = ({ user }) => {
  let name = '';
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

  if (user.role === 'user') {
    name = user.name + ' ' + user.surname;
  }


  return (
    <div
      className='userMenu'
    >
      <Typography className='userName' style={{marginRight: '10px'}}>{name}</Typography>
      <div  onClick={handleMouseEnter}>
        {avatar && <Avatar alt={user.email} src={avatar} sx={{ borderRadius: 50}} className='userAvatar'/>}
      </div>
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
        <MenuItem onClick={() => getProfile(user, navigate)}>Мой профиль</MenuItem>
        <MenuItem onClick={handleLogout}>Выйти</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
