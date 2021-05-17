import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../../../common/components/ProductDetail/ProductDetailSlice';
import ListFeedback from '../ListFeedback/ListFeedback';
import ProductDetailContent from '../ProductDetailContent/ProductDetailContent';
import './Style.css';

export default function ProductDetail() {
  const productDetail = useSelector((state) => state.productDetail.data);
  const loading = useSelector((state) => state.productDetail.loading);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);
  return (
    <div className="product-detail">
      {productDetail.status === 200 ? (
        <>
          <ProductDetailContent productDetail={productDetail} action="view" />
          <div className="product-detail-feedbacks">
            {loading ? '' : <ListFeedback listFeedback={productDetail.feedbacks} />}
          </div>
        </>
      ) : (
        'Không tìm thấy sản phẩm'
      )}
    </div>
  );
}
