const MainCardItemStyle = (cardImage: string | null, cardIcon: string | null) => ({
  card: {
    display: 'flex',
    gap: '15px',
    borderRadius: '5px',
    alignItems: 'center',
    maxWidth: '100%',
    height: '100%',
    textDecoration: 'none',
    padding: '15px',
    background: cardImage ? `#ECECEC url(${cardImage}) no-repeat right bottom` : '#ECECEC',
    backgroundSize: 'contain',
    '@media (min-width: 600px)': {
      borderRadius: '30px',
      border: '1px solid #ececec',
      padding: cardIcon ? '40px 40px 40px 124px' : '50px 269px 48px 50px',
    },
  },
  content: {
    height: '100%',
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
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
      display: 'block',
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '20px',
      color: '#8E8E8E',
      margin: 0,
      minWidth: '53%',
    },
  },
  icon: {
    maxWidth: '24px',
    maxHeight: '24px',
    '@media (min-width: 600px)': {
      left: '40px',
      top: '64px',
      maxWidth: '54px',
      maxHeight: '54px',
    },
  },
  link: {
    textDecoration: 'none',
  },
});
export default MainCardItemStyle;
