import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NavigateBack = () => {
  const navigate = useNavigate();

  return (
    <div className='NavigateBack'>
      <Button size='large' onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />}>
        Back
      </Button>
    </div>
  );
};

export default NavigateBack;
