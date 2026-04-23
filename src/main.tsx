import "./styles/global.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app/app";
import { ThemeSync } from "./features/theme/theme-sync";
import { applyStoredTheme } from "./features/theme/theme";

applyStoredTheme();

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
