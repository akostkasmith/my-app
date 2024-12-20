const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';

    return {
        entry: './src/index.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/[name].[contenthash].js',
            clean: true,
            publicPath: '/',
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'public'),
            },
            port: 3000,
            hot: true,
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader', 'ts-loader'],
                },
                {
                    test: /\.module\.(sa|sc|c)ss$/,
                    use: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: '[name]__[local]__[hash:base64:5]',
                                },
                                sourceMap: isDevelopment,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isDevelopment,
                            },
                        },
                    ],
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    exclude: /\.module\.(sa|sc|c)ss$/,
                    use: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
                favicon: './public/favicon.ico',
            }),
            new MiniCssExtractPlugin({
                filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'public',
                        to: '',
                        globOptions: {
                            ignore: ['**/index.html', '**/favicon.ico'],
                        },
                    },
                ],
            }),
        ],
        optimization: {
            moduleIds: 'deterministic',
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
        ignoreWarnings: [
            {
                module: /\.(sa|sc|c)ss$/,
                message: /Deprecation/,
            },
        ],
    };
};
