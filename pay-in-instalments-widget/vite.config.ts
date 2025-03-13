/// <reference types="vitest/config" />

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
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: path.resolve(__dirname, "src/tests/setup.ts"),
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*",
      "**/e2e/**",
    ],
  },
});
