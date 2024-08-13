/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    extends: [
        "plugin:vue/vue3-recommended",
        "eslint:recommended",
    ],
    overrides: [
        {
            files: ["cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}"],
        },
    ],
    plugins: [
        "simple-import-sort"
    ],
    parserOptions: {
        ecmaVersion: "latest",
        "sourceType": "module",
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "quotes": ["error", "double"],
        "indent": ["error", 4],
        "object-curly-spacing": ["error", "always"],
        "semi": 1,
        "no-unused-vars": 1,
        "vue/no-unused-vars": 1,
        "vue/no-unused-components": 1,
        "vue/require-name-property": ["error"],
        "vue/prop-name-casing": ["error", "camelCase"],
        "vue/html-indent": ["error", "tab", {
            "attribute": 1,
            "baseIndent": 1,
        }],
        "simple-import-sort/imports": [
            "error",
            {
                "groups": [
                    ["^vue", "^@?\\w"],
                    // Internal packages.
                    ["^(@|components)(/.*|$)"],
                    // Other relative imports. Put same-folder imports and `.` last.
                    ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                    // Side effect imports.
                    ["^\\u0000"],
                    // Parent imports. Put `..` last.
                    ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                    // Style imports.
                    ["^.+\\.?(css)$"]
                ]
            }
        ],
    }
};
