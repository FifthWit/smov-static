module.exports = {
    extends: ["eslint:recommended"],
    plugins: ["@typescript-eslint", "import", "prettier"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
    rules: {
        "no-console": "off",
        "no-unused-vars": "off",
        "no-undef": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "import/no-unresolved": "off",
        "prettier/prettier": ["warn"],
    },
};