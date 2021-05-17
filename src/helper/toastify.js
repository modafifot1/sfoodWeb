
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastifySuccess = (message) => toast.success(`${message} 🥰🥰🥰`, {autoClose: 3000});

export const toastifyError = (message) => toast.error(`${message} 😥😥😥`, {autoClose: 3000});