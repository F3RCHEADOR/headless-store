import { useEffect, useState } from "react";
import { getAllPosts } from "../lib/api.ts";
import Loader from "../components/utils/Loader.jsx";
import { Link } from "react-router-dom";
import BlogCard from "../components/blogs/BlogCards.jsx";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoader(true);
      try {
        const data = await getAllPosts(currentPage, 9);
        if (data.length === 0) {
          setHasMore(false);
        } else {
          setPosts(prev => currentPage === 1 ? data : [...prev, ...data]);
          // Si obtenemos menos posts de los solicitados, no hay más páginas
          if (data.length < 9) {
            setHasMore(false);
          }
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setHasMore(false);
      }
      setLoader(false);
    };
    fetchPosts();
  }, [currentPage]);

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  if (loader && currentPage === 1) {
    return <Loader />;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestro Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre las últimas noticias, consejos y novedades sobre nuestros productos y el mundo del comercio electrónico.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
    

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              disabled={loader}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loader ? "Cargando..." : "Cargar más posts"}
            </button>
          </div>
        )}

        {/* No More Posts */}
        {!hasMore && posts.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-500">No hay más posts para mostrar</p>
          </div>
        )}

        {/* No Posts */}
        {!loader && posts.length === 0 && (
          <div className="text-center mt-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay posts disponibles</h3>
            <p className="text-gray-500">Pronto tendremos contenido interesante para ti.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;