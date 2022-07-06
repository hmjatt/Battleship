const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: './src/public/index.js',
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
		clean: true,
		assetModuleFilename: '[name][ext]',
    },
	devtool: 'source-map',
    module: {
        rules: 
        [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					}
				}
			},
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Weather App',
			filename: 'index.html',
			template: './src/public/template.html',
			favicon: './src/public/images/cloudy.svg',
		}),
		new Dotenv(),
	]
};