import PropTypes from 'prop-types';
import { useContext } from 'react';
// material
import { Box } from '@mui/material';
import { ColorModeContext } from '../theme/index';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  const { themeColor } = useContext(ColorModeContext);
  return (
    <Box
      component="img"
      src={themeColor === 'light' ? '/static/logo/1.png' : '/static/logo/2.png'}
      sx={{
        width: '70%',
        height: '70%',
        ...sx
      }}
    />
  );
}
