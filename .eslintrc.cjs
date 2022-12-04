/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

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
        "no-unused-vars": 0,
        "vue/no-unused-vars": 0,
        "vue/html-indent": "off",
        "vue/max-attributes-per-line": "off",
        "vue/require-prop-types": ["warn"],
        "vue/require-prop-type-constructor": ["error"],
        "vue/require-name-property": ["error"],
        "vue/component-definition-name-casing": ["error", "PascalCase"],
        "vue/prop-name-casing": ["error", "camelCase"],
        "vue/component-name-in-template-casing": ["error", "kebab-case"],
        "vue/html-self-closing": [
            "warn",
            {
                html: {
                    void: "any",
                    normal: "never",
                    component: "never",
                },
                svg: "always",
                math: "always",
            },
        ],
    }
};
