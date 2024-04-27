import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ListIcon from '@mui/icons-material/List';
import SideNavAdmin from './SideNavAdmin';

const MainNavAdmin = (): React.JSX.Element => {
  const [openNav, setOpenNav] = React.useState<boolean>(false);


  let sideNavBar = <SideNavAdmin open={true}/>;

  if (window.innerWidth < 1000) {
    sideNavBar = <SideNavAdmin open={openNav} onClose={() => setOpenNav(false)}/>;
  }
  React.useEffect(() => {
    const handleResize = () => {
      setOpenNav(window.innerWidth < 1000);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Box component="header" display='flex'>
        <Stack
          direction="row"
          spacing={2}
          sx={{alignItems: 'center', justifyContent: 'flex-start', minHeight: '64px', px: 2}}
        >
          <IconButton
            onClick={(): void => {
              setOpenNav(true);
            }}
            sx={{display: {lg: 'none'}}}
          >
            <ListIcon/>
          </IconButton>
        </Stack>
        {sideNavBar}
        <Stack sx={{alignItems: 'center', justifyContent: 'flex-end', flexGrow: 1}} direction="row" spacing={5}>
          <Avatar src="/assets/avatar.png" sx={{cursor: 'pointer'}}/>
        </Stack>
      </Box>
    </>
  );
};

export default MainNavAdmin;
