import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// Retain Tailwind 3 and the existing theme through Vite's PostCSS pipeline.
export default {
  plugins: [tailwindcss("./tailwind.config.mjs"), autoprefixer()],
};
