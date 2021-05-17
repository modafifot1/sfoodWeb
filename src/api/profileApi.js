import { axiosClientProfile, axiosClientAuth } from './axiosClient';

export const login = async (data, thunkAPI) => {
  const { email, password } = data;
  try {
    const response = await fetch('https://obscure-inlet-52224.herokuapp.com/api/v1/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      localStorage.setItem('token', data.token);
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
};
export const profileApi = {
  getProfileById() {
    const url = '/userId';
    axiosClientProfile.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    return axiosClientProfile.get(url);
  },
  editProfile(user) {
    const url = '/userId';
    axiosClientProfile.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    return axiosClientProfile.put(url, user);
  },
  changePassword(password) {
    const url = '/change-password';
    axiosClientAuth.defaults.headers.Authorization = "Bearer "+localStorage.getItem("token")
    return axiosClientAuth.post(url,password);
  },
  sendCodeToResetPassword(email){
    const url = '/send-reset-code';
    axiosClientAuth.defaults.headers.Authorization = "Bearer "+localStorage.getItem("token")
    return axiosClientAuth.post(url,{email});
  },
  resetPassword(data){
    const url = '/new-password';
    axiosClientAuth.defaults.headers.Authorization = "Bearer "+localStorage.getItem("token")
    return axiosClientAuth.post(url,data);
  }
};
