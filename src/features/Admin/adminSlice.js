import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import adminApi from '../../api/adminApi';

export const getEmployees = createAsyncThunk(
  'admin/getEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminApi.getAllEmployees();
      return res.listEmployees;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getEmployeeById = createAsyncThunk(
  'admin/getEmployeeById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminApi.getEmployeeById(id);
      return res.employee;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const insertEmployee = createAsyncThunk(
  'admin/insertEmployee',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await adminApi.insertEmployee(data);
      dispatch(getEmployees());
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'admin/updateEmployee',
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const res = await adminApi.updateEmployee(id, data);
      dispatch(getEmployees());
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  'admin/deleteEmployee',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await adminApi.deleteEmployee(id);
      dispatch(getEmployees());
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk('admin/getAllUsers', async (_, { rejectWithValue }) => {
  try {
    const res = await adminApi.getAllUsers();
    return res.listUsers;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getAllRoles = createAsyncThunk('admin/getAllRoles', async (_, { rejectWithValue }) => {
  try {
    const res = await adminApi.getAllRoles();
    return res.listRoles;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getPermissionsByUserId = createAsyncThunk(
  'admin/getPermissionsByUserId',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await adminApi.getPermissionsByUserId(userId);
      const permissionsByUserId = res.listPermissons;
      const convertPermissions = [];
      for (const key in permissionsByUserId) {
        const formatActionPermissions = [
          {
            _id: uuidv4(),
            action: 'Edit',
            license: 0,
            disabled: true,
          },

          {
            _id: uuidv4(),
            action: 'Delete',
            license: 0,
            disabled: true,
          },

          {
            _id: uuidv4(),
            action: 'Create',
            license: 0,
            disabled: true,
          },

          {
            _id: uuidv4(),
            action: 'View',
            license: 0,
            disabled: true,
          },
        ];

        const actionPermissions = formatActionPermissions.map((actionPer) => {
          for (const action of permissionsByUserId[key]) {
            if (action.action === actionPer.action) return action;
          }
          return actionPer;
        });

        const convertPermission = {
          namePermission: key,
          actionPermissions,
        };

        convertPermissions.push(convertPermission);
      }
      return convertPermissions;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPermissionByRoleId = createAsyncThunk(
  'admin/getPermissionByRoleId',
  async (roleId, { rejectWithValue }) => {
    try {
      const res = await adminApi.getPermissionByRoleId(+roleId);
      const permissionByRoleId = res.listPermissions;
      const convertPermissions = [];
      for (const key in permissionByRoleId) {
        const formatActionPermissions = [
          {
            _id: uuidv4(),
            action: 'Edit',
            license: 0,
            disabled: true,
          },

          {
            _id: uuidv4(),
            action: 'Delete',
            license: 0,
            disabled: true,
          },

          {
            _id: uuidv4(),
            action: 'Create',
            license: 0,
            disabled: true,
          },

          {
            _id: uuidv4(),
            action: 'View',
            license: 0,
            disabled: true,
          },
        ];

        const actionPermissions = formatActionPermissions.map((actionPer) => {
          for (const action of permissionByRoleId[key]) {
            if (action.action === actionPer.action) return action;
          }
          return actionPer;
        });

        const convertPermission = {
          namePermission: key,
          actionPermissions,
        };

        convertPermissions.push(convertPermission);
      }
      return convertPermissions;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePermissionsByUserId = createAsyncThunk(
  'admin/updatePermissionsByUserId',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await adminApi.updatePermissionsByUserId(id, data);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePermissionByRoleId = createAsyncThunk(
  'admin/updatePermissionByRoleId',
  async ({ id, data, isApply }, { rejectWithValue }) => {
    try {
      const res = await adminApi.updatePermissionByRoleId(id, data, isApply);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getRevenueByDay = createAsyncThunk(
  'admin/getRevenueByDay',
  async (_, { rejectWithValue }) => {
    try {
      const { revenues } = await adminApi.getRevenueByDay();
      const data = [];
      for (const key in revenues) {
        data.push({ time: key, amount: revenues[key] });
      }
      return { name: 'Today', data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getRevenueByMonth = createAsyncThunk(
  'admin/getRevenueByMonth',
  async (_, { rejectWithValue }) => {
    try {
      const { revenues } = await adminApi.getRevenueByMonth();
      const data = [];
      for (const key in revenues) {
        data.push({ time: key, amount: revenues[key] });
      }
      return { name: 'Lastest Month', data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getRevenueByQuater = createAsyncThunk(
  'admin/getRevenueByQuater',
  async (_, { rejectWithValue }) => {
    try {
      const { revenues } = await adminApi.getRevenueByQuater();
      const data = [];
      for (const key in revenues) {
        data.push({ time: key, amount: revenues[key] });
      }
      return { name: 'Lastest Quater', data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getRevenueByYear = createAsyncThunk(
  'admin/getRevenueByYear',
  async (_, { rejectWithValue }) => {
    try {
      const { revenues } = await adminApi.getRevenueByYear();
      const data = [];
      for (const key in revenues) {
        data.push({ time: key, amount: revenues[key] });
      }
      return { name: 'Lastest Year', data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFoods = createAsyncThunk(
  'admin/getFoods',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await adminApi.getAllFoods();
      return res.foods;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  employees: [],
  users: [],
  products: [],
  permissionsByUserId: [],
  permissionByRoleId: [],
  roles: [],
  loading: false,
  actionStatus: null,
  employee: {},
  revenuesDay: {},
  revenuesMonth: {},
  revenuesQuater: {},
  revenuesYear: {},
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setPermissionsByUserId(state, action) {
      return {
        ...state,
        permissionsByUserId: action.payload,
      };
    },
    setPermissionByRoleId(state, action) {
      return {
        ...state,
        permissionByRoleId: action.payload,
      };
    },
  },
  extraReducers: {
    [getEmployees.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getEmployees.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [getEmployees.fulfilled](state, action) {
      state.loading = false;
      state.employees = action.payload;
    },

    [getEmployeeById.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getEmployeeById.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [getEmployeeById.fulfilled](state, action) {
      state.loading = false;
      state.employee = action.payload;
    },

    [insertEmployee.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [insertEmployee.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [insertEmployee.fulfilled](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },

    [deleteEmployee.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [deleteEmployee.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [deleteEmployee.fulfilled](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },

    [updateEmployee.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [updateEmployee.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [updateEmployee.fulfilled](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },

    [getAllUsers.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },

    [getAllUsers.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },

    [getAllUsers.fulfilled](state, action) {
      state.loading = false;
      state.users = action.payload;
    },

    [getPermissionsByUserId.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },

    [getPermissionsByUserId.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },

    [getPermissionsByUserId.fulfilled](state, action) {
      state.loading = false;
      state.permissionsByUserId = action.payload;
    },

    [getPermissionByRoleId.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },

    [getPermissionByRoleId.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },

    [getPermissionByRoleId.fulfilled](state, action) {
      state.loading = false;
      state.permissionByRoleId = action.payload;
    },

    [updatePermissionsByUserId.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },

    [updatePermissionsByUserId.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },

    [updatePermissionsByUserId.fulfilled](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },

    [updatePermissionByRoleId.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },

    [updatePermissionByRoleId.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },

    [updatePermissionByRoleId.fulfilled](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },

    [getAllRoles.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },

    [getAllRoles.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },

    [getAllRoles.fulfilled](state, action) {
      state.loading = false;
      state.roles = action.payload;
    },

    [getRevenueByDay.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getRevenueByDay.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [getRevenueByDay.fulfilled](state, action) {
      state.loading = false;
      state.revenuesDay = action.payload;
    },

    [getRevenueByMonth.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getRevenueByMonth.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [getRevenueByMonth.fulfilled](state, action) {
      state.loading = false;
      state.revenuesMonth = action.payload;
    },

    [getRevenueByQuater.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getRevenueByQuater.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [getRevenueByQuater.fulfilled](state, action) {
      state.loading = false;
      state.revenuesQuater = action.payload;
    },

    [getRevenueByYear.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getRevenueByYear.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [getRevenueByYear.fulfilled](state, action) {
      state.loading = false;
      state.revenuesYear = action.payload;
    },

    [getFoods.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getFoods.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [getFoods.fulfilled](state, action) {
      state.loading = false;
      state.products = action.payload;
    },
  },
});

const { actions, reducer: adminReducer } = adminSlice;

export const { setPermissionsByUserId, setPermissionByRoleId } = actions;

export default adminReducer;
