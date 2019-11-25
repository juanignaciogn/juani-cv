const path = require('path');

module.exports = {
    entry: {
      index: ['./app/client/index.js'],
      /*vendor: [
        'core-js/fn/map', 'core-js/fn/set', 'core-js/fn/array/find', 'core-js/fn/promise', 'core-js/fn/object/assign',
        'react', 'react-dom',
        'react-declarative-head', 'react-side-effect', 'serialize-javascript'
      ]*/
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'script.js'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react', '@babel/preset-env' ]
              }
            }
          }
        ]
      }
  }
