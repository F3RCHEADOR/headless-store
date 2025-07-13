import { useState, useEffect, useRef } from "react";

const themes = [
  "light", "dark","abyss", "acid", "aqua", "autumn", "black", "bumblebee", "business", "caramellatte", "coffee", "corporate", "cmyk", "cupcake", "cyberpunk", "dim", "dracula", "emerald", "fantasy", "forest", "garden", "halloween", "lemonade", "lofi", "luxury", "night", "nord", "pastel", "retro", "silk", "sunset", "synthwave", "valentine", "winter", "wireframe"
];

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Cierra el menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        className="btn m-1 flex items-center bg-primary text-secondary-content"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Seleccionar tema"
      >
        <span className="capitalize">{theme}</span>
        <svg width="12" height="12" className="inline-block h-2 w-2 fill-current opacity-60" viewBox="0 0 2048 2048">
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </button>
      {open && (
        <ul
          className="absolute right-0 mt-2 max-h-56 w-52 overflow-auto rounded-box bg-base-300 p-2 shadow-2xl z-50"
          role="listbox"
        >
          {themes.map((t) => (
            <li key={t}>
              <button
                className={` btn btn-sm btn-block btn-ghost justify-start capitalize text-left ${theme === t ? "bg-primary text-primary-content" : ""}`}
                aria-label={t}
                aria-selected={theme === t}
                onClick={() => {
                  setTheme(t);
                  setOpen(false);
                }}
                role="option"
              >
                {theme === t && (
                  <span className="mr-2">✔</span>
                )}
                {t}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
