import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import fjGallery from "flickr-justified-gallery";
import lgShare from "lightgallery/plugins/share";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const SingleProject = () => {
  const baseUrl =
    process.env.REACT_APP_UIAPI_BASE_URL || "http://127.0.0.1:8000";

  const { id } = useParams();
  const { i18n } = useTranslation();

  const [project, setProject] = useState(null);
  const getProject = async () => {
    const { data } = await axios.get(`${baseUrl}/api/v1/projects/show/${id}`);
    setProject(data.project);
  };

  useEffect(() => {
    getProject();
    fjGallery(document.querySelectorAll(".gallery"), {
      rowHeight: 250,
      lastRow: "start",
      gutter: 5,
      rowHeightTolerance: 0.1,
      calculateItemsHeight: true,
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>{`KMD Designs | ${
          i18n.language === "en" ? project?.title?.en : project?.title?.ar
        }`}</title>
        <meta
          name="description"
          content={`Welcome to the ${project?.title?.en} project page KMD Designs`}
        />
      </Helmet>
      <nav className=" fixed top-10 right-20 z-50 bg-white">
        <a href={"/"}>
          <FaChevronRight
            className="bg-white  text-black rounded-full"
            style={{ float: "right" }}
          />
        </a>
      </nav>

      {/* Project */}
      <section className="mt-10">
        <h3 className="text-xl font-bold text-gray-800 px-5 py-2">
          {i18n.language === "en" ? project?.title?.en : project?.title?.ar}
        </h3>
        <p className="px-5 text-gray-600 text-sm mb-11 break-words ">
          {i18n.language === "en"
            ? project?.description?.en
            : project?.description?.ar}
        </p>
        <LightGallery
          plugins={[lgShare, lgThumbnail]}
          mode="lg-fade"
          pager={true}
          thumbnail={true}
          galleryId={"Static thumbnails"}
          elementClassNames={"gallery"}
          mobileSettings={{
            controls: false,
            showCloseIcon: false,
            download: true,
            rotate: false,
          }}
        >
          {project?.images?.map((image) => (
            <a
              key={image.id}
              data-pinterest-text={`${baseUrl}${image.photo}`}
              data-facebook-share-url={`${baseUrl}${image.photo}`}
              data-tweet-text={`${baseUrl}${image.photo}`}
              data-src={`${baseUrl}${image.photo}`}
            >
              <img
                className="img-responsive"
                src={`${baseUrl}${image.photo}`}
              />
            </a>
          ))}
        </LightGallery>
      </section>
    </>
  );
};

export default SingleProject;
