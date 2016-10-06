var webpack = require('webpack');

module.exports = {
    entry: {
        example: './examples/js/example',
        example1: './examples/js/example1',
        vendor: ['classnames', 'formsy-react']
    },
    output: {
        path: './examples/dist',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader?'
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }, {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    resolve: {
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common', 'vendor'],
            minChunks: 2
        }),
    ]
};