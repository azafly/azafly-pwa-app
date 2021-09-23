const path = require('path');
const UnusedWebpackPlugin = require('../');

module.exports = {
    target: 'node',
    entry: path.resolve(__dirname, 'index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    failOnUnused: true,
    plugins: [
        new UnusedWebpackPlugin({
            // Source directories
            directories: [
                path.join(__dirname, 'awesome-module'),
                path.join(__dirname, 'simple-module'),
            ],
            // Exclude patterns
            exclude: ['**/*.test.js'],
            // Root directory (optional)
            root: __dirname,
            failOnUnused: false,
        }),
    ],
};