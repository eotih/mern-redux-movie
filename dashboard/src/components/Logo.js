import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return (
    <Box
      component="img"
      src="https://icons.iconarchive.com/icons/zhoolego/material/512/Movies-icon.png"
      sx={{ width: 40, height: 40, ...sx }}
    />
  );
}
