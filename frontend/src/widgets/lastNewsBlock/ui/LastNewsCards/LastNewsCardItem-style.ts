const LastNewsCardItemStyle = {
  container: {
    minWidth: '272px',
  },
  card: {
    boxShadow: 'none',
    border: '1px solid #ECECEC',
    borderRadius: '30px',
    background: '#ECECEC',
  },
  cardAction: {},
  content: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Montserrat, sans-serif',
    color: '#000',
    padding: '24px',
    fontWeight: '500',
    height: '100%',

    '@media (min-width: 900px)': {
      padding: '40px',
      '&:last-child': {
        paddingBottom: '40px',
      },
    },
  },
  title: {
    fontSize: '20px',
    lineHeight: 1.1,
    fontWeight: 600,
    marginBottom: '10px',
  },
  text: {
    margin: '0 0 16px 0',
    color: '#777',
    '@media (min-width: 900px)': {
      fontWeight: 500,
      margin: '0 0 30px 0',
    },
  },
  createdAt: {
    marginTop: '0 auto',
    '@media (min-width: 1200px)': {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  createdAtContent: {
    '@media (min-width: 900px)': {
      display: 'flex',
      gap: '40px',
    },
  },
  createdAtText: {
    fontWeight: 500,
    lineHeight: 1.8,
    whiteSpace: 'nowrap',
  },
  arrowIconWrapper: {
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: '#D2D2D2',
    marginLeft: 'auto',
  },
};
export default LastNewsCardItemStyle;
