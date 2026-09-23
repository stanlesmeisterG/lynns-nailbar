import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

// As of eslint-config-next 16 these ship as flat config arrays and are imported
// directly. The previous FlatCompat bridge was for the eslintrc-style config in
// 15.x; running it against 16 throws on a circular reference.
const eslintConfig = [
  { ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"] },
  ...coreWebVitals,
  ...typescript,
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
