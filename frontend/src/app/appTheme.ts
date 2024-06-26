import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    fontWeightBold: 700,
  },
});

export default theme;
