import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import AdminSidebar from "../../components/AdminSidebar";
import Navbar from "../../components/Navbar";
import { MdDelete } from "react-icons/md";
import { deleteCookie, getCookie } from "cookies-next";

import axios from "axios";
import { toast } from "react-toastify";

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const { t } = useTranslation();

  const deleteHandle = async (id) => {
    try {
      await axios.get(`http://127.0.0.1:8000/api/v1/deleteAdmin/${id}`, {
        headers: {
          access_token: getCookie("access_token"),
        },
      });
      fetchDataAdmins(); // Refetch admins after deletion
    } catch (error) {
      toast.error(error.response.data.error);
      deleteCookie("access_token");
      window.location.pathname = "/admin/login";
    }
  };

  const toggleStatusHandle = async (id) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/toggleStatus/${id}`,
        {},
        {
          headers: {
            access_token: getCookie("access_token"),
          },
        }
      );
      toast.success(response.data.message);
      fetchDataAdmins(); // Refetch admins after status toggle
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  const fetchDataAdmins = useCallback(async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/v1/admins", {
        headers: {
          access_token: getCookie("access_token"),
        },
      });
      setAdmins(data);
    } catch (error) {
      toast.error(error.response.data.error);
      deleteCookie("access_token");
      window.location.pathname = "/admin/login";
    }
  }, []);

  useEffect(() => {
    fetchDataAdmins();
  }, [fetchDataAdmins]);

  return (
    <>
      <Navbar />
      <div className="overflow-height flex items-start justify-between overflow-hidden">
        <div className="overflow-height w-15 lg:w-1/6 bg-gray-900 text-white p-1 lg:p-5">
          <AdminSidebar />
        </div>
        <div className="overflow-height w-full lg:w-4/5 overflow-y-scroll">
          <h1 className="text-3xl font-bold text-gray-800 py-5">
            {t("admins")}
          </h1>
          <div className="flex flex-col">
            {admins?.admins?.map((admin) => (
              <div
                className="p-5 rounded-lg my-1 shadow-lg border-2 border-gray-400 hover:bg-slate-200 w-full"
                key={admin?.id}
              >
                <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                  {admin?.email}
                </h3>
                <div className="flex flex-wrap items-center justify-between">
                  <div>
                    <p className="my-2 text-xl text-gray-700 p-1 line-clamp-1">
                      {t("name")}: {admin?.name}
                    </p>
                    <p className="my-2 text-xl text-gray-700 p-1 line-clamp-1">
                      {t("status")}: {admin?.status ? "Active" : "Inactive"}
                    </p>
                    <button
                      type="button"
                      onClick={() => toggleStatusHandle(admin?.id)}
                      className={`rounded-md mt-4 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                        admin?.status
                          ? "bg-red-600 hover:bg-red-800"
                          : "bg-green-600 hover:bg-green-800"
                      }`}
                    >
                      {admin?.status ? "Deactivate" : "Activate"}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteHandle(admin?.id)}
                      className="rounded-md mt-4 ml-2 bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admins;
