import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from '../../../api/productApi';

export const getProductDetail = createAsyncThunk(
  'products/getFoodById',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await productApi.getFoodById(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  data: {
    status: 200,
  },
};

const productDetailSlice = createSlice({
  name: 'productDetails',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getProductDetail.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getProductDetail.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
      state.data.status = action.payload.status;
    },
    [getProductDetail.fulfilled](state, action) {
      state.loading = false;
      state.data = action.payload;
    },
  },
});

const { reducer: productDetailReducer } = productDetailSlice;

export default productDetailReducer;
