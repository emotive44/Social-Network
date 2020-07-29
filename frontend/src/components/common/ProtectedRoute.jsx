import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuth = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export default ProtectedRoute;
