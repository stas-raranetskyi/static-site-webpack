const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            inject: false
        });
    });
}

const htmlPlugins = generateHtmlPlugins('./src/html/views');

const config = {
    entry: ['./src/js/index.js', './src/scss/style.scss'],
    output: {
        filename: './js/bundle.js'
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
          watch: true,
        },
        port: 3000,
    },
    devtool: 'source-map',
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    sourceMap: true,
                },
                extractComments: true
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                include: path.resolve(__dirname, 'src/scss'),
                use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {}
                },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        url: false
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            sourceMap: true,
                            plugins: () => [
                                require('cssnano')({
                                    preset: [
                                        'default',
                                        {
                                        discardComments: {
                                            removeAll: true
                                        }
                                        }
                                    ]
                                })
                            ]
                        }
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
                ]
            },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, 'src/html/includes'),
                use: ['raw-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/style.bundle.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/fonts',
                    to: './fonts'
                },
                {
                    from: './src/img',
                    to: './img'
                },
            ]
        })
    ].concat(htmlPlugins)
};

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        config.plugins.push(new CleanWebpackPlugin());
    }
    return config;
};
