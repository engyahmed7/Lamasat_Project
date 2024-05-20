import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import AdminSidebar from "../../components/AdminSidebar";
import Navbar from "../../components/Navbar";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

const Projects = () => {
  const baseUrl =
    process.env.REACT_APP_UIAPI_BASE_URL || "http://127.0.0.1:8000";

  const [projects, setProjects] = useState([]);
  const { t, i18n } = useTranslation();
  const [adminId, setAdminId] = useState("");
  const [userRole, setUserRole] = useState("");

  const getAllProjects = useCallback(async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/projects/all`, {
        headers: {
          access_token: getCookie("access_token"),
        },
      });
      setProjects(data.projects);
      setAdminId(data.admin_id);
      setUserRole(data.user_role);
    } catch (error) {
      toast.error(error.response.data.error);
      deleteCookie("access_token");
      window.location.pathname = "/admin/login";
    }
  }, []);

  useEffect(() => {
    getAllProjects();
  }, [getAllProjects]);

  const deleteHandle = async (id) => {
    try {
      await axios.get(`${baseUrl}/api/v1/projects/delete/${id}`, {
        headers: {
          access_token: getCookie("access_token"),
        },
      });
      // refetch admins after deletion
      getAllProjects();
    } catch (error) {
      toast.error(error.response.data.error);
      deleteCookie("access_token");
      window.location.pathname = "/admin/login";
    }
  };

  const updateHandle = async (id) => {
    console.log(id);
    window.location.pathname = `/admin/edit-project/${id}`;
  };

  return (
    <>
      <Navbar />

      <div className="overflow-height flex items-start justify-between overflow-hidden">
        <div className="overflow-height w-15 lg:w-1/6 bg-gray-900 text-white p-1 lg:p-5">
          <AdminSidebar />
        </div>
        <div className="overflow-height w-full lg:w-4/5 overflow-y-scroll">
          <h1 className="text-3xl font-bold text-gray-800 py-5">
            {t("projects")}
          </h1>

          <div className="flex flex-col">
            {projects.map((project) => (
              <div
                className="p-5 rounded-lg my-1 shadow-lg border-2 border-gray-400 hover:bg-slate-200 w-full"
                key={project?.id}
              >
                <div className="flex flex-wrap items-center justify-between">
                  <div>
                    <p className="my-2 text-xl text-gray-700 p-1 line-clamp-1">
                      {t("title")}:{" "}
                      {i18n.language === "en"
                        ? project?.title?.en
                        : project?.title?.ar}
                    </p>
                    <div>
                      {(adminId === project.admin_id ||
                        userRole === "super_admin") && (
                        <button
                          type="button"
                          onClick={() => deleteHandle(project?.id)}
                          className="rounded-md mt-4 bg-red-600 px-3 my-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          <MdDelete />
                        </button>
                      )}
                      {adminId === project.admin_id && (
                        <button
                          type="button"
                          onClick={() => updateHandle(project?.id)}
                          className="rounded-md m-4 bg-blue-600 px-3 my-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          <FaEdit />
                        </button>
                      )}
                    </div>
                  </div>
                  <a href={`${baseUrl}${project?.images[0]?.photo}`}>
                    <img
                      src={`${baseUrl}${project?.images[0]?.photo}`}
                      alt="image_project"
                      width={300}
                      height={400}
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
