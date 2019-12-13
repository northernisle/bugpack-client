import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import routes from '../../routes/routes';
import Header from '../Header';
import { ThemeProvider } from '@material-ui/core';
import settings from '../../utils/styles/muiSettings';
import { connect } from 'react-redux';
import { getAuthToken } from '../../redux/actions';

const App = ({ getAuthToken }) => {
  React.useEffect(() => {
    getAuthToken();
  }, [getAuthToken]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={settings}>
        <Header />
        {routes.map((route, index) =>
          <Route
            key={index}
            path={route.path}
            component={route.component}
            exact={route.exact}
          />
        )}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default connect(undefined, { getAuthToken })(App);