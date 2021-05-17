import React, { useState } from 'react';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  updateFoodById,
  delFoodById,
  createNewFood,
  confirmProduct,
} from '../ListProduct/productSlice';
import ConfirmDialog from '../../../components/ConfirmDialog';

const ProductDetailContent = ({ productDetail, action }) => {
  let imgUrlAdd
  if(productDetail.image){
    imgUrlAdd = URL.createObjectURL(productDetail.image)
  }
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.productDetail.loading);
  const roleId = localStorage.getItem('roleId');
  const handleClickEditProduct = () => {
    history.push(
      `/${+roleId === 0 ? 'admin' : 'employee'}/product-management/${productDetail._id}/edit`
    );
  };
  const SaveProduct = () => {
    const { typeId, image, _id, name, unitPrice, discountOff, discountMaximum, description } =
      productDetail;
    const food = {
      typeId: parseInt(typeId),
      _id,
      image,
      name,
      unitPrice: unitPrice,
      discountOff: discountOff ? parseInt(discountOff) : 0,
      discountMaximum: discountMaximum ? parseInt(discountMaximum) : 0,
      description,
    };
    if (action === 'edit') {
      dispatch(updateFoodById(food));
    } else {
      dispatch(createNewFood(food));
    }
    history.push(`/${+roleId === 0 ? 'admin' : 'employee'}/product-management`);
  };
  const handleClickDelete = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Are you sure to delete this product?',
      subTitle: "You can't undo this operation",
      onConfirm: () => {
        onDelete(productDetail._id);
      },
    });
  };
  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(delFoodById(id));
    history.push(`/${+roleId === 0 ? 'admin' : 'employee'}/product-management`);
  };
  const ConfirmProduct = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(confirmProduct(id));
    history.push(`/${+roleId === 0 ? 'admin' : 'employee'}/product-management`);
  };
  const HandleVerifyProduct = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Are you sure to confirm this product?',
      subTitle: "You can't undo this operation",
      onConfirm: () => {
        ConfirmProduct(productDetail._id);
      },
    });
  };
  return (
    <div className="product-detail-content">
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      <div className="product-detail-content-left">
        <img
          src={
            action !== 'add'
              ? (loading
                ? 'https://i.stack.imgur.com/ATB3o.gif'
                : productDetail.imageUrl)
              : (productDetail.image
              ? imgUrlAdd
              : 'https://i.stack.imgur.com/ATB3o.gif')
          }
          alt={productDetail.name}
        />
      </div>
      {!loading ? (
        <div className="product-detail-content-right">
          <h1 className="product-detail-content-title">
            {productDetail.name !== '' ? productDetail.name : "Name's Product"}
          </h1>
          <p className="product-detail-content-create-at">
            {new Date(productDetail.createAt).toLocaleString()}
          </p>
          <table className="mt-1">
            <tbody>
              {productDetail.description!=="undefined" ? (
                <tr>
                  <td>Description:</td>
                  <td>
                    <p className="product-detail-content-description">
                      {productDetail.description}
                    </p>
                  </td>
                </tr>
              ) : null}
              <tr>
                <td>Type:</td>
                <td>
                  <p>{+productDetail.typeId === 1 ? 'Food' : 'Drink'}</p>
                </td>
              </tr>
              <tr>
                <td>Status:</td>
                <td>
                  <p>
                    {productDetail.confirmed ? (
                      <span className="confirmed">Đã phê duyệt</span>
                    ) : (
                      <span className="unconfirmed">Chưa phê duyệt</span>
                    )}
                  </p>
                </td>
              </tr>
              <tr>
                <td>Price:</td>
                <td>
                  <p>
                    {productDetail.unitPrice} <label className="label-vnd">VND</label>
                  </p>
                </td>
              </tr>
              {productDetail.discountOff ? (
                <tr>
                  <td>Discount Off:</td>
                  <td>
                    <p>
                      {productDetail.discountOff} <label className="label-vnd">%</label>
                    </p>
                  </td>
                </tr>
              ) : null}
              {productDetail.discountMaximum ? (
                <tr>
                  <td>Discount Max:</td>
                  <td>
                    <p>
                      {productDetail.discountMaximum} <label className="label-vnd">%</label>
                    </p>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
          {action === 'view' ? (
            <div className="product-detail-content-button">
              <button className="button-edit-product" onClick={handleClickEditProduct}>
                Edit
              </button>
              <button className="button-del-product" onClick={handleClickDelete}>
                Delete
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        ''
      )}
      {loading ? (
        ''
      ) : action === 'view' ? (
        !productDetail.confirmed && +roleId === 0 ? (
          <button className="verify-button" onClick={HandleVerifyProduct}>
            <i className="fas fa-check mr-4"></i>
            Verify
          </button>
        ) : null
      ) : (
        <button className="save-button" onClick={SaveProduct}>
          <i className="fas fa-check mr-4"></i>
          Save
        </button>
      )}
    </div>
  );
};
export default ProductDetailContent;
