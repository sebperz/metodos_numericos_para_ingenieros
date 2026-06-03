import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import githubDarkHighContrast from "@shikijs/themes/github-dark-high-contrast";

export default defineConfig({
  site: "https://sebperz.github.io",
  base: "metodos_numericos_para_ingenieros",
  integrations: [react()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: githubDarkHighContrast,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["pyodide"],
    },
  },
});
