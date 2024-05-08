const MainCardItemStyle = (cardIcon: string | null) => ({
  card: {
    display: 'flex',
    maxWidth: '100%',
    flexBasis: 'calc(50% - 5px)',
    borderRadius: '30px',
    alignItems: 'center',
    textDecoration: 'none',
    background: '#ECECEC',
    border: '1px solid #ECECEC',
    overflow: 'hidden',
    padding: cardIcon ? '40px 40px 40px 124px' : '50px 250px 48px 50px',
  },
  title: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#000',
    lineHeight: 1.1,
    margin: '0 0 20px 0',
  },
  text: {
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: 1.4,
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
  image: {
    width: '228px',
    height: '228px',
    transform: 'rotate(-12.28deg)',
    bottom: '-54px',
    right: '-60px',
  },
  link: {
    textDecoration: 'none',
  },
});

export default MainCardItemStyle;
