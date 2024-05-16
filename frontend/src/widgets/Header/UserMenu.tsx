import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { logout } from '../../client/page/Auth/api/AuthThunk';
import { User } from '../../client/page/Auth/model/types';
import { useAppDispatch } from '../../app/store/hooks';
import { apiURL } from '../../constants';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    let avatar  = apiURL + '/avatars/' + user.avatar;

  const handleLogout = () => {
    dispatch(logout()).unwrap();
    navigate('/login');
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const getProfile = () => {
    if(user.role === 'employer'){
      return navigate(`/employersProfile/${user._id}`);
    }
    navigate('/');
  }
  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleClick} sx={{ p: 0, mr: 5 }}>
             <Typography p={2}> Hello, {user.email}! </Typography>
              {avatar && (<Avatar alt={user.email} src={avatar} />)}
          </IconButton>
        </Tooltip>
        <Menu
            sx={{ mt: '45px'}}
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
            onClose={handleClose}
        >
            <MenuItem component={Button} onClick={getProfile}>My profile</MenuItem>
            <MenuItem component={Button} onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default UserMenu;