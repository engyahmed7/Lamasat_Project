import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { setCookie } from "cookies-next";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (email === "") return toast.error("Email is required");
      if (password === "") return toast.error("Password is required");
      try {
        const { data } = await axios.post(
          "https://api.lamasat.cloud/api/v1/login",
          { email, password }
        );
        if (data.error) return toast.error(data.error);
        setCookie("access_token", data.access_token);
        setCookie("super_admin", data.superadminrole);
        window.location.replace("/admin");
      } catch (error) {
        toast.error("Please Check your data");
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
    <button
      type="submit"
      className="rounded-md mt-4 bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Login
    </button>
  </form>
  )
}

export default LoginForm