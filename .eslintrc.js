module.exports = {
    parser: "@typescript-eslint/parser", 
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    extends: [
        "plugin:prettier/recommended", 
        "plugin:@typescript-eslint/recommended", 
        "prettier/@typescript-eslint"
    ],
    plugins: ["@typescript-eslint"],
    env: {
        node: true,
        es6: true, 
    },
    rules: {
        "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], 
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "no-console": "warn", 
    }
};
