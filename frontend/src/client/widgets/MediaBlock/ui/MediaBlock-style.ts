const MediaBlockStyle = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    marginBottom: {
      xs: '7%',
      lg: '219px',
    },
  },
  videoContainer: {
    margin: '0 auto',
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
  subtitleNoCards: {
    fontWeight: '500',
    fontSize: '18px',
    color: '#777',
  },
  paginationControls: {
    display: 'flex',
    gap: '10px',
    '@media (max-width: 599.9px)': {
      display: 'none',
    },
  },
  paragraph: {
    fontWeight: '500',
    fontSize: '18px',
    color: '#777',
  },
  cards: {
    display: 'flex',
    gap: '10px',
    margin: '0 auto',
    position: 'relative',
  },
};

export default MediaBlockStyle;
