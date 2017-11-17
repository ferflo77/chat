module.exports = {
  entry: [
    './index.jsx'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2016', 'react']
            }
          }
        ]      
      }
    ]
  },
  output: {
    filename: 'bundle.js' 
  },
  devServer: {
  	historyApiFallback: true,
    overlay: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  node: {
    fs: 'empty',
    net: 'empty'
  }
}