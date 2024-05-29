const getMediaCardStyle = (itemsLength: number) => ({
  card: {
    borderRadius: '30px',
    overflow: 'hidden',
    cursor: 'pointer',
    position: 'relative',
    padding: 0,
    width: '100%',
    height: '100%',
    ...(itemsLength >= 3 && {
      '@media (min-width: 1280px)': {
        maxHeight: '262px',
      },
    }),
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  iconPlayWrapper: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: '#fff',
    zIndex: 10,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

export default getMediaCardStyle;
