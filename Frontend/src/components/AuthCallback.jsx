import { setCookie } from "cookies-next";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      document.cookie = `access_token=${token}; path=/`;
      setCookie("super_admin", "false");
      window.location.replace("/admin");
    } else {
      console.error("Token not found in URL");
    }
  }, [navigate]);

  return <div>Authenticating...</div>;
};

export default AuthCallback;
