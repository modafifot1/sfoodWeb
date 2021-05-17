import { Card, makeStyles, Paper, Typography, Toolbar, InputAdornment } from '@material-ui/core';
import React from 'react';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { Search } from '@material-ui/icons';
import Controls from '../../../components/controls/Controls';
import { changeKeySearch } from './productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fdfdff',
    position: 'relative',
  },
  pageHeader: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    padding: '20px 20px',
  },
  pageIcon: {
    display: 'inline-block',
    padding: theme.spacing(2),
    color: '#3c44b1',
  },
  pageTitle: {
    paddingLeft: theme.spacing(4),
    '& .MuiTypography-subtitle2': {
      opacity: '0.6',
    },
  },
  toolbar: {
    position: 'absolute',
    bottom: '0px',
    right: '0px',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  searchInput: {
    '& .MuiOutlinedInput-input': {
      padding: '11.5px 5px',
      fontSize: '0.95rem',
    },
  },
  buttonAddProduct: {
    backgroundColor: '#1d4eda',
    border: 'none',
    outline: 'none',
    color: 'white',
    borderRadius: '5px',
    padding: '11.5px 14px',
    marginRight: '15px',
    cursor: 'pointer',
  },
  plus: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginRight: '3px',
  },
}));

const optionCategories = [
  {
    name: 'Tất cả',
    value: 'all',
  },
  {
    name: 'Đã phê duyệt',
    value: 'confirmed',
  },
  {
    name: 'Chưa phê duyệt',
    value: 'unconfirmed',
  },
];
const optionPrices = [
  {
    name: 'Tăng dần',
    value: 'increase',
  },
  {
    name: 'Giảm dần',
    value: 'decrease',
  },
];
export default function PageHeader() {
  const history = useHistory();
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.products.filter);
  const roleId = localStorage.getItem('roleId');
  const classes = useStyles();
  const handleChangeKeySearch = (e) => {
    const { name, value } = e.target;
    const obj = {};
    obj.key = name;
    obj.value = value;
    dispatch(changeKeySearch(obj));
  };
  const handleClickAddButton = () => {
    history.push(`/employee/product-management/add`);
  };
  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>
          <FastfoodIcon fontSize="large" />
        </Card>
        <div className={classes.pageTitle}>
          <Typography variant="h6" component="div">
            Products
          </Typography>
          <Typography variant="subtitle2" component="div">
            Products Management
          </Typography>
        </div>
      </div>
      <Toolbar className={classes.toolbar}>
        {+roleId === 2 ? (
          <button className={classes.buttonAddProduct} onClick={handleClickAddButton}>
            <span className={classes.plus}>+</span> Add Product
          </button>
        ) : null}
        <Controls.Input
          label="Search Product"
          name="keySearch"
          className={classes.searchInput}
          value={filter.keySearch}
          onChange={handleChangeKeySearch}
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Controls.ComboBox
          options={optionCategories}
          title="Status"
          name="status"
          onChange={handleChangeKeySearch}
          value={filter.status}
        />
        <Controls.ComboBox
          options={optionPrices}
          title="Giá"
          name="price"
          onChange={handleChangeKeySearch}
          value={filter.price}
        />
      </Toolbar>
    </Paper>
  );
}
