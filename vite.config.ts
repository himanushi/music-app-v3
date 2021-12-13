import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      // @ts-ignore
      include: /\.wc\.svelte$/,
      compilerOptions: {
        customElement: true,
      },
    }),
    svelte({
      // @ts-ignore
      exclude: /\.wc\.svelte$/,
      compilerOptions: {
        customElement: false,
      },
    }),
  ],
  resolve: {
    alias: {
      routify: join(__dirname, ".routify"),
      "~": join(__dirname, "src"),
    },
  },
  server: {
    port: 8080,
  },
  optimizeDeps: { exclude: ["@roxi/routify"] },
});
