const VacancyCardStyle = {
  title: {
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: 1.1,
    marginBottom: '15px',
    flexGrow: 1,
  },
  subTitle: {
    color: '#8E8E8E',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: 1.4,
    marginBottom: '20px',
  },
  salary: {
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: 1.1,
    whiteSpace: 'nowrap',
    '@media (max-width: 1200px)': {
      whiteSpace: 'wrap',
    },
    '@media (max-width: 1000px)': {
      fontSize: '17px',
    },
  },
  imageWrapper: {
    marginBottom: '17px',
  },
};

export default VacancyCardStyle;