const EmployerBlockStyle = {
  container: {
    margin: '0 auto',
    marginBottom: {
      xs: '7%',
      lg: '219px',
    },
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: {
      xs: '7%',
      lg: '100px',
    },
  },
  paginationControls:{
    display: 'flex',
    gap: '10px',
    '@media (max-width: 900px)': {
      display: 'none',
    },
  },
};

export default EmployerBlockStyle;
