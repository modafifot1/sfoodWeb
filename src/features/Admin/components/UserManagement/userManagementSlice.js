// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import adminApi from "../../../../api/adminApi";

// export const getAllUsers = createAsyncThunk(
//   "admin/userManag/getAllUsers",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await adminApi.getAllUsers();
//       return res.listUsers;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const initialState = {
//   users: [],
//   loading: false,
//   actionStatus: null,
// };

// const userManagementSlice = createSlice({
//   name: "admin/userManag",
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [getAllUsers.pending](state) {
//       state.loading = true;
//     },

//     [getAllUsers.rejected](state, action) {
//       state.loading = false;
//       state.actionStatus = action.payload;
//     },

//     [getAllUsers.fulfilled](state, action) {
//       state.loading = false;
//       state.users = action.payload;
//     },
//   },
// });

// const { reducer: userManagReducer } = userManagementSlice;

// export default userManagReducer;
