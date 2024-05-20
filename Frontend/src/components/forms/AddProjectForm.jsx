import { PhotoIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";

import axios from "axios";
import { useTranslation } from "react-i18next";
const AddProjectForm = () => {
  const baseUrl =
    process.env.REACT_APP_UIAPI_BASE_URL || "http://127.0.0.1:8000";
  const { t } = useTranslation();

  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [category_id, setCategory_id] = useState("1");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [finished_at, setFinished_at] = useState("");
  const [images, setImages] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (titleEn === "") return toast.error("Title English is required");
    if (titleAr === "") return toast.error("Title Arabic is required");
    if (category_id === "") return toast.error("Category is required");
    if (descriptionEn === "")
      return toast.error("Description English is required");
    if (descriptionAr === "")
      return toast.error("Description Arabic is required");
    if (finished_at === "") return toast.error("End Project Date is required");
    if (images == null) return toast.error("Images is required");
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("images[]", images[i]);
    }
    const title = {
      en: titleEn,
      ar: titleAr,
    };
    const description = {
      en: descriptionEn,
      ar: descriptionAr,
    };
    formData.append("images[]", images);
    formData.append("title", JSON.stringify(title));
    formData.append("description", JSON.stringify(description));
    formData.append("finished_at", finished_at);
    formData.append("category_id", category_id);
    formData.append("duration", "3");
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/projects/add`,
        formData,
        {
          headers: {
            access_token: getCookie("access_token"),
          },
        }
      );
      if (data.errors) return toast.error("Please Check your data");
      toast.success("Project created successfully");
      setCategory_id("1");
      setImages(null);
      setDescriptionAr("");
      setDescriptionEn("");
      setFinished_at("");
      setTitleAr("");
      setTitleEn("");
    } catch (error) {
      toast.error(error.response.data.error);
      // deleteCookie("access_token");
      // window.location.pathname = "/admin/login";
    }
  };

  return (
    <form
      className="w-5/6 md:w-4/4 bg-white grid grid-cols-1 md:grid-cols-2  gap-4 p-5 my-7 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {t("titleAr")}
        </label>
        <div className="mt-2">
          <input
            id="title"
            name="title"
            type="title"
            autoComplete="title"
            className="outline-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 px-2"
            onChange={(e) => setTitleAr(e.target.value)}
            value={titleAr}
            maxLength={25}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {t("titleEn")}
        </label>
        <div className="mt-2">
          <input
            id="title"
            name="title"
            type="title"
            autoComplete="title"
            className="outline-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 px-2"
            onChange={(e) => setTitleEn(e.target.value)}
            value={titleEn}
            maxLength={25}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="project-date"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {t("endProjectDate")}
        </label>
        <div className="mt-2">
          <input
            id="project-date"
            name="project-date"
            type="date"
            autoComplete="project-date"
            className="outline-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 px-2"
            onChange={(e) => setFinished_at(e.target.value)}
            value={finished_at}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {t("category")}
        </label>
        <div className="mt-2">
          <select
            id="category"
            name="category"
            autoComplete="category-name"
            onChange={(e) => setCategory_id(e.target.value)}
            value={category_id}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option value={"1"}>{t("apartment")}</option>
            <option value={"2"}>{t("villa")}</option>
            <option value={"3"}>{t("clinic")}</option>
            <option value={"4"}>{t("office")}</option>
            <option value={"5"}>{t("shop")}</option>
            <option value={"6"}>{t("mall")}</option>
          </select>
        </div>
      </div>
      <div className="col-span-full">
        <label
          htmlFor="desc"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {t("descAr")}
        </label>
        <div className="mt-2">
          <textarea
            id="desc"
            name="desc"
            rows={3}
            maxLength={100}
            onChange={(e) => setDescriptionAr(e.target.value)}
            className="outline-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 px-2"
            value={descriptionAr}
          />
        </div>
      </div>
      <div className="col-span-full">
        <label
          htmlFor="desc"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {t("descEn")}
        </label>
        <div className="mt-2">
          <textarea
            id="desc"
            name="desc"
            maxLength={100}
            rows={3}
            onChange={(e) => setDescriptionEn(e.target.value)}
            className="outline-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 px-2"
            value={descriptionEn}
          />
        </div>
      </div>
      <div className="col-span-full mt-3">
        <label
          htmlFor="cover-photo"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {t("attachments")}
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative text-center cursor-pointer rounded-md bg-white font-semibold text-gray-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <p className="mx-10">{t("uploadAImage")}</p>

                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  multiple
                  onChange={(e) => setImages(e.target.files)}
                />
              </label>
            </div>
            <p className="pl-1">{t("examImg")}</p>
            <p className="text-xs leading-5 text-gray-600">PNG, JPG</p>
          </div>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="my-3 rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {t("submitform")}
        </button>
      </div>
    </form>
  );
};

export default AddProjectForm;
