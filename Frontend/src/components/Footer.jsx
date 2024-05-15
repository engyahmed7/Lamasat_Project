import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const {t} = useTranslation()
  return (
    <div
      style={{ height: "50px" }}
      className="flex border-t-2 items-center justify-center text-gray-500 text-sm"
    >
      {t("copyRight")}
      <span className="font-bold text-gray-800 px-1">KMD</span>
    </div>
  );
};

export default Footer;
