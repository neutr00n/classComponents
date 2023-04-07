import notFoundImage from '../../images/notfound.png';
import { Box } from './NotFound.styled';

export const NotFound = () => {
  return (
    <Box>
      <img
        src={notFoundImage}
        alt="Images not found"
        width="840"
        height="580"
      />
    </Box>
  );
};
