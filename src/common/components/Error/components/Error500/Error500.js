import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button, useTheme, useMediaQuery } from '@material-ui/core';
import IMAGE_ERROR_500 from '../../../../../assets/img/undraw_server_down_s4lk.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: '10vh',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
  },
  imageContainer: {
    marginTop: theme.spacing(6),
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    maxWidth: '100%',
    width: 560,
    maxHeight: 200,
    height: 'auto',
  },
  buttonContainer: {
    marginTop: theme.spacing(6),
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Error500 = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(() => {
    document.title = 'Error 500';
  }, []);
  return (
    <div className={classes.root}>
      <Typography align="center" variant={mobileDevice ? 'h4' : 'h1'}>
        500: Ooops, something went terribly wrong!
      </Typography>
      <Typography align="center" variant="subtitle2">
        You either tried some shady route or you came here by mistake. Whichever it is, try using
        the navigation
      </Typography>
      <div className={classes.imageContainer}>
        <img alt="Under development" className={classes.image} src={IMAGE_ERROR_500} />
      </div>
      <div className={classes.buttonContainer}>
        <Button color="primary" component={RouterLink} to="/" variant="outlined">
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default Error500;
