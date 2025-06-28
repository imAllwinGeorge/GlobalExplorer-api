import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["esm"],
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  dts: false,
  shims: true, // required for __dirname, __filename
  target: "node18",
  bundle: true, // <--- important!
});
