const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')


module.exports = {
    entry: './src/react/index.js',
    output: {
        path: path.join(__dirname,'/src/react/dist' ),
        filename: 'index_bundle.js'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude:/node_modules/,
                use:{
                    loader: 'babel-loader'
                }   
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/react/index.html'
        }),
  
    ]
}
