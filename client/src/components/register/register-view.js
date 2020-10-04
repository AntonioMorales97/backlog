import React from 'react';

const RegisterView = ({
  onChange,
  onSubmit,
  email,
  name,
  password,
  rePassword,
}) => {
  return (
    <form className='form' onSubmit={onSubmit}>
      <h1 className='lead'>Register new user</h1>
      <div className='form-group'>
        <input
          type='text'
          placeholder='Name'
          name='name'
          onChange={onChange}
          value={name}
          required
        />
      </div>
      <div className='form-group'>
        <input
          type='email'
          placeholder='Email'
          name='email'
          onChange={onChange}
          value={email}
          autoComplete='email'
          required
        />
      </div>
      <div className='form-group'>
        <input
          type='password'
          placeholder='Password'
          name='password'
          onChange={onChange}
          value={password}
          minLength='6'
          autoComplete='new-password'
          required
        />
      </div>
      <div className='form-group'>
        <input
          type='password'
          placeholder='Password again'
          name='rePassword'
          onChange={onChange}
          value={rePassword}
          minLength='6'
          autoComplete='new-password'
          required
        />
      </div>
      <input type='submit' className='btn btn-primary w-100' value='Add' />
    </form>
  );
};

export default RegisterView;
