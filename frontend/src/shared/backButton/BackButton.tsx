import { Button } from '@mui/material';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Button
      onClick={handleBack}
      startIcon={<ArrowBackIos />}
      disableRipple
      sx={{
        mt: 2,
        mb: 2,
        color: '#a9a9a9',
        fontSize: '16px',
        textTransform: 'none',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: 'transparent',
          textDecoration: 'none',
          color: '#000',
        },
        '&:focus': {
          outline: 'none',
        },
      }}
    >
      Назад
    </Button>
  );
};

export default BackButton;



