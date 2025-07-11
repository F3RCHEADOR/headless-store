// src/pages/About.jsx

export default function About() {
  return (
    <section className="min-h-screen bg-base-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-primary mb-10">
          About <span className="text-secondary">Headless Store</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Imagen destacada */}
          <div className="rounded-xl overflow-hidden shadow-xl">
            <img
              src="https://cdn-icons-png.flaticon.com/512/10220/10220186.png"
              alt="About Headless Store"
              className="w-3/4  object-cover"
            />
          </div>

          {/* Texto descriptivo */}
          <div className="space-y-6">
            <p className="text-base-content leading-relaxed">
              <strong>Headless Store</strong> is a modern eCommerce solution built with React and powered by WordPress and WooCommerce. By separating the frontend from the backend, we create a seamless, high-performance shopping experience that adapts perfectly to any device.
            </p>

            <p className="text-base-content leading-relaxed">
              Our goal is to provide users with a fast, responsive, and visually appealing interface while taking full advantage of WordPress's flexibility. We focus on usability, clean design, and smooth interactions that make shopping simple and enjoyable.
            </p>

            <p className="text-base-content leading-relaxed">
              Whether you are browsing products, adding to cart, or checking out, everything works flawlessly thanks to our headless architecture. We believe in blending powerful backend technology with beautiful frontend experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
