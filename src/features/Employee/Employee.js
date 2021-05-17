import { LinearProgress, makeStyles } from '@material-ui/core';
import React, { Suspense } from 'react';
import Navbar from '../../common/components/Navbar/Navbar';
import Sidebar from '../../common/components/Sidebar/Sidebar';
import { employeeDashboard } from '../../constants/employeeConst';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },

  appBarSpacer: theme.mixins.toolbar,

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },

  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },

  fixedHeight: {
    height: 240,
  },
}));

const Employee = (props) => {
  const classes = useStyles();
  const data = employeeDashboard;
  return (
    <div className={classes.root}>
      <Navbar />
      <Sidebar data={data} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Suspense fallback={<LinearProgress />}>{props.children}</Suspense>
      </main>
    </div>
  );
};

export default Employee;
