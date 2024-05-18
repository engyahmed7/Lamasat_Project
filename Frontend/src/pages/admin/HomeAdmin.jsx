import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdminSidebar from '../../components/AdminSidebar';
import Navbar from '../../components/Navbar';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';
import { toast } from 'react-toastify';

const HomeAdmin = () => {
  const [offers, setOffers] = useState([]);
  const { t } = useTranslation();

  const deleteHandle = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/v1/offers/delete/${id}`, {
      headers: {
        access_token: getCookie('access_token'),
      },
    });
  };
  useEffect(() => {
    const fetchDataOffers = async () => {
      try {
        const { data } = await axios.get(
          'http://127.0.0.1:8000/api/v1/offers/all',
          {
            headers: {
              access_token: getCookie('access_token'),
            },
          }
        );
        console.log('data: ', data);
        setOffers(data);
      } catch (error) {
        toast.error(error.response.data.error);
        deleteCookie('access_token');
        window.location.pathname = '/admin/login';
      }
    };
    fetchDataOffers();
  }, [offers]);

  return (
    <>
      <Navbar />

      <div className="overflow-height flex items-start justify-between overflow-hidden">
        <div className="overflow-height w-15 lg:w-1/6 bg-gray-900 text-white p-1 lg:p-5">
          <AdminSidebar />
        </div>
        <div className="overflow-height w-full lg:w-4/5 overflow-y-scroll">
          <h1 className="text-3xl font-bold text-gray-800 py-5">
            {t('offers')}
          </h1>

          <div className="flex flex-col">
            {offers?.offers?.map((offer) => (
              <div
                className="p-5 rounded-lg my-1 shadow-lg border-2 border-gray-400 hover:bg-slate-200 w-full"
                key={offer?.id}>
                <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                  {offer?.email}
                </h3>
                <div className="flex flex-wrap items-center justify-between">
                  <div>
                    <p className="my-2 text-xl text-gray-700 p-1 line-clamp-1">
                      {t('location')}: {offer?.location}
                    </p>
                    <p className="my-2 text-xl text-gray-700 p-1 line-clamp-1">
                      {t('phone')}: {offer?.phone_number}
                    </p>
                    <p className="my-2 text-xl text-gray-700 p-1 line-clamp-1">
                      {t('unitType')}: {offer?.unit_type}
                    </p>
                    <p className="my-2 text-xl text-gray-700 p-1 line-clamp-1">
                      {t('unitArea')}: {offer?.unit_area}
                    </p>
                    <p className="my-2 text-xl text-gray-700 p-1 line-clamp-1">
                      {t('budget')}: {offer?.budget}
                    </p>
                    <button
                      type="button"
                      onClick={() => deleteHandle(offer?.id)}
                      className="rounded-md mt-4 bg-red-600 px-3 my-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      <MdDelete />
                    </button>
                  </div>
                  <a href={`https://api.lamasat.cloud/${offer?.attachment}`}>
                    <img
                      src={`https://api.lamasat.cloud/${offer?.attachment}`}
                      alt="image_offer"
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

export default HomeAdmin;
