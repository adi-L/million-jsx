const pkg = require('./package.json');

module.exports = (env, argv) => {
  return {
    entry: `./index.js`,
    output: {
      filename: `${pkg.name}.js`,
      library: pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1),//TODO use function
      globalObject: '(typeof self !== \'undefined\' ? self : this)', // TODO Hack (for Webpack 4+) to enable create UMD build which can be required by Node without throwing error for window being undefined (https://github.com/webpack/webpack/issues/6522)
      umdNamedDefine: true,
      libraryTarget: 'umd',
    },
    plugins: [
    ],

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    "useBuiltIns": "usage",
                    "corejs": 3
                  }
                ],
                ['@babel/preset-typescript', { allowNamespaces: true }]
              ],
              plugins: [
                [
                  "@babel/plugin-transform-react-jsx",
                  {
                    "runtime": "automatic",
                    "importSource": "million"
                  }
                ]
              ]
            },
          },
        },
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(css)$/i,
          use: [{
            loader: 'style-loader',
            options: { injectType: 'singletonStyleTag' },
          },
            'css-loader'],
        },
      ],
    },
  };
};
