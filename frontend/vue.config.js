const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            '^/api/': {
                target: 'http://backend:3000',
                secure: false,
                pathRewrite: {
                    '/api/*': '/',
                },
            },
        },
    },
});
