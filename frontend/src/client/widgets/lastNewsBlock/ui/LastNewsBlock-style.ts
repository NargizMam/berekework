const LastNewsBlockStyle = {
  block: {
    boxSizing: 'border-box',
    flexDirection: 'column',
    fontSize: '24px',
    margin: '0 auto',
    height: '100%',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: {
      xs: '7%',
      lg: '60px',
    },
  },
  title: {
    fontWeight: '700',
    lineHeight: '1.3',
    color: '#000',
    fontSize: {
      xs: '1.5rem',
      sm: '2rem',
      md: '2.875rem',
    },
  },
  paginationControls: {
    display: 'flex',
    gap: '10px',
    '@media (max-width: 599.9px)': {
      display: 'none',
    },
  },
  cards: {
    display: 'flex',
  },
  subtitleNoCards: {
    fontWeight: '500',
    fontSize: '18px',
    color: '#777',
  },
};

export default LastNewsBlockStyle;
