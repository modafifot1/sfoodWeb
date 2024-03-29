import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from '../../../api/productApi';

export const getFoods = createAsyncThunk(
  'product/getFoods',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await productApi.getAllFoods();
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateFoodById = createAsyncThunk(
  'product/updateFoodById',
  async (food, { rejectWithValue, dispatch }) => {
    try {
      const res = await productApi.updateFoodById(food);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const delFoodById = createAsyncThunk(
  'product/delFoodById',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await productApi.delFoodById(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const createNewFood = createAsyncThunk(
  'product/createNewFood',
  async (food, { rejectWithValue, dispatch }) => {
    try {
      const res = await productApi.createNewFood(food);
      dispatch(getFoods())
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const confirmProduct = createAsyncThunk(
  'product/confirmProduct',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await productApi.verifyFood(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  foods: [],
  filter: {
    keySearch: '',
  },
  actionStatus: {
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {
    changeKeySearch(state, action) {
      const { key, value } = action.payload;
      state.filter[key] = value;
      return state;
    },
  },
  extraReducers: {
    [getFoods.pending](state) {
      state.loading = true;
    },
    [getFoods.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [getFoods.fulfilled](state, action) {
      state.loading = false;
      state.foods = action.payload.foods;
      state.actionStatus = {}
    },

    [updateFoodById.pending](state) {
      state.loading = true;
    },
    [updateFoodById.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [updateFoodById.fulfilled](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },

    [delFoodById.pending](state) {
      state.loading = true;
    },
    [delFoodById.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [delFoodById.fulfilled](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },

    [createNewFood.pending](state) {
      state.loading = true;
    },
    [createNewFood.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [createNewFood.fulfilled](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },

    [confirmProduct.pending](state) {
      state.loading = true;
    },
    [confirmProduct.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [confirmProduct.fulfilled](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
  },
});

const { actions, reducer: productReducer } = productSlice;

export const { changeKeySearch } = actions;

export default productReducer;
