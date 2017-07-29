var webpack = require('webpack');

var PROD = process.env.PROD || '0';

module.exports = {
    entry: {
        'ng-synaps-pics': [
            __dirname + '/src/index.js',
        ],
    },
    output: {
        filename: 'dist/[name].min.js',
        // library: '[name]',
        // libraryTarget: 'umd'
    },
    externals: {
        'angular': 'angular'
    },
    devtool: PROD ? 'source-map' : 'inline-source-map',
    plugins: PROD ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ] : [],
    stats: {
      children: false,
      hash: false,
      version: false,
      warnings: false,
      errorDetails: true,
    }
};
