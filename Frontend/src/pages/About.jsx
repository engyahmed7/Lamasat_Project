
import { useTranslation } from "react-i18next";
import aboutImg from "../imgs/about.webp";
import { FaCircleCheck } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";

const About = () => {
  const {t} = useTranslation();
  return (
    <>
       <Helmet>
        <title>KMD Designs | {t("about")}</title>
        <meta
          name="description"
          content="40+ years experience in interior design and implementation"
        />
      </Helmet>
    <Navbar/>
     <section className="fix-height container m-auto mt-5" style={{backgroundColor: "#EDFBE2"}}>
    <div className="flex flex-wrap p-8">
      <img src={aboutImg} alt="about image" width={450} height={450} />
      <div className="px-5 w-full md:w-2/4">
    <h1 className="text-3xl font-bold text-gray-800 py-3">{t("about")}</h1>

        <p className="text-gray-600 text-xl mb-5">{t("aboutContent")}</p>
        <p className="text-gray-600 text-xl my-5">{t("aboutContentLast")}</p>
        <div>
          <div className="flex items-center"><FaCircleCheck color="#54B435"/> <p className="px-4 text-gray-600">{t("aboutServOne")}</p></div>
          <div className="flex items-center my-2"><FaCircleCheck color="#54B435"/> <p className="px-4 text-gray-600">{t("aboutServTwo")}</p></div>
          <div className="flex items-center"><FaCircleCheck color="#54B435"/> <p className="px-4 text-gray-600">{t("aboutServThree")}</p></div>
        </div>
      </div>
      
    </div>
  </section>
  <Footer/>
    </>
   
  )
}

export default About