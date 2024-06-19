const TitleBlockStyle = {
  block: {
    display: 'flex',
    justifyContent: 'center',
    gap: '100px',
    marginBottom: '35px',
    '@media (max-width: 900px)': {
      flexDirection: 'column',
      alignItems: 'center',
      gap: '25px',
    },
  },
  blockImageOnly: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'space-between',
    marginBottom: {
      xs: '7%',
      lg: '116px',
    },
    '@media (max-width: 960px)': {
      justifyContent: 'center',
      marginBottom: {
        xs: '7%',
        lg: '60px',
      },
    },
  },
  infoBlock: {
    maxWidth: '700px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
    lineHeight: '1.07',
    fontSize: '56px',
    maxWidth: '520px',
    '@media (max-width: 500px)': {
      fontSize: '35px',
    },
  },
  description: {
    color: '#777777',
    fontSize: '18px',
    lineHeight: '1.4',
    marginTop: '55px',
  },
  imageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '381px',
    minWidth: '300px',
    marginRight: '50px',
    '@media (max-width: 1050px)': {
      marginRight: 0,
    },
    '@media (max-width: 900px)': {
      maxWidth: '300px',
    },
  },
  button: {
    textAlign: 'center',
    maxWidth: '307px',
    margin: '0 auto 145px auto',
    '@media (max-width: 900px)': {
      marginBottom: '32px',
    },
  },
  titleWithoutImage: {
    textAlign: 'center',
    maxWidth: '700px',
    fontWeight: '700',
    fontSize: '56px',
    lineHeight: '1.07',
    '@media (max-width: 500px)': {
      fontSize: '35px',
    },
  },
  descriptionWithoutImage: {
    color: '#777777',
    maxWidth: '700px',
    fontSize: '18px',
    lineHeight: '1.4',
    textAlign: 'center',
    margin: '55px 0 0',
  },
};

export default TitleBlockStyle;
