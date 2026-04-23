/// <reference types="vite/client" />

declare module "the-new-css-reset/css/reset.css";
declare module "*.svg?raw" {
  const source: string;
  export default source;
}
