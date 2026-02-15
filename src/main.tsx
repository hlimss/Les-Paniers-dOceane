import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./global-fix.css";
import "./index.css";
import "./force-white.css";

createRoot(document.getElementById("root")!).render(<App />);
