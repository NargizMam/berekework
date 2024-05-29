const LastNewsBlockStyle = {
  block: {
    boxSizing: 'border-box',
    flexDirection: 'column',
    fontSize: '24px',
    margin: '0 auto 70px',
    height: '100%',
    overflowY: 'hidden',
    '@media (min-width: 1200px)': {
      marginBottom: '108px',
    },
  },
  row: {
    '@media (min-width: 900px)': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '60px',
    },
  },
  title: {
    fontWeight: '700',
    lineHeight: '1.3',
    fontSize: '22px',
    marginBottom: '30px',
    '@media (min-width: 600px)': {
      fontSize: '32px',
    },
    '@media (min-width: 900px)': {
      marginBottom: 0,
    },
    '@media (min-width: 1200px)': {
      fontSize: '46px',
    },
  },
};

export default LastNewsBlockStyle;
