const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = (env, argv) => {
    return merge(common(env, argv), {
        output: {
            path: `${__dirname}/dist/`,
            publicPath: "./dist/"
        },
        mode: 'production',
        cache: true,
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin({
                cache: true,
            })],
        },
        devtool: false,
        plugins: [
            new MiniCssExtractPlugin(),
            new webpack.SourceMapDevToolPlugin({
                filename: '[name].js.map',
                exclude: ['vendor.js']
            }),
            new WorkboxPlugin.GenerateSW({
                // these options encourage the ServiceWorkers to get in there fast
                // and not allow any straggling "old" SWs to hang around
                clientsClaim: true,
                skipWaiting: true,
            }),
        ],
    });
}