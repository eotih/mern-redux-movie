// routes
import * as React from 'react';
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import Login from './pages/Login';
import useToken from './services/token.services';

import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

// ----------------------------------------------------------------------
export default function App() {
  const { token } = useToken();

  if (!token) {
    return (
      <ThemeConfig>
        <Login />
      </ThemeConfig>
    );
  }
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
