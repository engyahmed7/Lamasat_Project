import { PhotoIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const GetOfferForm = () => {
  const baseUrl =
    process.env.REACT_APP_UIAPI_BASE_URL || "http://127.0.0.1:8000";

  const { t } = useTranslation();

  const [attachment, setAttachment] = useState(null);
  const [phone_number, setPhone_number] = useState("");
  const [email, setEmail] = useState("");
  const [unit_type, setUnit_type] = useState("");
  const [unit_area, setUnit_area] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") return toast.error("Email is required");
    if (phone_number === "") return toast.error("Phone Number is required");
    if (unit_type === "") return toast.error("unit_type is required");
    if (unit_area === "") return toast.error("unit_area is required");
    if (location === "") return toast.error("location is required");
    if (budget === "") return toast.error("budget is required");
    if (attachment === null) return toast.error("Attachment is required");
    const formData = new FormData();
    formData.append("email", email);
    formData.append("attachment", attachment[0]);
    formData.append("phone_number", phone_number);
    formData.append("unit_type", unit_type);
    formData.append("unit_area", unit_area);
    formData.append("location", location);
    formData.append("budget", budget);

    try {
      console.log(formData);
      const { data } = await axios.post(
        `${baseUrl}/api/v1/offers/add`,
        formData
      );

      if (data.errors) {
        toast.error("Please Check your data");
        console.log(data.errors);
      }

      toast.success("Offer created successfully");
      setEmail("");
      setLocation("");
      setBudget("");
      setPhone_number("");
      setUnit_area("");
      setUnit_type("");
      setAttachment(null);
    } catch (error) {
      toast.error("Please Check your data");
      console.log(error);
    }
  };
  return (
    <form
      className="w-5/6 md:w-2/6 grid grid-cols-1 md:grid-cols-2  gap-5 p-7 my-7 rounded-lg"
      style={{ backgroundColor: "#EDFBE2" }}
      onSubmit={handleSubmit}
    >
      <div>
        <label
          htmlFor="email"
          className="block  text-sm font-medium leading-6 text-gray-900"
        >
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="outline-0 mt-2 w-full  block  rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6 px-3"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {t("phone")}
        </label>
        <div className="mt-2 ">
          <input
            id="phone"
            name="phone"
            type="number"
            autoComplete="phone"
            className="outline-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-200 sm:text-sm sm:leading-6 px-2"
            onChange={(e) => setPhone_number(e.target.value)}
            value={phone_number}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="unit-type"
          className="block text-sm font-medium leading-6 text-gray-900 my-3"
        >
          {t("unitType")}
        </label>
        <div className="mt-2 ">
          <input
            id="unit-type"
            name="unit-type"
            type="text"
            autoComplete="unit-type"
            className="outline-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-200 sm:text-sm sm:leading-6 px-2"
            onChange={(e) => setUnit_type(e.target.value)}
            value={unit_type}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="space"
          className="block text-sm font-medium leading-6 text-gray-900 my-3"
        >
          {t("unitArea")}
        </label>
        <div className="mt-2 ">
          <input
            id="space"
            name="space"
            type="number"
            autoComplete="space"
            className="outline-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-200 sm:text-sm sm:leading-6 px-2"
            onChange={(e) => setUnit_area(e.target.value)}
            value={unit_area}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium leading-6 text-gray-900 my-3"
        >
          {t("location")}
        </label>
        <div className="mt-2 ">
          <input
            id="location"
            name="location"
            type="text"
            autoComplete="location"
            className="outline-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-200 sm:text-sm sm:leading-6 px-2"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="budget"
          className="block text-sm font-medium leading-6 text-gray-900 my-3"
        >
          {t("budget")}
        </label>
        <div className="mt-2 ">
          <input
            id="budget"
            name="budget"
            type="number"
            autoComplete="budget"
            className="outline-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-200 sm:text-sm sm:leading-6 px-2"
            onChange={(e) => setBudget(e.target.value)}
            value={budget}
          />
        </div>
      </div>
      <div className="col-span-full mt-3 text-center rounded-lg border border-dashed border-gray-900/25">
        <label
          htmlFor="file-upload"
          className=" my-5  cursor-pointer rounded-md font-semibold text-gray-900  hover:text-indigo-500"
        >
          <p style={{ marginTop: "10px" }}>{t("uploadAImage")}</p>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            multiple
            onChange={(e) => setAttachment(e.target.files)}
          />
        </label>

        {attachment && attachment.length > 0 && (
          <ul style={{ marginTop: "5px", marginBottom: "10px" }}>
            {Array.from(attachment).map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
        {!attachment && (
          <p style={{ marginTop: "5px", marginBottom: "10px" }}>
            {t("examImg")}
          </p>
        )}
      </div>
      <div className="col-span-full mx-auto mt-3">
        <button
          type="submit"
          className="rounded-md text-white "
          style={{
            backgroundColor: "#54b435",
            width: "188px",
            height: "56px",
          }}
        >
          {t("submitform")}
        </button>
      </div>
    </form>
  );
};

export default GetOfferForm;
