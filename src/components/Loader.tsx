import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledLoader = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 30px;
`;

const Loader = () => {
  return (
    <StyledLoader className='Loader'>
      <CircularProgress />
    </StyledLoader>
  );
};

export default Loader;
