import { useNavigate } from "react-router-dom";
import { getEntradas, getPostBySlug } from "../../lib/api";
import Loader from "../utils/Loader";
import { useEffect, useState } from "react";
import BlogCard from "../blogs/BlogCards";

const HeroBanner = () => {
  const [heroInfo, setHeroInfo] = useState({});
  const [latestBlog, setLatestBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleRedirectToProducts = () => {
    navigate("/products");
  };

  const handleRedirectToBlogs = () => {
    navigate("/blogs");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener la entrada del hero
        const heroData = await getEntradas("hola-mundo");
        setHeroInfo(heroData[0] || null);

        // Obtener el blog específico con información completa
        const blogData = await getPostBySlug("bienvenidos-a-headless-store");
        setLatestBlog(blogData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!heroInfo) return null;

  return loading ? (
    <Loader />
  ) : (
    <div className="hero bg-transparent min-h-screen z-60 -mt-4 flex flex-col mb-24">
      {/* Primera sección - Hero principal */}
      <div className="mt-24 mb-36 lg:mb-0">
        <div className="hero-content flex-col items-center lg:flex-row-reverse gap-8">
          {heroInfo.featuredImage && (
            <div className="relative group">
              <img
                src={heroInfo.featuredImage}
                className="min-w-56 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl shadow-2xl p-2.5 md:p-1 transition-transform duration-300 group-hover:scale-105"
                alt="Imagen destacada"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          )}
          <div className="text-center lg:text-left max-w-2xl">
            <div className="badge badge-primary mb-4">¡Bienvenido!</div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              dangerouslySetInnerHTML={{ __html: heroInfo.title }}
            />
            <div
              className="py-6 text-sm md:text-base text-base-content/80 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: heroInfo.excerpt }}
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={handleRedirectToProducts}
                className="btn btn-primary btn-lg rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Ver productos
              </button>
              <button
                onClick={handleRedirectToBlogs}
                className="btn btn-outline btn-lg rounded-full px-8 hover:btn-secondary transition-all duration-300"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                Leer blog
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Segunda sección - Último blog */}
      <div className="hero bg-transparent min-h-screen z-80 md:-mt-24">
        <div className="hero-content flex-col items-center lg:flex-row-reverse gap-x-16 gap-y-8">
          <div className="text-center lg:text-left max-w-2xl">
            <div className="badge badge-secondary mb-4">Último artículo</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
              Descubre nuestro contenido más reciente
            </h2>
            <p className="text-base-content/70 text-lg mb-8 leading-relaxed">
              Mantente actualizado con las últimas noticias, consejos y
              tendencias de nuestro blog.
            </p>
            <button
              onClick={handleRedirectToBlogs}
              className="btn btn-secondary btn-lg rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              Ver todos los blogs
            </button>
          </div>

          {/* BlogCard del último blog */}
          <div className="w-full max-w-md lg:max-w-lg">
            {latestBlog ? (
              <div className="transform hover:scale-105 transition-transform duration-300">
                <BlogCard post={latestBlog} />
              </div>
            ) : (
              <div className="card bg-base-200 shadow-xl p-8 text-center">
                <div className="card-body">
                  <svg
                    className="w-16 h-16 mx-auto text-base-content/30 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2">
                    No hay blogs disponibles
                  </h3>
                  <p className="text-base-content/60">
                    Pronto tendremos contenido interesante para ti.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
