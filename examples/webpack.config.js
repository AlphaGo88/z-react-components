var webpack = require('webpack');

module.exports = {
    entry: {
        datepicker: './src/datepicker',
        dialog: './src/dialog',
        form: './src/form',
        page: './src/page',
        radio: './src/radio',
        select: './src/select',
        tabs: './src/tabs',
    },
    output: {
        path: './dist',
        filename: '[name].js',
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
    },
};