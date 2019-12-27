import React from 'react';
import { Router } from 'react-router-dom';
import routes from '../../routes/routes';
import Header from '../Header';
import { ThemeProvider } from '@material-ui/core';
import settings from '../../utils/styles/muiSettings';
import { connect } from 'react-redux';
import { getAuthUser } from '../../redux/actions';
import RenderRoutes from '../RenderRoutes';
import history from '../../utils/configs/history';

const App = ({ getAuthUser }) => {
  React.useEffect(() => {
    getAuthUser();
  }, [getAuthUser]);

  return (
    <Router history={history}>
      <ThemeProvider theme={settings}>
        <Header />
        <RenderRoutes routes={routes} />
      </ThemeProvider>
    </Router>
  );
}

export default connect(undefined, { getAuthUser })(App);