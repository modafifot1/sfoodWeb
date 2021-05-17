import { Container, Grid, makeStyles, Paper } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRevenueByDay,
  getRevenueByMonth,
  getRevenueByQuater,
  getRevenueByYear,
} from '../../adminSlice';
import StatisticalChart from './components/StatisticalItem/StatisticalChart';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 255,
  },
  container: {
    marginTop: '2rem',
  },
}));

const Statistical = (props) => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { revenuesDay, revenuesMonth, revenuesQuater, revenuesYear } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRevenueByDay());
    dispatch(getRevenueByMonth());
    dispatch(getRevenueByQuater());
    dispatch(getRevenueByYear());
  }, [dispatch]);

  const data = [revenuesDay, revenuesMonth, revenuesQuater, revenuesYear];

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {data.map((dataItem, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper className={fixedHeightPaper}>
              <StatisticalChart data={dataItem} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

Statistical.propTypes = {};

export default Statistical;
