import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProductItem from '../ProductItem/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import { getFoods } from '../../../common/components/ListProduct/productSlice';
import Header from './HeaderProductManagement';
import Notification from '../../../components/Notification';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '80px 0',
    overflow: 'hidden',
  },
  control: {
    padding: theme.spacing(2),
  },
}));
const filterByStatus = (listProduct, status) => {
  let listProductFiltered = [];
  if (status === 'confirmed') {
    listProductFiltered = listProduct.filter((product) => product.confirmed === true);
  } else if (status === 'unconfirmed') {
    listProductFiltered = listProduct.filter((product) => product.confirmed === false);
  } else listProductFiltered = listProduct;
  return listProductFiltered;
};
const checkFilter = (item, searchText) => {
  const isMatchText = (text) => text.toUpperCase().includes(searchText);
  const { name } = item;
  return isMatchText(name);
};
const filterByKeySearch = (listProduct, searchText) => {
  searchText = searchText.toUpperCase();
  if (listProduct) {
    if (listProduct.length > 0) {
      let arrFiltered = listProduct.filter((item) => checkFilter(item, searchText));
      return [...arrFiltered];
    }
  }
  return [];
};

export default function ListProduct() {
  const listProduct = useSelector((state) => state.products.foods);
  const {filter,actionStatus} = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  useEffect(() => {
    dispatch(getFoods());
  }, [dispatch]);
  useEffect(() => {
    if (actionStatus.status) {
      setNotify({
        isOpen: true,
        message: actionStatus.msg,
        type:
          actionStatus.status === 200 ||
          actionStatus.status === 201 ||
          actionStatus.status === 202 ||
          actionStatus.status === 203 ||
          actionStatus.status === 204
            ? 'success'
            : 'error',
      });
    }
  }, [actionStatus]);

  let listProductFiltered = filterByStatus(listProduct, filter.status);
  listProductFiltered = filterByKeySearch(listProductFiltered, filter.keySearch);
  if (filter.price) {
    let order = filter.price === 'increase' ? 1 : -1;
    listProductFiltered.sort((a, b) => {
      return a.unitPrice >= b.unitPrice ? order * 1 : order * -1;
    });
  }
  return (
    <>
      <Header />
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={6}>
            {listProductFiltered.map((product, index) => (
              <Grid key={index} item>
                <ProductItem product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Notification notify={notify} setNotify={setNotify} />
      </Grid>
    </>
  );
}
