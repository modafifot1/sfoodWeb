import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { changePassword } from '../profileSlice';
import './styles.css';

const schema = yup.object().shape({
  oldPassword: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/,
      'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:'
    ),
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
    ).oneOf([yup.ref('newPassword'), null], 'Passwords must match')
});
const ChangePassword = () => {
  const roleId = Number(localStorage.getItem('roleId'));
  const history = useHistory();
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    console.log(data.oldPassword);
    dispatch(changePassword(data));
    if (roleId === 0) {
      history.push('/admin/profile');
    } else if (roleId === 2) {
      history.push('/employee/profile');
    } else {
      history.push('/auth/login');
    }
  };
  return (
    <div className="change-password-wrapper">
      <div className="change-password">
        <h1>Change Password</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="pass" className={errors.password && 'validate-label'}>
            Current password:
          </label>
          <br />
          <input
            type="password"
            placeholder="Current Password"
            id="pass"
            name="oldPassword"
            className={errors.oldPassword && 'validate'}
            ref={register}
          />
          <br />
          {errors.oldPassword?.message && (
            <>
              <span>{errors.oldPassword?.message}</span>
              <br />
            </>
          )}
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
          <div className="change-pass-buttons">
            <input type="submit" onClick={handleSubmit(onSubmit)} />
            <input type="reset" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
