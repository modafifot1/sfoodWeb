import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../../../common/components/ProductDetail/ProductDetailSlice';
import ProductDetailContent from '../ProductDetailContent/ProductDetailContent';
import './index.css';

export default function EditProduct() {
  const productDetail = useSelector((state) => state.productDetail.data);
  const [productEdit, setProductEdit] = useState(productDetail);
  const [productAdd, setProductAdd] = useState({
    name: '',
    typeId: 1,
    createAt: new Date(),
  });
  const { id } = useParams();
  const onChange = (e) => {
    let { name, value } = e.target;
    if (
      name === 'discountMaximum' ||
      name === 'discountOff' ||
      name === 'unitPrice' ||
      name === 'typeId'
    ) {
      value = parseInt(value);
    }
    if (name === 'discountOff' && value > 100) {
      value = 100;
    }
    if ((name === 'discountMaximum' || name === "unitPrice"|| 
        name === 'discountOff') && value < 0) {
      value = 0;
    }
    if (id) {
      setProductEdit((productEdit) => ({ ...productEdit, [name]: value }));
    } else {
      setProductAdd((productAdd) => ({ ...productAdd, [name]: value }));
    }
  };
  const onChangeFile = (e) => {
    setProductAdd((productAdd) => ({ ...productAdd, image: e.target.files[0] }));
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (id !== undefined) {
      dispatch(getProductDetail(id));
    }
  }, [dispatch, id]);
  return (
    <div className="product-edit">
      <ProductDetailContent
        productDetail={id ? productEdit : productAdd}
        action={id ? 'edit' : 'add'}
      />
      <div className="form-edit-product">
        <h2 className="form-edit-title">
          {id ? `Edit ${productDetail.name}` : `Add ${productAdd.name}`}
        </h2>
        <form>
          {!id ? (
            <>
              <label htmlFor="image" className="label">
                Food's Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="input-food-image"
                onChange={onChangeFile}
                accept="image/*"
              ></input>
            </>
          ) : null}
          <label htmlFor="type" className="label">
            Choose type of product:
          </label>
          <select
            name="typeId"
            id="type"
            value={id ? productEdit.typeId : productAdd.typeId}
            onChange={onChange}
          >
            <option value={1}>Food</option>
            <option value={2}>Drink</option>
          </select>

          <label htmlFor="name" className="label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={id ? productEdit.name : productAdd.name}
            onChange={onChange}
          ></input>

          <label htmlFor="unitPrice" className="label">
            Unit Price:
          </label>
          <input
            type="number"
            id="unitPrice"
            name="unitPrice"
            value={id ? productEdit.unitPrice : productAdd.unitPrice}
            onChange={onChange}
          ></input>

          <label htmlFor="discountOff" className="label">
            Discount Off (%):
          </label>
          <input
            type="number"
            id="discountOff"
            name="discountOff"
            value={
              id
                ? productEdit.discountOff
                  ? productEdit.discountOff
                  : 0
                : productAdd.discountOff
                ? productAdd.discountOff
                : 0
            }
            onChange={onChange}
            max={100}
            min={-100}
          ></input>

          <label htmlFor="discountMaximum" className="label">
            Discount Maximum (VND):
          </label>
          <input
            type="number"
            id="discountMaximum"
            name="discountMaximum"
            value={
              id
                ? productEdit.discountMaximum
                  ? productEdit.discountMaximum
                  : 0
                : productAdd.discountMaximum
                ? productAdd.discountMaximum
                : 0
            }
            onChange={onChange}
            max={100}
            min={0}
          ></input>

          <label htmlFor="description" className="label">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={id ? productEdit.description : productAdd.description}
            onChange={onChange}
          />
        </form>
      </div>
    </div>
  );
}
