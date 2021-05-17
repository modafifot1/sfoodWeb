import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AdminLayoutRoute from './LayoutRoutes/AdminLayoutRoute';
import EmployeeLayoutRoute from './LayoutRoutes/EmployeeLayoutRoute';
import PublicLayoutRoute from './LayoutRoutes/PublicLayoutRoute';
import { adminRoutes, employeeRoutes, publicRoutes } from './routeConfig';
const Routes = () => {
  return (
    <Switch>
      {publicRoutes.map((router) => {
        const { path, exact, component, key } = router;
        return <PublicLayoutRoute path={path} exact={exact} component={component} key={key} />;
      })}
      {adminRoutes.map((router, i) => {
        const { path, exact, component, key } = router;
        return <AdminLayoutRoute path={path} exact={exact} component={component} key={key} />;
      })}
      {employeeRoutes.map((router) => {
        const { path, exact, component, key } = router;
        return <EmployeeLayoutRoute path={path} exact={exact} component={component} key={key} />;
      })}
      <Redirect exact from="/" to="/auth/login" />
      <Route exact path="*" render={() => <Redirect to="/errors/error-404" />} />
    </Switch>
  );
};

export default Routes;
