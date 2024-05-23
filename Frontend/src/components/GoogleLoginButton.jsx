import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import styles from '../styles/GoogleBtnStyle.module.css'

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://127.0.0.1:8000/api/v1/auth/google";
  };

  return (
    <div className="flex items-center justify-center h-full">
    <button
      onClick={handleGoogleLogin}
      className={`${styles.googleSigninBtn} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
    >
      <FontAwesomeIcon icon={faGoogle} className={styles.icon} />
      <span className={styles.text}>Sign in with Google</span>
    </button>
  </div>
  );
};

export default GoogleLoginButton;
