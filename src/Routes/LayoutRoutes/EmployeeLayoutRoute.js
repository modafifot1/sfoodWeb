import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import Employee from '../../features/Employee/Employee';

const EmployeeLayoutRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={(matchProps) =>
        JSON.parse(localStorage.getItem('roleId')) === 2 ? (
          <Employee>
            <Component {...matchProps} />
          </Employee>
        ) : (
          history.push('/auth/login')
        )
      }
    />
  );
};
export default EmployeeLayoutRoute;
