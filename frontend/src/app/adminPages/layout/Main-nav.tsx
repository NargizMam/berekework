import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase'; // добавили импорт для InputBase
import MobileNav from './Mobile-nav';
import { useState } from 'react';

const MainNav = (): React.JSX.Element => {
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
            sx={{ display: { lg: 'none' } }}          >
            <ListIcon />
          </IconButton>
          <Tooltip title="Search" >
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <InputBase
            placeholder="Search..."
            sx={{ border: '1px solid #000', borderRadius: '4px', px: 1 }} // добавляем стили для границы
          />
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
export default MainNav;
