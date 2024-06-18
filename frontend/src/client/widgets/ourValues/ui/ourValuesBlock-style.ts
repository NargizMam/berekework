const OurValuesBlockStyle = {
  ourValuesCardBlock: {
    marginBottom: {
      xs: '7%',
      lg: '178px',
    },
  },
  ourValuesBlockTitle: {
    fontSize: {
      xs: '1.5rem',
      sm: '2rem',
      md: '2.875rem',
    },
    fontWeight: 700,
    lineHeight: 1.3,
    color: '#000',
    margin: {
      xs: '0 0 7% 0',
      lg: '0 0 60px 0',
    },
  },
  ourValuesCard: {
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '30px',
    padding: {
      xs: '24px',
      md: '40px',
    },
    width: '100%',
    height: '100%',
    background: '#ECECEC',
    margin: 0,
    borderRadius: '30px',
    '@media (max-width: 1290px)': {
      flexWrap: 'nowrap',
      flexDirection: 'column',
      alignItems: 'start',
    },
  },
  content: {
    flexBasis: '80%',
    flexGrow: 1,
  },
  ourValuesImgFrame: {
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '54px',
    height: '54px',
    background: '#FFFFFF',
    borderRadius: '50%',
    margin: 0,
  },
  ourValuesCardTitle: {
    fontSize: {
      xs: '1rem',
      sm: '20px',
    },
    fontWeight: 600,
    color: '#000',
    lineHeight: 1.1,
    margin: '0 0 20px 0',
  },
  ourValuesCardText: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: 1.4,
    color: '#8E8E8E',
    margin: 0,
  },
  OurValuesSwiperSlide: {
    height: 'auto',
  },
};

export default OurValuesBlockStyle;
