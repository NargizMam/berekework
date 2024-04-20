import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import {List, ListItem, ListItemButton, ListItemText} from '@mui/material';
import {Link, NavLink} from "react-router-dom";
import {useAppSelector} from "../../../app/store/hooks";
import {selectCompanyInfo} from "../model/AdminMainPageSlice";
import {apiURL} from "../../../constants";

export interface MobileNavProps {
  onClose?: () => void;
  open?: boolean;
}

 const MobileNav = ({ open, onClose }: MobileNavProps) => {
const company = useAppSelector(selectCompanyInfo);
     const image = apiURL + '/' + company?.logo;


 return(
     <Drawer
     PaperProps={{
       sx: {
         bgcolor: '#ccc',
         color: 'var(--MobileNav-color)',
         display: 'flex',
         flexDirection: 'column',
         maxWidth: '30%',
         scrollbarWidth: 'none',
         width: 'var(--MobileNav-width)',
         zIndex: 'var(--MobileNav-zIndex)',
         '&::-webkit-scrollbar': {display: 'none'},
       },
     }}
     onClose={onClose}
     open={open}
   >
     <Stack spacing={2} sx={{p: 3}}>
       <Box sx={{display: 'inline-flex'}}  component={NavLink} to='/admin'>
         <img  src={image} alt="Логотип" style={{maxWidth: '100px'}}/>
       </Box>
     </Stack>
     <Divider sx={{borderColor: '#000'}}/>
       <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
           <List>
               <ListItem disablePadding>
                   <ListItemButton onClick={onClose} component={Link} to="pages" sx={{ borderRadius: '4px', marginBottom: '8px', width: '100%', borderBottom: '1px solid #000' }}>
                       <ListItemText primary="Pages" />
                   </ListItemButton>
               </ListItem>
               <ListItem disablePadding>
                   <ListItemButton onClick={onClose}  component={Link} to="users" sx={{ borderRadius: '4px', marginBottom: '8px', width: '100%', borderBottom: '1px solid #000' }}>
                       <ListItemText primary="Users" />
                   </ListItemButton>
               </ListItem>
               <ListItem disablePadding>
                   <ListItemButton onClick={onClose}  component={Link} to="vacance" sx={{ borderRadius: '4px', marginBottom: '8px', width: '100%', borderBottom: '1px solid #000' }}>
                       <ListItemText primary="Vacance" />
                   </ListItemButton>
               </ListItem>
           </List>
       </Box>
     <Divider sx={{borderColor: '#000'}}/>
   </Drawer>
 )};
export default MobileNav;

