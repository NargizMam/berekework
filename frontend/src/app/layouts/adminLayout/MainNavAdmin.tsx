import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ListIcon from '@mui/icons-material/List';
import MobileNav from './MobileNav';

const MainNavAdmin = (): React.JSX.Element => {
const [openNav, setOpenNav] = useState<boolean>(false);
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
            sx={{ display: { lg: 'none' } }}>
            <ListIcon />
          </IconButton>
        </Stack>
        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
          <Avatar
            src="/assets/avatar.png"
            sx={{ cursor: 'pointer' }}
          />
        </Stack>
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
