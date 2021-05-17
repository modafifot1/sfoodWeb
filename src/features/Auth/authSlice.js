import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, profileApi } from '../../api/profileApi';

export const loginUser = createAsyncThunk('users/login', login);

export const sendCodeToResetPassword = createAsyncThunk(
  'auth/sendCodeToResetPassword',
  async (email, { rejectWithValue, dispatch }) => {
    try {
      const res = await profileApi.sendCodeToResetPassword(email);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await profileApi.resetPassword(data);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: {},
  actionStatus: {},
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.user = {};
      state.actionStatus = null;
      return state;
    },
  },
  extraReducers: {
    [loginUser.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [loginUser.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload.status;
    },
    [loginUser.fulfilled](state, action) {
      state.loading = false;
      state.user = action.payload;
    },

    [resetPassword.pending](state) {
      state.actionStatus = {};
      state.loading = true;
    },
    [resetPassword.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [resetPassword.fulfilled](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },

    [sendCodeToResetPassword.pending](state) {
      state.actionStatus = {};
      state.loading = true;
    },
    [sendCodeToResetPassword.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [sendCodeToResetPassword.fulfilled](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
  },
});

const { actions, reducer: authReducer } = authSlice;

export const { clearState } = actions;

export default authReducer;
