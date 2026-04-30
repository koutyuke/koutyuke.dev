// oxlint-disable-next-line import/no-unassigned-import -- side-effect global styles
import "./app/styles/global.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app/app";
import { ThemeSync } from "./features/theme";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element #root was not found.");
}

createRoot(root).render(
  <StrictMode>
    <ThemeSync />
    <App />
  </StrictMode>,
);
