const getMediaCardStyle = (itemsLength: number) => ({
  card: {
    borderRadius: '30px',
    overflow: 'hidden',
    cursor: 'pointer',
    position: 'relative',
    padding: 0,
    width: '100%',
    height: '100%',
    aspectRatio: '16 / 9',
    ...(itemsLength >= 3 && {
      '@media (min-width: 1280px)': {
        height: '262px'
      },
    }),
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  videoWrapper: {
    width: '100%',
    height: '100%',
    '& iframe': {
      width: '100%',
      height: '100%',
    },
  }
});

export default getMediaCardStyle;
