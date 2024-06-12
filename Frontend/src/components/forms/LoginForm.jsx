import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { setCookie } from "cookies-next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
  const baseUrl =
    process.env.REACT_APP_UIAPI_BASE_URL || "http://127.0.0.1:8000";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading , setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (email === "") return toast.error("Email is required");
    if (password === "") return toast.error("Password is required");
    try {
      const { data } = await axios.post(`${baseUrl}/api/v1/login`, {
        email,
        password,
      });
      console.log("data  " + data);
      if (data.error) return toast.error(data.error);
      setCookie("access_token", data.access_token);
      setCookie("super_admin", data.superadminrole);
      window.location.replace("/admin");
    } catch (error) {
      toast.error("Please Check your data");
      console.log("error: ", error);
    } finally{
      setLoading(false)
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="outline-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 px-2"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900 my-3"
        >
          Password
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            className="outline-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 px-2"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
      </div>
      {loading ? (
          <button
            type="button"
            className="my-3 rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm flex items-center justify-center"
            disabled
          >
          <FontAwesomeIcon icon={faSpinner} spin className="text-white mr-2" />Login
          </button>
        ) : (
          <button
            type="submit"
            className="my-3 rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </button>
        )}
    </form>
  );
};

export default LoginForm;
