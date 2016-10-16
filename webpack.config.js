var webpack = require('webpack');

module.exports = {
    entry: {
        z: './src/js/z'
    },
    output: {
        path: './examples',
        filename: 'z.js',
        library: 'Z'
    },
    externals: [{
        'react': 'var React', 
        'react-dom': 'var ReactDOM'
    }],
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
                presets: ['es2015', 'stage-2', 'react']
            }
        }]
    },
    resolve: {},
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['common', 'vendor'],
        //     minChunks: 2
        // }),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: JSON.stringify("production")
        //     }
        // })
    ]
};