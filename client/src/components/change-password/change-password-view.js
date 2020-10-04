import React from 'react';

const ChangePasswordView = ({
  onChange,
  onSubmit,
  oldPassword,
  newPassword,
  rePassword,
}) => {
  return (
    <form className='form' onSubmit={onSubmit}>
      <h1 className='lead'>Change Password</h1>
      <div className='form-group'>
        <input
          type='password'
          placeholder='Old password'
          name='oldPassword'
          onChange={onChange}
          value={oldPassword}
          minLength='6'
          autoComplete='password'
          required
        />
      </div>
      <div className='form-group'>
        <input
          type='password'
          placeholder='New password'
          name='newPassword'
          onChange={onChange}
          value={newPassword}
          minLength='6'
          autoComplete='new-password'
          required
        />
      </div>
      <div className='form-group'>
        <input
          type='password'
          placeholder='New password again'
          name='rePassword'
          onChange={onChange}
          value={rePassword}
          minLength='6'
          autoComplete='new-password'
          required
        />
      </div>
      <input
        type='submit'
        className='btn btn-primary w-100'
        value='Change Password'
      />
    </form>
  );
};

export default ChangePasswordView;
