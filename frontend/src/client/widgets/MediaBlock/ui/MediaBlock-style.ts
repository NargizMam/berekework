const MediaBlockStyle = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    // padding: '0 16px',
    '@media (max-width: 900px)': {
      marginBottom: '70px',
    },
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '60px',
    // '@media (max-width: 900px)': {
    //   flexDirection: 'column',
    //   alignItems: 'flex-start',
    // },
  },
  title: {
    fontWeight: '700',
    lineHeight: '1.3',
    fontSize: '46px',
    color: '#000',
    '@media (max-width: 900px)': {
      fontSize: '32px',
    },
  },
  paginationControls: {
    display: 'flex',
    gap: '10px',
    '@media (max-width: 900px)': {
      marginBottom: '20px',
    },
  },
  paragraph: {
    fontWeight: '500',
    fontSize: '18px',
    color: '#777',
  },
  cards: {
    display: 'flex',
    gap: '10px',
    margin: '0 auto',
    position: 'relative',
  },
  swiperButton: {
    display: 'flex',
    flexShrink: '0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: '#D2D2D2',
    border: '1px solid #D2D2D2',
    minWidth: '50px',
    height: '50px',
    padding: 0,
    cursor: 'pointer',
    outline: '#D2D2D2',
  },
  swiperPaginationBullet: {
    backgroundColor: '#D2D2D2', // Цвет обычных точек
    '&.swiper-pagination-bullet-active': {
      backgroundColor: '#000', // Цвет активной точки
    },
  },
};

export default MediaBlockStyle;
