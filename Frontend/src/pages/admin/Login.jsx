import React from 'react';
import LoginForm from '../../components/forms/LoginForm';
import Navbar from '../../components/Navbar';
import GoogleLoginButton from '../../components/GoogleLoginButton';

const Login = () => {
  return (
    <>
      <Navbar />
      <div className="mx-auto w-full md:w-2/5 p-5 fix-height">
        <h3 className="text-3xl font-bold text-gray-800 p-4 text-center">
          Admin Login
        </h3>
        <LoginForm />
        <GoogleLoginButton />
      </div>
    </>
  );
};

export default Login;
