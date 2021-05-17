import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Notification from '../../../../components/Notification';
import { loginUser } from '../../authSlice';
import './styles.css';

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email is invalid'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/,
      'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:'
    ),
});

const Login = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const { actionStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    if (actionStatus) {
      setNotify({
        isOpen: true,
        message:
          actionStatus === 200 ||
          actionStatus === 201 ||
          actionStatus === 202 ||
          actionStatus === 203 ||
          actionStatus === 204
            ? 'Sign in successfully'
            : 'Email or password is incorrect',
        type:
          actionStatus === 200 ||
          actionStatus === 201 ||
          actionStatus === 202 ||
          actionStatus === 203 ||
          actionStatus === 204
            ? 'success'
            : 'error',
      });
    }
  }, [actionStatus]);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };
  return (
    <div className="login">
      <div className="header">
        <div className="icon">
          <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
          </svg>
        </div>
        <h3>Đăng nhập</h3>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className={errors.email && 'validate-label'}>
            Email:
          </label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            name="email"
            className={errors.email && 'validate'}
            ref={register}
          />

          <br />
          {errors.email?.message && <span>{errors.email?.message}</span>}
          <br />
          <label htmlFor="pass" className={errors.password && 'validate-label'}>
            Password:
          </label>
          <input
            type="password"
            placeholder="Password"
            id="pass"
            name="password"
            className={errors.password && 'validate'}
            ref={register}
          />

          <br />
          {errors.password?.message && <span>{errors.password?.message}</span>}

          <input type="submit" value="Đăng nhập" />
          <a href="/auth/forgot-password">Quên mật khẩu ?</a>
        </form>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default Login;
