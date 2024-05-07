const MainCardItemStyle = (cardIcon: string | null, cardImage: string | null) => ({
  card: {
    display: 'flex',
    borderRadius: '5px',
    alignItems: 'center',
    textDecoration: 'none',
    background: '#ECECEC',
    border: '1px solid #ECECEC',
    padding: cardIcon ? '40px 40px 40px 124px' : '50px 0 48px 50px',
  },
  content: {
    position: 'relative',
    '&::after': {
      content: '',
      position: 'absolute',
      bottom: 0,
      right: 0,
      background: `url(${cardImage}) no-repeat right bottom`,
      backgroundSize: 'contain',
      width: '100%',
      height: '100%',
    },
  },
  title: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#000',
    lineHeight: '1.1',
    margin: 0,
  },
  text: {
    color: '#777',
    margin: 0,
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
