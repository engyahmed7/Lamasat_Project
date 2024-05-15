
import { FaWhatsappSquare, FaFacebookMessenger } from "react-icons/fa";
import { FcCallback } from "react-icons/fc";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import {
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";
import { TbBuildingHospital } from "react-icons/tb";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";
import { BsFillBuildingsFill } from "react-icons/bs";
import { IoCall } from "react-icons/io5";



const Home = () => {
    const {t, i18n} = useTranslation();
    const [category, setCategory] = useState("");
    const [projects, setProjects] = useState([]);
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
  
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  
    const getAllProjects = async () => {
      console.log(process.env.REACT_APP_UIAPI_BASE_URL);
      const baseUrl = process.env.REACT_APP_UIAPI_BASE_URL || 'https://api.lamasat.cloud';
      const { data } = await axios.get(
        `${baseUrl}/api/v1/projects/all`
      );
      if (category == "") {
        setProjects(data.projects);
      } else {
        const filter = data.projects.filter((project) =>
          project.category.name.includes(category.toLowerCase())
        );
  
        setProjects(filter);
      }
    };
    useEffect(() => {
      getAllProjects();
    }, [category]);
  return (
    <>
    <Helmet>
      <title>KMD Designs | {t("home")}</title>
      <meta name="description" content="Home page KMD Designs" />
    </Helmet>
    <Navbar/>
    
     <div className="fix-height container my-7 mx-auto">

<>
      <div className="flex items-center justify-center gap-5 flex-wrap mb-7">
        <div
          className={`text-xs flex text-gray-500 flex-col items-center cursor-pointer ease-in ${
            category == "" && "text-gray-900"
          }`}
          onClick={() => setCategory("")}
        >
          <BsFillBuildingsFill className="h-6 w-6 text-gray" />
          {t("all")}
        </div>
        <div
          className={`text-xs flex flex-col items-center text-gray-500 cursor-pointer ease-in ${
            category == "apartment" && "text-gray-900"
          }`}
          onClick={() => setCategory("apartment")}
        >
          <BuildingOffice2Icon className="h-6 w-6 text-gray" />
          {t("apartment")}
        </div>
        <div
          className={`text-xs flex flex-col items-center text-gray-500 cursor-pointer ease-in ${
            category == "villa" && "text-gray-900"
          }`}
          onClick={() => setCategory("villa")}
        >
          <HomeModernIcon className="h-6 w-6 text-gray" />
          {t("villa")}
        </div>
        <div
          className={`text-xs flex flex-col items-center text-gray-500 cursor-pointer ease-in ${
            category == "clinic" && "text-gray-900"
          }`}
          onClick={() => setCategory("clinic")}
        >
          <TbBuildingHospital className="h-6 w-6 text-gray" />
          {t("clinic")}
        </div>
        <div
          className={`text-xs flex flex-col items-center text-gray-500 cursor-pointer ease-in ${
            category == "office" && "text-gray-900"
          }`}
          onClick={() => setCategory("office")}
        >
          <BuildingOfficeIcon className="h-6 w-6 text-gray" />
          {t("office")}
        </div>
        <div
          className={`text-xs flex flex-col items-center text-gray-500 cursor-pointer ease-in ${
            category == "shop" && "text-gray-900"
          }`}
          onClick={() => setCategory("shop")}
        >
          <BuildingStorefrontIcon className="h-6 w-6 text-gray" />
          {t("shop")}
        </div>
        <div
          className={`text-xs flex flex-col items-center text-gray-500 cursor-pointer ease-in ${
            category == "mall" && "text-gray-900"
          }`}
          onClick={() => setCategory("mall")}
        >
          <BuildingLibraryIcon className="h-6 w-6 text-gray" />
          {t("mall")}
        </div>
      </div>


      <div className="text-xs flex items-center justify-center flex-wrap">
        {projects.map((project) => (
          <div
            className=" rounded-md mb-6 mx-3 border-2 w-full md:w-2/5 lg:w-1/4"
            key={project.id}
          >
            <Slider {...settings}>
              {project?.images?.map((image, i) => (
                <img
                  src={`https://api.lamasat.cloud${image.photo}`}
                  key={i}
                  className="img-responsive rounded-t-md h-60 "
                  alt={`image ${project.title}`}
                />
              ))}
            </Slider>
            <div className="p-2">
              <Link to={`/project/${project.id}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-bold text-gray-900 line-clamp-1">
                    {i18n.language === "en"
                      ? project?.title?.en
                      : project?.title?.ar}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {project.finished_at}
                  </p>
                </div>

                <p className="text-md text-gray-700 my-1 line-clamp-2">
                  {i18n.language === "en"
                    ? project?.description?.en
                    : project?.description?.ar}
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>

    {/* <Project locale={locale}/> */}
    <div className={`social-buttons  active`}>
      <a href="https://www.facebook.com/messages/t/248682048332912">
        <FaFacebookMessenger color="blue" className="text-4xl" />
      </a>
      <a href="tel:+201227595125">
        <IoCall className="p-2 rounded-full bg-green-700 text-white my-5 text-4xl" />
      </a>
      <a href="https://wa.me/+31629341071">
        <FaWhatsappSquare color="green" className="text-4xl" />
      </a>
    </div>
  </div>
  <Footer/>
    </>
   
  )
}

export default Home