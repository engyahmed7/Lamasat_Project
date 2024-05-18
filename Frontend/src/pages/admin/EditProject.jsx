import React from "react";
import { useTranslation } from "react-i18next";
import AdminSidebar from "../../components/AdminSidebar";
import EditProjectForm from "../../components/forms/EditProjectForm";
import Navbar from "../../components/Navbar";

const EditProject = () => {
  const { t } = useTranslation();

  return (
    <>
    <Navbar/>
        <div className="overflow-height flex items-start justify-between overflow-hidden">
      <div className="overflow-height w-15 lg:w-1/6 bg-gray-900 text-white p-1 lg:p-5">
        <AdminSidebar />
      </div>
      <div className="overflow-height w-full lg:w-4/5 overflow-y-scroll">
        <h1 className="text-3xl font-bold text-gray-800 py-5">
          {t("Edit Project")}
        </h1>
        <EditProjectForm />
      </div>
    </div>
    </>

  );
};

export default EditProject;
