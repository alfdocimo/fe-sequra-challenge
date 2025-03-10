import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: "src/index.tsx",
      name: "PayInInstalmentsWidget",
      fileName: "pay-in-instalments-widget",
      formats: ["umd"],
    },
    rollupOptions: {
      output: {
        name: "PayInInstalmentsWidget",
        entryFileNames: "pay-in-instalments-widget.js",
      },
    },
  },
  define: {
    "process.env": {},
  },
});
