import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // 禁用 React 中未转义引号的警告
      "react/no-unescaped-entities": "off",
      // 禁用引号规则检查
      "quotes": "off",
    }
  }
];

export default eslintConfig;
