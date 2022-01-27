import PropTypes from 'prop-types';
import { useMemo, createContext } from 'react';
// material
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
//
import shape from './shape';
import palette, { paletteDark } from './palette';
import typography from './typography';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';
import useTheme from '../services/theme.services';

export const ColorModeContext = createContext();

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node
};

export default function ThemeConfig({ children }) {
  const { themeColor, setTheme } = useTheme();
  const themeOptions = useMemo(
    () => ({
      palette: themeColor === 'light' ? palette : paletteDark,
      shape,
      typography,
      shadows,
      customShadows
    }),
    [themeColor]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ColorModeContext.Provider value={{ setTheme, themeColor }}>
          <StyledEngineProvider>{children}</StyledEngineProvider>
        </ColorModeContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
