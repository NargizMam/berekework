const MediaBlockStyle = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    '@media (max-width: 900px)': {
      marginTop: '7%',
      marginBottom: '7%',
    },
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: {
      xs: '7%',
      sm: '2rem',
      md: '60px',
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
    '@media (max-width: 600px)': {
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
  swiperButton: {
    display: 'flex',
    flexShrink: '0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: '#D2D2D2',
    border: '1px solid #D2D2D2',
    minWidth: '50px',
    height: '50px',
    padding: 0,
    cursor: 'pointer',
    outline: '#D2D2D2',
  },
};

export default MediaBlockStyle;
