const dts = require("rollup-plugin-dts").default;
const scss = require("rollup-plugin-scss");
const terser = require('@rollup/plugin-terser');
const postcss = require("rollup-plugin-postcss");
const commonjs = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve");
const typescript = require("@rollup/plugin-typescript");

const packageJson = require("./package.json");

module.exports = [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      scss({ sourceMap: true }),
      postcss(),
      terser(),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];