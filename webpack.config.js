var webpack = require('webpack');

module.exports = {
    entry: {
        z: './src/js/z'
    },
    output: {
        path: './dist/js',
        filename: 'z.js',
        library: 'Z'
    },
    externals: [{
        'react': 'var React', 
        'react-dom': 'var ReactDOM'
    }],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['es2015', 'stage-2', 'react']
            }
        }]
    }
};