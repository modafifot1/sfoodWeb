import { axiosClientProduct, axiosClientAdmin } from './axiosClient';
const productApi = {
  getAllFoods() {
    const roleId = localStorage.getItem('roleId');
    if (+roleId === 2) {
      return axiosClientProduct.get('',{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } else if (+roleId === 0) {
      return axiosClientAdmin.get('/foods',{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    }
  },
  getFoodById(id) {
    const url = `/${id}`;
    return axiosClientProduct.get(url,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },
  updateFoodById(food) {
    const url = `/${food._id}`;
    return axiosClientProduct.put(url, food,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },
  delFoodById(id) {
    const url = `/${id}`;
    return axiosClientProduct.delete(url,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },
  createNewFood(food) {
    const url = '';
    const formData = new FormData();
    formData.append('image', food.image);
    formData.append('name', food.name);
    formData.append('typeId', food.typeId);
    formData.append('unitPrice', food.unitPrice);
    formData.append('discountOff', food.discountOff);
    formData.append('discountMaximum', food.discountMaximum);
    formData.append('description', food.description);
    return axiosClientProduct.post(url, formData,{
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },
  verifyFood(id) {
    const url = `/foods/${id}`;
    return axiosClientAdmin.post(url,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },
};
export default productApi;
