const MediaCardStyle = {
  card: {
    display: 'flex',
    justifyContent: 'center',
    boxSizing: 'border-box',
    flexBasis: '420px',
    minWidth: '272px',
    borderRadius: '30px',
    overflow: 'hidden',
    cursor: 'pointer',
    position: 'relative',
    padding: 0,
    height: '100%',
    '@media (min-width: 1281px)': {
      maxHeight: '262px',
    },
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
};

export default MediaCardStyle;
