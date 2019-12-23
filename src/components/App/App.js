import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import routes from '../../routes/routes';
import Header from '../Header';
import { ThemeProvider } from '@material-ui/core';
import settings from '../../utils/styles/muiSettings';
import { connect } from 'react-redux';
import { getAuthUser } from '../../redux/actions';
import RenderRoutes from '../RenderRoutes';

const App = ({ getAuthUser }) => {
  React.useEffect(() => {
    getAuthUser();
  }, [getAuthUser]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={settings}>
        <Header />
        <RenderRoutes routes={routes} />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default connect(undefined, { getAuthUser })(App);