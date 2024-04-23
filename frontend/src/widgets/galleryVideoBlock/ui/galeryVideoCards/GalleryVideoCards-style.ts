const GalleryVideoCardsStyle = {
  container: {
    flexWrap: 'noWrap',
    overflowX: 'auto',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',

    '@media (min-width: 900px)': {
      flexWrap: 'wrap',
      overflowX: 'hidden',
    },
  },
};

export default GalleryVideoCardsStyle;
