import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <article
      className=" rounded-lg shadow-sm  shadow-primary overflow-hidden hover:shadow-lg transition-all duration-300 max-w-sm"
    >
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="1/4 h-full object-cover hover:scale-105 transition-transform duration-300 mx-auto"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Categories */}
        {post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.slice(0, 3).map((category, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium border text-secondary rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold text-secondary mb-3 line-clamp-2">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-base-content mb-4 line-clamp-3">
          {stripHtml(post.excerpt)}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-secondary mb-4">
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            {post.author}
          </span>
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            {formatDate(post.date)}
          </span>
        </div>

        {/* Read More Button */}
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center text-primary hover:text-accent font-medium transition-colors duration-200"
        >
          Leer más
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
