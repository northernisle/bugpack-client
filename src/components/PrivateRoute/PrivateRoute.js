import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, token, ...props }) => {
  const authenticated = !!token;

  return (
    <Route {...props} render={props => (
      authenticated
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  )
}

const mapStateToProps = state => {
  return { token: state.authToken };
}

export default connect(mapStateToProps)(PrivateRoute);