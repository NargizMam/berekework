const LastNewsCardsStyle = {
  container: {
    flexWrap: 'noWrap',
    overflowX: 'auto',
    justifyContent: 'spaceBetween',

    '@media (min-width: 900px)': {
      flexWrap: 'wrap',
      overflowX: 'hidden',
    },
  },
};

export default LastNewsCardsStyle;
