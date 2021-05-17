import { axiosClientAdmin } from './axiosClient';

const adminApi = {
  getEmployeeById(id) {
    const url = `/employees/${id}`;
    return axiosClientAdmin.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  getAllEmployees() {
    const url = '/employees';
    return axiosClientAdmin.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  insertEmployee(employee) {
    const url = '/employees';
    return axiosClientAdmin.post(url, employee, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  updateEmployee(id, employee) {
    const url = `/employees/${id}`;
    return axiosClientAdmin.put(url, employee, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  deleteEmployee(id) {
    const url = `/employees/${id}`;
    return axiosClientAdmin.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  getAllUsers() {
    const url = '/users';
    return axiosClientAdmin.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  getAllRoles() {
    const url = '/roles';
    return axiosClientAdmin.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  getPermissionByRoleId(id) {
    const url = `/permissions/${id}`;
    return axiosClientAdmin.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  getPermissionsByUserId(id) {
    const url = `/users/${id}/permissions`;
    return axiosClientAdmin.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  updatePermissionByRoleId(id, data, isApply) {
    const url = `/permissions/${id}?applying=${isApply}`;
    return axiosClientAdmin.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  updatePermissionsByUserId(id, data) {
    const url = `/users/${id}/permissions`;
    return axiosClientAdmin.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  getRevenueByDay() {
    const url = `/revenues/day`;
    return axiosClientAdmin.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  getRevenueByMonth() {
    const url = `/revenues/month`;
    return axiosClientAdmin.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  getRevenueByQuater() {
    const url = `/revenues/quater`;
    return axiosClientAdmin.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  getRevenueByYear() {
    const url = `/revenues/year`;
    return axiosClientAdmin.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  getAllFoods() {
    const url = '/foods';
    return axiosClientAdmin.get(url);
  },
};

export default adminApi;
