import { build } from "esbuild";
import fs from "fs";

await build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  outfile: "dist/SheetCollection.js",
  format: "iife",
  target: "es2019",
  globalName: "SheetCollection"
});

fs.copyFileSync(
  "appsscript.json",
  "dist/appsscript.json"
);

console.log("Build concluído com sucesso para dist/!");