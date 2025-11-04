// ESLint konfiguráció
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  // Javasolt szabályok használata a Next.js-hez és a TypeScript-hez
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // 👇 Adja hozzá ezeket a sorokat (lint szabályok kikapcsolása)
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];