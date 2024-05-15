import React from "react";

import imageGetOffer from "../imgs/getofferr.jpeg";
import GetOfferForm from "../components/forms/GetOfferForm";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";

const GetOffer = () => {
  const {t} = useTranslation();
  return (
    <>
      <Helmet>
        <title>KMD Designs | {t("getOffer")}</title>
        <meta
          name="description"
          content="Welcome to the get offer page KMD Designs"
        />
      </Helmet>
      <Navbar />
      <section className="fix-height container m-auto">
        <div
          className="flex items-center justify-center flex-wrap  py-20"
          style={{
            backgroundImage: `url(${imageGetOffer})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
        <GetOfferForm />
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default GetOffer;
