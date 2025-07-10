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
    <div className="hero bg-base-200 min-h-screen z-40 -mt-4 overflow-auto">
      <div className="hero-content flex-col items-center lg:flex-row-reverse">
        {heroInfo.featuredImage && (
          <img
            src={heroInfo.featuredImage}
            className="min-w-56 md:max-w-lg rounded-lg shadow-2xl"
            alt="Imagen destacada"
          />
        )}
        <div>
          <h1
            className="text-5xl font-bold"
            dangerouslySetInnerHTML={{ __html: heroInfo.title }}
          />
          <div
            className="py-6"
            dangerouslySetInnerHTML={{ __html: heroInfo.excerpt }}
          />
          <button
            onClick={handleRedirectToProducts}
            className="btn btn-primary flex justify-center mx-auto md:mx-4"
          >
            Ver productos
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
