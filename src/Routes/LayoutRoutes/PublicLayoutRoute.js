import { Route, useHistory } from 'react-router-dom';
import PublicLayout from '../../features/Auth/index';

const PublicLayoutRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={(matchProps) =>
        JSON.parse(localStorage.getItem('roleId')) === 2 ? (
          history.push('/employee/product-management')
        ) : JSON.parse(localStorage.getItem('roleId')) === 0 ? (
          history.push('/admin/statistical')
        ) : (
          <PublicLayout>
            <Component {...matchProps} />
          </PublicLayout>
        )
      }
    />
  );
};
export default PublicLayoutRoute;
