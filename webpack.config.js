const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // Entry point where the bundling starts
    entry: './app/index.js',

    output: {
        // Output directory for bundled files
        path: path.resolve(__dirname, 'dist'),
        // Name of the bundled file
        filename: 'bundle.js',
        clean: true, // Automatically clears previous build files in 'dist'
    },

    module: {
        rules: [
            {
                // Use Babel to transpile .js and .jsx files
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/, // Exclude 'node_modules' folder from Babel processing
                use: ['babel-loader'],
            },
            {
                // Process CSS files
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // Inject CSS into the DOM
            },
        ],
    },

    resolve: {
        // Extensions that can be omitted during import statements
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },

    plugins: [
        // Generate an HTML file and inject the bundled JS into it
        new HtmlWebpackPlugin({
            template: './public/index.html',
            scriptLoading: 'defer',
        }),
    ],

    devServer: {
        // Set the static directory to 'dist' where bundled files are stored
        static: path.resolve(__dirname, 'dist'),
        // Set the port for the development server
        port: 3000,
        open: {
            app : {
                name: "google-chrome"
            }
        }, // Open the browser automatically when the server starts
        hot: true, // Enable hot module replacement for live updates

    },

    mode: 'development', // Set to 'production' for optimized builds (minification, etc.)
};
