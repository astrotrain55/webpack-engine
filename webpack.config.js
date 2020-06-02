const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const getPort = require('get-port');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';
const isProd = !isDev;
const CONTENT_BASE = '/dist/';
const dir = {
  src(...args) {
    return this.path('src', ...args);
  },
  dist(...args) {
    return this.path('dist', ...args);
  },
  path(...params) {
    return path.resolve(__dirname, ...params);
  },
};

const PAGES_DIR = dir.src('markup', 'pages');
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

function webpackConfig(port) {
  return {
    context: dir.src(),

    mode,
    entry: './main.js',
    devtool: 'source-map',
    optimization: optimization(),
    devServer: devServer(port),
    plugins: plugins(),

    output: {
      publicPath: publicPath(port),
      path: dir.dist(),
      filename: filename('js'),
      chunkFilename: filename('js'),
    },

    resolve: {
      extensions: ['.js', '.json', '.vue', '.ts'],
      alias: {
        root: dir.src(),
      },
    },

    module: {
      rules: rules(),
    },
  };
}

module.exports = isProd ? webpackConfig() : development();

function rules() {
  const result = [
    {
      test: /\.styl/,
      use: cssLoaders({
        loader: 'stylus-loader',
        options: {
          use: [require('nib')()],
          import: [
            '~nib/lib/nib/index.styl',
            dir.src('assets', 'styles', 'smartgrid.styl'),
          ],
        },
      }),
    },
    {
      test: /\.css$/,
      use: cssLoaders(),
    },
    {
      test: /\.(png|jpe?g|svg|gif)$/,
      use: ['file-loader'],
    },
    {
      test: /\.(ttf|woff|woff2|eot)$/,
      use: ['file-loader'],
    },
    {
      test: /\.pug$/,
      use: ['pug-loader'],
    },
    {
      test: /\.vue$/,
      use: ['vue-loader'],
    },
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    {
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['eslint-loader'],
    },
  ];

  return result;
}

function optimization() {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
}

function filename(ext) {
  return isDev ? `[name].${ext}` : `[name].[chunkhash].${ext}`;
}

function cssLoaders(stylus) {
  const loaders = [
    isDev ? 'vue-style-loader' : {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true,
      },
    },
    'css-loader',
    'group-css-media-queries-loader',
    'postcss-loader',
  ];

  if (stylus) {
    loaders.push(stylus);
  }

  return loaders;
}

function plugins() {
  const base = [
    new webpack.ProvidePlugin({
      _: [dir.src('global', 'lodash.js'), 'default'],
      ev: [dir.src('global', 'events.js'), 'default'],
    }),
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      template: './markup/.files.ejs',
      filename: '../manual/manifest.json',
      inject: false,
      alwaysWriteToDisk: true,
    }),
    ...PAGES.map(page => new HTMLWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/, '.php')}`,
    })),
    new HtmlWebpackHarddiskPlugin(),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{
        from: dir.src('assets', 'favicon.ico'),
        to: dir.dist(),
      }],
    }),
    new BundleAnalyzerPlugin({
      reportFilename: '../manual/report.html',
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ];

  if (isDev) {
    base.push(new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: false,
      cwd: process.cwd(),
    }));
  }

  if (isProd) {
    base.push(new MiniCssExtractPlugin({
      filename: filename('css'),
    }));
  }

  return base;
}

function devServer(port) {
  return !port ? {} : {
    contentBase: CONTENT_BASE,
    host: '0.0.0.0',
    port: port,
    hot: isDev,
    overlay: true,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
}

function publicPath(port) {
  const host = port ? `http://localhost:${port}` : '.';
  return `${host}/`;
}

async function development() {
  const port = await getPort();
  return webpackConfig(port);
}

function getNameProject() {
  const full = path.resolve(__dirname).split(path.sep);
  return full.pop();
}
