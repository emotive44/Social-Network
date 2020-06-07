import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';


const ProtectedRoute = ({ component: Component, isAuth, ...rest }) => {

  return (
    <Route 
      {...rest}
      render={(props) => !isAuth ? <Redirect to='/login'/> : <Component {...props}/>}
    />
  );
}

const mapStateToProps = state => ({
  isAuth: state.auth.userId
});

export default connect(mapStateToProps, null)(ProtectedRoute);
