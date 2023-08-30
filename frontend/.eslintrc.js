module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/essential', 'eslint:recommended'],
    parserOptions: {
        parser: 'babel-eslint',
    },
    // Rules and settings specific to your frontend code
    rules: {
        'vue/valid-template-root': 'error',
        'vue/no-unused-vars': 'error',
        // ... (frontend-specific rules)
    },
};
