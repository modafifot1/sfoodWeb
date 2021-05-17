import CssBaseline from '@material-ui/core/CssBaseline';
import React, { useEffect } from 'react';
import './App.css';
import Routes from '../Routes/Routes';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  const auth = useSelector((state) => state.auth);
  const user = auth.user;
  const history = useHistory();
  useEffect(() => {
    if (user.roleId !== undefined) {
      localStorage.setItem('roleId', Number(user.roleId));
      if (user.roleId === 0) {
        history.push('/admin/statistical');
      } else {
        history.push('/employee/product-management');
      }
    }
  }, [user, history]);
  return (
    <div className="App">
      <CssBaseline />
      <Routes />
    </div>
  );
}

export default App;
