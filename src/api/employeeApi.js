import { axiosClientEmployee } from './axiosClient';

const employeeApi = {
  getListOrderByStatusId(id) {
    const url = `/orders/statuses/${id}`;
    return axiosClientEmployee.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  updateOrder(id, data) {
    const url = `/orders/${id}/statuses`;
    return axiosClientEmployee.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  getAllShippers() {
    const url = `/shippers`;
    return axiosClientEmployee.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  createNewShipper(data) {
    const url = `/shippers`;
    return axiosClientEmployee.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  updateInfoShipper(id, data) {
    const url = `/shippers/${id}`;
    return axiosClientEmployee.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  deleteShipper(id) {
    const url = `/shippers/${id}`;
    return axiosClientEmployee.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  getAllFeedbacks(id) {
    const url = `/feedbacks/${id}`;
    return axiosClientEmployee.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  addFeedback(data) {
    const url = '/feedbacks';
    return axiosClientEmployee.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  addReplyFeedback(data) {
    const url = '/feedbacks/reply';
    return axiosClientEmployee.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },
};

export default employeeApi;
