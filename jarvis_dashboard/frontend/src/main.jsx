import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DashboardProvider } from "./context/DashboardContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <DashboardProvider>
    <App />
  </DashboardProvider>
);
