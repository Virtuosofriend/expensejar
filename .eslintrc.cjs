/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    extends: [
        "plugin:vue/vue3-recommended",
        "eslint:recommended",
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    overrides: [
        {
            files: ["cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}"],
        },
    ],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "quotes": ["error", "double"],
        "indent": ["error", 4],
        "object-curly-spacing": ["error", "always"],
        "no-unused-vars": 1,
        "vue/no-unused-vars": 1,
        "vue/no-unused-components": 1,
        "vue/require-name-property": ["error"],
        "vue/prop-name-casing": ["error", "camelCase"],
        "vue/html-indent": ["error", "tab", {
            "attribute": 1,
            "baseIndent": 1,
        }]
    }
};
