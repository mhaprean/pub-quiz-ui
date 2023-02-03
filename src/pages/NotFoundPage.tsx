import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container">
      <Typography variant="h4">OOOps.. page not found</Typography>
      <Link to="/">
        <Button variant="contained" size="large" sx={{marginTop: '30px'}}>
          Return to homepage
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
