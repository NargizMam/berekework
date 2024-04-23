const GalleryVideoCardsStyle = {
  container: {
    justifyContent: 'spaceBetween',
    flexWrap: 'noWrap',
    gap: '10px',
    overflowX: 'auto',

    '@media (min-width: 900px)': {
      flexWrap: 'wrap',
      gap: 0,
      overflowX: 'hidden',
    },
  },
};

export default GalleryVideoCardsStyle;
