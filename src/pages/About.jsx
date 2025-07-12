// src/pages/About.jsx

export default function About() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100 px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-primary mb-4 drop-shadow-lg">
          About <span className="text-secondary">Headless Store</span>
        </h1>
        <p className="text-center text-lg text-base-content/70 mb-12 max-w-2xl mx-auto">
          The future of eCommerce: fast, flexible, and beautiful. Discover how we blend cutting-edge technology with stunning design.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Imagen destacada con animación */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-secondary/30 hover:scale-105 transition-transform duration-300 bg-white/70">
            <img
              src="https://cdn-icons-png.flaticon.com/512/10220/10220186.png"
              alt="About Headless Store"
              className="w-full object-contain p-8"
            />
          </div>

          {/* Texto descriptivo */}
          <div className="space-y-7">
            <p className="text-xl text-base-content leading-relaxed">
              <strong className="text-primary">Headless Store</strong> is a modern eCommerce solution built with <span className="font-semibold text-secondary">React</span> and powered by <span className="font-semibold text-secondary">WordPress & WooCommerce</span>.
            </p>
            <p className="text-base-content/80 leading-relaxed">
              By decoupling the frontend from the backend, we deliver a seamless, high-performance shopping experience that adapts perfectly to any device.
            </p>
            <ul className="list-disc pl-6 text-base-content/80 space-y-2">
              <li>⚡ Ultra-fast, responsive interface</li>
              <li>🎨 Clean, modern, and accessible design</li>
              <li>🔒 Secure and scalable architecture</li>
              <li>🛒 Effortless shopping and checkout</li>
            </ul>
          </div>
        </div>

        {/* Valores o misión */}
        <div className="bg-base-200 rounded-2xl shadow-lg p-8 mb-16 flex flex-col md:flex-row gap-8 justify-between items-center">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-primary mb-2">Our Mission</h2>
            <p className="text-base-content/80">
              To empower businesses and delight customers by providing a headless eCommerce platform that is both powerful and easy to use.
            </p>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-primary mb-2">Our Values</h2>
            <ul className="list-disc pl-6 text-base-content/80 space-y-1">
              <li>Innovation</li>
              <li>User Experience</li>
              <li>Performance</li>
              <li>Transparency</li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <a
            href="/products"
            className="inline-block px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-secondary transition-colors text-lg"
          >
            Explore Our Products
          </a>
        </div>
      </div>
    </section>
  );
}
