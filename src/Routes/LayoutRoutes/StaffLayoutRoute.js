import React from "react";
import { Route, useHistory } from "react-router-dom";
import StaffLayout from "../../features/Staff/Staff";

const StaffLayoutRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={(matchProps) =>
        JSON.parse(localStorage.getItem("roleId")) === 2 ? (
          <StaffLayout>
            <Component {...matchProps} />
          </StaffLayout>
        ) : (
          history.push("/auth/login")
        )
      }
    />
  );
};
export default StaffLayoutRoute;
