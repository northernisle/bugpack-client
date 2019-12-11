import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import routes from '../routes';
import Header from '../../components/Header';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      {routes.map((route, index) =>
        <Route
          key={index}
          path={route.path}
          component={route.component}
          exact={route.exact}
        />
      )}
    </BrowserRouter>
  );
}

export default App;