import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import AdminLayout from '../../features/Admin/Admin';

const AdminLayoutRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={(matchProps) =>
        JSON.parse(localStorage.getItem('roleId')) === 0 ? (
          <AdminLayout>
            <Component {...matchProps} />
          </AdminLayout>
        ) : (
          history.push('/auth/login')
        )
      }
    />
  );
};
export default AdminLayoutRoute;
