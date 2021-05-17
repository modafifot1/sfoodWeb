import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import employeeApi from '../../api/employeeApi';

export const getOrdersByStatusId = createAsyncThunk(
  'employee/getOrdersByStatusId',
  async (id, { rejectWithValue }) => {
    try {
      const res = await employeeApi.getListOrderByStatusId(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'employee/updateOrderStatus',
  async ({ id, data, statusId }, { rejectWithValue, dispatch }) => {
    try {
      const res = await employeeApi.updateOrder(id, data);
      dispatch(getOrdersByStatusId(statusId));
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllShippers = createAsyncThunk(
  'employee/getAllShippers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await employeeApi.getAllShippers();
      return res.shippers;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNewShipper = createAsyncThunk(
  'employee/createNewShipper',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await employeeApi.createNewShipper(data);
      dispatch(getAllShippers());
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteShipper = createAsyncThunk(
  'employee/deleteShipper',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await employeeApi.deleteShipper(id);
      dispatch(getAllShippers());
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateInfoShipper = createAsyncThunk(
  'employee/updateInfoShipper',
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const res = await employeeApi.updateInfoShipper(id, data);
      dispatch(getAllShippers());
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllFeedbacks = createAsyncThunk(
  'employee/getAllFeedbacks',
  async (id, { rejectWithValue }) => {
    try {
      const res = await employeeApi.getAllFeedbacks(id);
      return res.feedbacks;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addFeedback = createAsyncThunk(
  'employee/addFeedback',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await employeeApi.addFeedback(data);
      dispatch(getAllFeedbacks());
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addReplyFeedback = createAsyncThunk(
  'employee/addReplyFeedback',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await employeeApi.addReplyFeedback(data);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  orders: [],
  shippers: [],
  feedbacks: [],
  shippersInOrder: [],
  replyFeedbacks: {},
  loading: false,
  actionStatus: null,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    clearActionStatus(state) {
      state.actionStatus = null;
    },
    setReplyFeedbacks(state, action) {
      state.replyFeedbacks = action.payload;
    },
  },
  extraReducers: {
    [getOrdersByStatusId.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getOrdersByStatusId.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [getOrdersByStatusId.fulfilled](state, action) {
      state.loading = true;
      state.orders = action.payload.orders;
      state.shippersInOrder = action.payload.shippers;
    },

    [updateOrderStatus.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [updateOrderStatus.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [updateOrderStatus.fulfilled](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },

    [getAllShippers.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getAllShippers.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [getAllShippers.fulfilled](state, action) {
      state.loading = true;
      state.shippers = action.payload;
    },

    [updateInfoShipper.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [updateInfoShipper.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [updateInfoShipper.fulfilled](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },

    [createNewShipper.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [createNewShipper.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [createNewShipper.fulfilled](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },

    [deleteShipper.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [deleteShipper.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [deleteShipper.fulfilled](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },

    [getAllFeedbacks.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getAllFeedbacks.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [getAllFeedbacks.fulfilled](state, action) {
      state.loading = true;
      state.feedbacks = action.payload;
    },

    [addFeedback.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [addFeedback.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [addFeedback.fulfilled](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },

    [addReplyFeedback.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [addReplyFeedback.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [addReplyFeedback.fulfilled](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
  },
});

const { actions, reducer: employeeReducer } = employeeSlice;

export const { clearActionStatus, setReplyFeedbacks } = actions;

export default employeeReducer;
