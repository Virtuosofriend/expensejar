module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/essential",
        "plugin:vue/strongly-recommended",
        "plugin:vue/recommended",
    ],
    settings: {
        "prettier-vue": {
            SFCBlocks: {
                template: false,
            },
            usePrettierrc: true,
        },
    },
    parserOptions: {
        parser: "babel-eslint",
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-unused-vars": 0,
        "vue/no-unused-vars": 0,
        "vue/no-unused-components": 0,
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
        "vue/order-in-components": [
            "error",
            {
                order: [
                    "el",
                    "name",
                    "parent",
                    "functional",
                    ["delimiters", "comments"],
                    "extends",
                    "mixins",
                    "inheritAttrs",
                    "model",
                    ["props", "propsData"],
                    ["components", "directives", "filters"],
                    "data",
                    "computed",
                    "methods",
                    "watch",
                    "LIFECYCLE_HOOKS",
                    ["template", "render"],
                    "renderError",
                ],
            },
        ],
        "vue/attributes-order": [
            "error",
            {
                order: [
                    "DEFINITION",
                    "LIST_RENDERING",
                    "CONDITIONALS",
                    "RENDER_MODIFIERS",
                    "GLOBAL",
                    ["UNIQUE", "SLOT"],
                    "TWO_WAY_BINDING",
                    "OTHER_DIRECTIVES",
                    "OTHER_ATTR",
                    "EVENTS",
                    "CONTENT",
                ],
                alphabetical: false,
            },
        ],
        "vue/max-attributes-per-line": "off",
        "vue/require-prop-types": ["warn"],
        "vue/require-prop-type-constructor": ["error"],
        "vue/require-name-property": ["error"],
        "vue/component-definition-name-casing": ["error", "PascalCase"],
        "vue/prop-name-casing": ["error", "camelCase"],
        "vue/component-name-in-template-casing": ["error", "kebab-case"],
        "vue/html-indent": "off",
    },
};
