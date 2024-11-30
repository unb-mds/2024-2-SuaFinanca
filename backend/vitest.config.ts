import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  test: {
    globals: false,
    environment: "node",
    include: ["**/*.spec.ts"],
    exclude: ["node_modules", "dist", "coverage"],
    coverage: {
      exclude: ["node_modules", "dist"],
    },
  },
});
