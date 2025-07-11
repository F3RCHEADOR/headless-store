import { useNavigate } from "react-router-dom";
import { getEntradas } from "../../lib/api";
import Loader from "../utils/Loader";
import { useEffect, useState } from "react";

const HeroBanner = () => {
  const [heroInfo, setHeroInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleRedirectToProducts = () => {
    navigate("/products");
  };

  useEffect(() => {
    const fetchEntrada = async () => {
      const data = await getEntradas("hola-mundo");
      setLoading(false);
      setHeroInfo(data[0] || null);
    };
    fetchEntrada();
  }, []);

  if (!heroInfo) return null;

  return loading ? (
    <Loader />
  ) : (
    <div className="hero bg-base-200 min-h-screen z-40 -mt-4 ">
      <div className="hero-content flex-col items-center lg:flex-row-reverse">
        {heroInfo.featuredImage && (
          <img
            src={heroInfo.featuredImage}
            className="min-w-56 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg shadow-2xl p-2.5 md:p-1"
            alt="Imagen destacada"
          />
        )}
        <div>
          <h1
            className="text-2xl sm:text-4xl md:text-5xl font-bold"
            dangerouslySetInnerHTML={{ __html: heroInfo.title }}
          />
          <div
            className="py-6  text-sm md:text-base"
            dangerouslySetInnerHTML={{ __html: heroInfo.excerpt }}
          />
          <button
            onClick={handleRedirectToProducts}
            className="btn btn-primary flex justify-center mx-auto md:mx-4 rounded"
          >
            Ver productos
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
