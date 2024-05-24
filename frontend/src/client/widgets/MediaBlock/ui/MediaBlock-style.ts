const MediaBlockStyle = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto 180px',
    '@media (max-width: 960px)': {
      marginBottom: '70px',
    },
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '60px',
    '@media (max-width: 960px)': {
      display: 'block',
    },
  },
  title: {
    fontWeight: '700',
    lineHeight: '1.3',
    fontSize: '46px',
    color: '#000',
    '@media (max-width: 960px)': {
      fontSize: '32px',
    },
  },
  cards: {
    display: 'flex',
    gap: '10px',
    margin: '0 auto',
    overflowY: 'auto',
  },
  card: {},
};

export default MediaBlockStyle;
