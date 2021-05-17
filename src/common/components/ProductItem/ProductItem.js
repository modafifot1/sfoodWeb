import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logo-order-food.png';

export default function ProductItem({ product }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img src={logo} className={classes.logo} alt="img" />
          </Avatar>
        }
        title={product.name}
        subheader={new Date(product.createAt).toLocaleString()}
      />
      <CardMedia className={classes.media} image={product.imageUrl} title={product.name} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {/* {product.description} */}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.footer}>
        <div className={classes.priceCard}>
          <label>Giá: {product.unitPrice} VND</label>
        </div>
        <div className={classes.detail}>
          <Link
            to={`/${
              +localStorage.getItem('roleId') === 0 ? 'admin' : 'employee'
            }/product-management/${product._id}`}
          >
            Xem chi tiết {'>'}{' '}
          </Link>
        </div>
      </CardActions>
    </Card>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: '300px',
    minWidth: '300px',
    minHeight: '320px',
    maxHeight: '340px',
    position: 'relative',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    // padding: "12px 16px",
    position: 'absolute',
    width: '100%',
    left: '0px',
    bottom: '0px',
  },
  detail: {
    float: 'right',
    fontSize: '14px',
  },

  logo: {
    width: '100%',
  },
}));
