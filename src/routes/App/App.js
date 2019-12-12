import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import routes from '../routes';
import Header from '../../components/Header';
import { ThemeProvider } from '@material-ui/core';
import settings from '../../utils/styles/muiSettings';

const App = () => {
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

export default App;