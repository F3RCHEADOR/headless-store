
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { MyStoreProvider } from "./lib/MyStoreContext.jsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <MyStoreProvider>
      <App />
    </MyStoreProvider>
  </HelmetProvider>
);
