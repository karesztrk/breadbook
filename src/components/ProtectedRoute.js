import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, ...rest }) => {
  const { user } = useAuth();
  const authenticated = !!user;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
