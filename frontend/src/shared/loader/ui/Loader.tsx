import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Loader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px auto' }}>
      <CircularProgress />
    </Box>
  );
};
