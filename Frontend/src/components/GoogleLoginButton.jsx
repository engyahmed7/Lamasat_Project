import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const GoogleLoginButton = () => {
    const handleGoogleLogin = () => {
        window.location.href = 'http://127.0.0.1:8000/api/v1/auth/google';
    };

    return (
        <div className="flex items-center justify-center h-full">
        <button onClick={handleGoogleLogin} className="flex items-center space-x-2 rounded-md bg-gray-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          <FontAwesomeIcon icon={faGoogle} style={{ color: '#DB4437' }} />
          <span>Sign in with Google</span>
        </button>
      </div>
    );
};

export default GoogleLoginButton;
