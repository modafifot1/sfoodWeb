import { makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ComboBox from '../../../../components/controls/ComboBox';
import Controls from '../../../../components/controls/Controls';
import Notification from '../../../../components/Notification';
import PageHeader from '../../../../components/PageHeader';
import Popup from '../../../../components/Popup';
import useTable from '../../../../components/useTable';
import { getOrdersByStatusId, updateOrderStatus } from '../../employeeSlice';
import OrderForm from './components/OrderForm';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: '75%',
    '& .MuiOutlinedInput-input': {
      padding: '11.5px 14px',
      fontSize: '0.95rem',
    },
  },
  newButton: {
    position: 'absolute',
    right: '10px',
  },
  '.MuiOutlinedInput-input': {
    padding: '11.5px 14px',
  },
}));

const statusOrders = [
  { value: 0, name: 'Chờ xác nhận' },
  { value: 1, name: 'Chờ lấy hàng' },
  { value: 2, name: 'Đang giao hàng' },
  { value: 3, name: 'Đã giao hàng' },
  { value: 4, name: 'Thành công' },
];

const mapStatusOrder = (value) => {
  return statusOrders.find((statusOrder) => statusOrder.value === +value).name;
};

const headCells = [
  { id: '_id', label: 'Orders' },
  { id: 'customerName', label: 'Customer' },
  { id: 'address', label: 'Address' },
  { id: 'total', label: 'Total' },
  { id: 'paymentMethod', label: 'Payment' },
  { id: 'orderStatus', label: 'Order Status' },
  { id: 'actions', label: 'Actions', disableSorting: true },
];

export default function OrderManagement() {
  const dispatch = useDispatch();
  const { orders, shippersInOrder, actionStatus } = useSelector((state) => state.employee);
  const [statusId, setStatusId] = useState(null);
  const classes = useStyles();
  useEffect(() => {
    dispatch(getOrdersByStatusId(statusId));
  }, [dispatch, statusId]);
  const [recordForEdit, setRecordForEdit] = useState(null);

  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(
    orders,
    headCells,
    {
      fn: (items) => {
        return items;
      },
    }
  );

  useEffect(() => {
    if (actionStatus) {
      setNotify({
        isOpen: true,
        message:
          actionStatus.status === 200 ||
          actionStatus.status === 201 ||
          actionStatus.status === 202 ||
          actionStatus.status === 203 ||
          actionStatus.status === 204
            ? 'Update order successfully'
            : 'Update order failed',
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

  const updateOrder = (order, resetForm) => {
    dispatch(updateOrderStatus({ id: order._id, data: order, statusId }));
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const handleStatusOrderChange = (e) => {
    setStatusId(e.target.value);
  };

  return (
    <>
      <PageHeader
        title="Order"
        subTitle="Order Management"
        icon={<ShoppingCart fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <ComboBox
            options={statusOrders}
            onChange={handleStatusOrderChange}
            name="statusChange"
            title="Status"
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item, ind) => (
              <TableRow key={item._id}>
                <TableCell>{ind + 1}</TableCell>
                <TableCell>{item.customerName}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.total}</TableCell>
                <TableCell>{item.paymentMethod}</TableCell>
                <TableCell>{mapStatusOrder(item.statusId)}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup title="Update Order" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <OrderForm
          recordForEdit={recordForEdit}
          updateOrder={updateOrder}
          statusId={statusId}
          nameButton="Update"
          shippersInOrder={shippersInOrder}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
