let webpack = require('webpack');
// let uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
let path = require('path');
module.exports = {
    // 起始的 js
    entry: './assets/js/loadTwitch.js',
    // 輸出位址
    output: {
        path: path.join(__dirname,'assets/js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ]
    }
    // // Plugins
    // plugins: [
    //     new uglifyJsPlugin({
    //         compress: {
    //             warning: false
    //         }
    //     })
    // ]
}