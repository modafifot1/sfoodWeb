import React, { useState, useEffect } from 'react';
import './index.css';
import Logo from '../../../../assets/img/logo-order-food.png';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, sendCodeToResetPassword } from '../../authSlice';
import { useHistory } from 'react-router';
import Notification from '../../../../components/Notification';

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required('New Password is required')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/,
      'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/,
      'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:'
    ),
});

const ForgotPassword = () => {
  const history = useHistory();
  const [isSended, setIsSended] = useState(false);
  const [email, setEmail] = useState('');
  const actionStatus = useSelector((state) => state.auth.actionStatus);
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSended) {
      const email = e.target.email.value;
      await dispatch(sendCodeToResetPassword(email));
      setIsSended(true);
      setEmail(email);
    } else {
      setIsSended(false);
    }
  };
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const onSubmit2 = async (data) => {
    const dataRequest = { ...data, email };
    const rs = await dispatch(resetPassword(dataRequest));
    if (rs.type === 'auth/resetPassword/fulfilled') {
      history.push('/auth/login');
    }
  };

  useEffect(() => {
    if (actionStatus.status) {
      setNotify({
        isOpen: true,
        message: actionStatus.msg,
        type:
          actionStatus.status === 200 ||
          actionStatus.status === 201 ||
          actionStatus.status === 202 ||
          actionStatus.status === 203 ||
          actionStatus.status === 204
            ? 'success'
            : 'error',
      });
    }
  }, [actionStatus]);
  return (
    <div className="forgot-password">
      <img src={Logo} className="forgot-pass-logo" alt="img" />
      <h2 className="forgot-pass-title">Reset your password</h2>
      <div className="forgot-pass-box">
        <p>
          Enter your user account's verified email address and we will send you a code to reset
          password.
        </p>
        <form className="forgot-pass-form" onSubmit={onSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="forgot-pass-input"
            required
            readOnly={isSended}
          />
          <input
            className="forgot-pass-button-send"
            type="submit"
            value={!isSended ? 'Gửi' : 'Gửi lại'}
          />
        </form>
        {isSended ? (
          <form className="forgot-password-2" onSubmit={handleSubmit}>
            <label htmlFor="new_pass" className={errors.password && 'validate-label'}>
              New Password:
            </label>
            <br />
            <input
              type="password"
              placeholder="New password"
              id="new_pass"
              name="newPassword"
              className={errors.password && 'validate2'}
              ref={register}
            />
            <br />
            {errors.newPassword?.message && (
              <>
                <span>{errors.newPassword?.message}</span>
                <br />
              </>
            )}
            <label htmlFor="new_pass2" className={errors.password && 'validate-label'}>
              Confirm password:
            </label>
            <br />
            <input
              type="password"
              placeholder="Repeat new password"
              id="new_pass2"
              name="confirmPassword"
              className={errors.password && 'validate3'}
              ref={register}
            />
            <br />
            {errors.confirmPassword?.message && (
              <>
                <span>{errors.confirmPassword?.message}</span>
                <br />
              </>
            )}
            <label htmlFor="code" className={errors.code && 'validate-label'}>
              Code:
            </label>
            <br />
            <input
              type="code"
              placeholder="Code"
              id="code"
              name="code"
              className={errors.code && 'validate3'}
              ref={register}
              required
            />
            <div className="change-pass-buttons">
              <input type="submit" onClick={handleSubmit(onSubmit2)} />
              <input type="reset" />
            </div>
          </form>
        ) : null}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default ForgotPassword;
