import { CgMenuGridR } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";

import { GoProjectRoadmap } from "react-icons/go";
import { GrProjects } from "react-icons/gr";
import { AiOutlineUserAdd } from "react-icons/ai";
import { ImExit } from "react-icons/im";
import { deleteCookie, getCookie } from "cookies-next";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const { t } = useTranslation();

  const logout = async () => {
    deleteCookie("access_token");
    window.location.pathname = "/admin/login";
  };

  return (
    <>
      <Link
        to="/admin"
        className="flex items-center text-lg lg:text-2xl font-semibold"
      >
        <CgMenuGridR className="text-3xl me-1" />
        <span className="hidden lg:block">{t("dashboard")}</span>
      </Link>
      <ul className="mt-10 flex items-center justify-center flex-col lg:items-start">
        <Link
          className="flex items-center text-lg mb-5 hover:border-yellow-200 hover:text-yellow-200 transition"
          to="/admin/projects"
        >
          <GrProjects className="me-1" />
          <span className="hidden lg:block">{t("projects")}</span>
        </Link>
        {getCookie("super_admin") == "true" && (
          <Link
            className="flex items-center text-lg mb-5 hover:border-yellow-200 hover:text-yellow-200 transition"
            to="/admin/admins"
          >
            <FaUsers className="me-1" />
            <span className="hidden lg:block">{t("admins")}</span>
          </Link>
        )}

        {getCookie("super_admin") == "true" && (
          <Link
            className="flex items-center text-lg mb-5 hover:border-yellow-200 hover:text-yellow-200 transition"
            to="/admin/add-admin"
          >
            <AiOutlineUserAdd className="me-1" />
            <span className="hidden lg:block">{t("addAdmin")}</span>
          </Link>
        )}

        <Link
          className="flex items-center text-lg mb-5 hover:border-yellow-200 hover:text-yellow-200 transition"
          to="/admin/add-project"
        >
          <GoProjectRoadmap className="me-1" />
          <span className="hidden lg:block">{t("addProject")}</span>
        </Link>
        <button
          className="flex items-center text-lg mb-5 text-red-600 hover:border-yellow-200 hover:text-yellow-200 transition"
          onClick={logout}
        >
          <ImExit className="me-1" />
          <span className="hidden lg:block">{t("exit")}</span>
        </button>
      </ul>
    </>
  );
};

export default AdminSidebar;
