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

const MainNavAdmin = (): React.JSX.Element => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [openNav, setOpenNav] = useState<boolean>(false);

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
      <Stack sx={{alignItems: 'center', justifyContent: 'flex-end', flexGrow: 1}} direction="row" spacing={5}>
        <Avatar src="/assets/avatar.png" sx={{cursor: 'pointer'}}/>
      </Stack>
    </Box>
  );
};

export default MainNavAdmin;

