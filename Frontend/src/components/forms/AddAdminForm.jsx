import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { deleteCookie, getCookie } from "cookies-next";

const AddAdminForm = () => {
  const baseUrl =
    process.env.REACT_APP_UIAPI_BASE_URL || "http://127.0.0.1:8000";

  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone_number, setPhone_number] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") return toast.error("Email is required");
    if (password === "") return toast.error("Password is required");
    if (name === "") return toast.error("Name is required");
    if (phone_number === "") return toast.error("Phone Number is required");
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/addAdmin`,
        { email, password, name, phone_number },
        {
          headers: {
            access_token: getCookie("access_token"),
          },
        }
      );
      if (data.error)
        return toast.error("The name and email has already been taken");
      toast.success("Admin created successfully");
      setEmail("");
      setPassword("");
      setName("");
      setPhone_number("");
    } catch (error) {
      toast.error(error.response.data.error);
      deleteCookie("access_token");
      window.location.pathname = "/admin/login";
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full md:w-2/4 ">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {t("email")}
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
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {t("name")}
        </label>
        <div className="mt-2">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="outline-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 px-2"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {t("phone")}
        </label>
        <div className="mt-2">
          <input
            id="phone"
            name="phone"
            type="number"
            autoComplete="phone"
            className="outline-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 px-2"
            onChange={(e) => setPhone_number(e.target.value)}
            value={phone_number}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900 my-3"
        >
          {t("password")}
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
        {t("submitform")}
      </button>
    </form>
  );
};

export default AddAdminForm;
