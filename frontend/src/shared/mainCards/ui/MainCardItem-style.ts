const MainCardItemStyle = (cardImage: string | undefined) => ({
  card: {
    position: 'relative',
    display: 'flex',
    borderRadius: '5px',
    alignItems: 'center',
    overflow: 'hidden',
    maxWidth: '100%',
    height: '100%',
    textDecoration: 'none',
    padding: '10px',
    background: cardImage ? `#ECECEC url(${cardImage}) no-repeat right bottom` : '#ECECEC',
    backgroundSize: 'contain',
    '@media (min-width: 600px)': {
      display: 'flex',
      borderRadius: '30px',
      border: '1px solid #ececec',
      padding: '50px 269px 48px 50px',
    },
  },
  content: {
    '@media (min-width: 600px)': {
      height: '100%',
    },
  },
  title: {
    fontWeight: '400',
    lineHeight: '1.1',
    fontSize: '17px',
    color: '#000',
    margin: 0,
    '@media (min-width: 600px)': {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '20px',
      minWidth: '287px',
    },
  },
  text: {
    display: 'none',
    '@media (min-width: 600px)': {
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '20px',
      margin: 0,
      minWidth: '53%',
    },
  },
  iconWrapper: {
    display: 'flex',
    flexShrink: 0,
    overflow: 'hidden',
    width: '24px',
    height: '24px',
    marginRight: '10px',
    '@media (min-width: 600px)': {
      width: '54px',
      height: '54px',
      marginRight: '24px',
    },
  },
  icon: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
});
export default MainCardItemStyle;
