import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// eslint-config-next 15 ships as an eslintrc-style config, so it is bridged
// into flat config here rather than imported directly.
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  { ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Every <Image> on this site takes its alt from the generated manifest
      // via `{...imgProps(key)}`. The rule can't see an attribute that arrives
      // through a spread, so it reports each one as missing. The alt text is
      // required by the ImageAsset type and verified in the rendered HTML —
      // see src/lib/images.ts.
      "jsx-a11y/alt-text": "off",
    },
  },
];

export default eslintConfig;
