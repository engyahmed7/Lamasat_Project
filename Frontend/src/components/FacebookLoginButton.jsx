import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook} from "@fortawesome/free-brands-svg-icons";
import styles from '../styles/GoogleBtnStyle.module.css'

const FacebookLoginButton = () => {
  const baseUrl = process.env.REACT_APP_UIAPI_BASE_URL;
  const handleFacebookLogin = () => {
    window.location.href = `${baseUrl}/api/v1/auth/facebook`;
  };

  return (
    <div className="flex items-center justify-center h-full">
    <button
      onClick={handleFacebookLogin}
      className={`${styles.googleSigninBtn} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
    >
      <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
      <span className={styles.text}>Sign in with Facebook</span>
    </button>
  </div>
  );
};

export default FacebookLoginButton;
