import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory();

  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    // add validation

    const changePassword = async () => {
      const res = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDI6wchwrz7lmIfuVYuv96gm29vx1Wx3aM',
        {
          method: 'POST',
          body: JSON.stringify({
            idToken: authCtx.token,
            password: enteredNewPassword,
            returnSecureToken: false,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await res.json();
      if (data?.error) throw new Error('Changing password failed: ', data.error);
      history.replace('/');
    };

    try {
      changePassword();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          type='password'
          id='new-password'
          minLength='7'
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
