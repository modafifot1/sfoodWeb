import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileById } from '../profileSlice';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { editProfile } from '../profileSlice';
import './styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import userAvatar from '../../../assets/img/user-avatar.png';
import Notification from '../../../components/Notification';

const Profile = () => {
  const inputEl = useRef(null);
  const history = useHistory();
  const [isEditUser, setStatusEditUser] = useState(false);
  const { user, loading, actionStatus } = useSelector((state) => state.profile);
  const [userEdit, setUserEdit] = useState(user);
  const roleId = Number(localStorage.getItem('roleId'));

  const dispatch = useDispatch();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  useEffect(() => {
    dispatch(getProfileById());
  }, [dispatch]);
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

  const handleClickEditProfile = () => {
    setUserEdit(user);
    setStatusEditUser(true);
    inputEl.current.focus();
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setUserEdit((userEdit) => ({ ...userEdit, [name]: value }));
  };
  const handleClickChangePassword = () => {
    if(+localStorage.getItem("roleId")===0){
      history.push('/admin/change-password');
    } else if(+localStorage.getItem("roleId")===2){
      history.push('/employee/change-password');
    }else{
      history.push('/auth/login');
    }
  };
  const handleClickSaveChange = () => {
    dispatch(editProfile(userEdit));
    setStatusEditUser(false);
  };
  return (
    <div className="profile">
      <div className="profile-left">
        <img src={userAvatar} alt="Avatar" />
      </div>
      <div className="profile-right">
        <table>
          <tbody>
            <tr>
              <td>Full name:</td>
              <td className={isEditUser ? 'content edit' : 'content'}>
                <input
                  value={!loading ? (isEditUser ? userEdit.fullName : user.fullName) : null}
                  readOnly={!isEditUser}
                  name="fullName"
                  onChange={onChange}
                  ref={inputEl}
                />
              </td>
            </tr>
            <tr>
              <td>Email:</td>
              <td className="content">
                <input
                  value={!loading ? (isEditUser ? userEdit.email : user.email) : null}
                  readOnly
                  name="email"
                  onChange={onChange}
                />
              </td>
            </tr>
            <tr>
              <td>Phone number:</td>
              <td className={isEditUser ? 'content edit' : 'content'}>
                <input
                  value={!loading ? (isEditUser ? userEdit.phoneNumber : user.phoneNumber) : null}
                  readOnly={!isEditUser}
                  name="phoneNumber"
                  onChange={onChange}
                />
              </td>
            </tr>
            <tr>
              <td>Address:</td>
              <td className={isEditUser ? 'content edit' : 'content'}>
                <input
                  value={!loading ? (isEditUser ? userEdit.address : user.address) : null}
                  readOnly={!isEditUser}
                  name="address"
                  onChange={onChange}
                />
              </td>
            </tr>
            <tr>
              <td>Birthday:</td>
              <td className={isEditUser ? 'content edit' : 'content'}>
                <DatePicker
                  selected={
                    !loading
                      ? isEditUser
                        ? new Date(userEdit.birthday)
                        : user.birthday
                        ? new Date(user.birthday)
                        : null
                      : null
                  }
                  onChange={
                    isEditUser ? (date) => setUserEdit({ ...userEdit, birthday: date }) : null
                  }
                />
              </td>
            </tr>
            <tr>
              <td>Position :</td>
              <td className="content">
                <input
                  value={!loading ? (roleId === 0 ? 'ADMIN' : 'EMPLOYEE') : null}
                  readOnly={true}
                />
              </td>
            </tr>
            {!isEditUser ? (
              <tr className="buttons">
                <td>
                  <button className="button-edit-profile" onClick={handleClickEditProfile}>
                    Edit Profile
                  </button>
                </td>
                <td>
                  <button className="button-change-password" onClick={handleClickChangePassword}>
                    Change Password
                  </button>
                </td>
              </tr>
            ) : (
              <tr className="buttons">
                <td>
                  <button className="button-change-password" onClick={handleClickSaveChange}>
                    Save Change
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};
export default Profile;
