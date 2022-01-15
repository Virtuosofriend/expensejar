module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/essential",
        "plugin:vue/recommended",
        "eslint:recommended",
        "@vue/prettier",
    ],
    parserOptions: {
        parser: "babel-eslint",
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-unused-vars": 0,
        "vue/no-unused-vars": 0,
        "vue/no-unused-components": 0,
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
    },
};
