const MediaCardStyle = {
  card: {
    display: 'flex',
    justifyContent: 'center',
    boxSizing: 'border-box',
    flexBasis: '420px',
    minWidth: '272px',
    maxHeight: '262px',
    borderRadius: '30px',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  iconPlayWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: '#fff',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    backgroundColor: '#fff',
    border: '2px solid #000',
    padding: '16px',
  },
};

export default MediaCardStyle;
