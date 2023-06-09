module.exports = {
  extends: ["next", "turbo", "prettier", "plugin:json/recommended"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "turbo/no-undeclared-env-vars": "off",
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
