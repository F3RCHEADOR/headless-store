
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { MyStoreProvider } from "./lib/MyStoreContext.jsx";

createRoot(document.getElementById("root")).render(

<MyStoreProvider><App /></MyStoreProvider>
);
