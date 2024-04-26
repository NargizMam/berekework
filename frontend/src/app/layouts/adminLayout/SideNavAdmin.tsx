import { Box, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { SIDE_BAR_LINKS } from '../../constants/links';
import React from 'react';

export interface MobileProps {
  onClose?: () => void;
  open?: boolean;
}
const SideNavAdmin: React.FC<MobileProps> = ({onClose, open}) => {
  const displayValue = !open || onClose ? 'none' : 'flex';

  return (
    <Box
      sx={{
        bgcolor: '#ccc',
        flexDirection: 'column',
        height: '100%',
        left: 0,
        width: '20%',
        padding: '5px',
        position: 'fixed',
        display: displayValue,
        scrollbarWidth: 'none',
        top: 0,
      }}
    >
      <Typography
        sx={{ p: '12px', textAlign: 'center', color: 'black', textDecoration: 'none', fontWeight: 'bold' }}
        component={Link}
        to="/"
      >
        Bereke Admin
      </Typography>

      <Divider sx={{ borderColor: '#000' , mt: '10px'}} />
      <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
        <List>
          {SIDE_BAR_LINKS.map((sideLink) => (
            <ListItem disablePadding key={sideLink.id}>
              <ListItemButton component={Link} to={sideLink.path} sx={{
                borderRadius: '4px',
                marginBottom: '8px',
                width: '100%',
                borderBottom: '1px solid #000',
              }}>
                <ListItemText primary={sideLink.value} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider sx={{ borderColor: '#000' }} />
    </Box>
  );
};

export default SideNavAdmin;

// import React from 'react';
// import { Box, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { SIDE_BAR_LINKS } from '../../constants/links';
//
// const SideNavAdmin: React.FC = () => {
//
//   return (
//     <Box
//       sx={{
//         bgcolor: '#ccc',
//         color: '#fff',
//         display: { xs: 'none', lg: 'flex' },
//         flexDirection: 'column',
//         height: '100%',
//         left: 0,
//         width: '20%',
//         position: 'fixed',
//         scrollbarWidth: 'none',
//         top: 0,
//         '&::-webkit-scrollbar': { display: 'none' },
//       }}
//     >
//       <Typography
//         sx={{ p: '12px', textAlign: 'center', color: 'black', textDecoration: 'none', fontWeight: 'bold' }}
//         component={Link}
//         to="/"
//       >
//         Bereke Admin
//       </Typography>
//       <Divider sx={{ borderColor: '#000' }} />
//       <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
//         <List>
//           {SIDE_BAR_LINKS.map((sideLink) => (
//             <ListItem disablePadding key={sideLink.id}>
//               <ListItemButton component={Link} to={sideLink.path} sx={{
//                 borderRadius: '4px',
//                 marginBottom: '8px',
//                 width: '100%',
//                 borderBottom: '1px solid #000',
//               }}>
//                 <ListItemText primary={sideLink.value} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//          {/* <ListItem disablePadding>
//             <ListItemButton component={Link} to="pages" sx={{
//               borderRadius: '4px',
//               marginBottom: '8px',
//               width: '100%',
//               borderBottom: '1px solid #000',
//             }}>
//               <ListItemText primary="Pages" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton component={Link} to="users" sx={{
//               borderRadius: '4px',
//               marginBottom: '8px',
//               width: '100%',
//               borderBottom: '1px solid #000',
//             }}>
//               <ListItemText primary="Users" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton component={Link} to="vacance" sx={{
//               borderRadius: '4px',
//               marginBottom: '8px',
//               width: '100%',
//               borderBottom: '1px solid #000',
//             }}>
//               <ListItemText primary="Vacance" />
//             </ListItemButton>
//           </ListItem>*/}
//         </List>
//       </Box>
//       <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />
//     </Box>
//   );
// };
//
// export default SideNavAdmin;
