import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import routes from '../../routes/routes';
import Header from '../Header';
import { ThemeProvider } from '@material-ui/core';
import settings from '../../utils/styles/muiSettings';
import { connect } from 'react-redux';
import { getAuthToken } from '../../redux/actions';
import RenderRoutes from '../RenderRoutes';

const App = ({ getAuthToken }) => {
  React.useEffect(() => {
    getAuthToken();
  }, [getAuthToken]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={settings}>
        <Header />
        <RenderRoutes routes={routes} />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default connect(undefined, { getAuthToken })(App);