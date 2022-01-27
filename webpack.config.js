const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

// loader: biblioteca que entiende algo del código y lo transforma para que webpack lo entienda

const ruleForStyles = {
  test: /\.css$/,
  use: [
    // carga el css y entiende el código
    'style-loader', 
    // referencias dentro de css (imports y requires de css)
    'css-loader']
}

const rulesForJavascript =  {
  test: /\.js$/,
  loader: 'babel-loader',
  // opciones de babel
  options: {
    presets: [
      [
        '@babel/preset-react',
        {
          runtime: 'automatic' // 'classic'
        }
      ]
    ]
  }
};

// plugin: añadir funcionalidad a webpack

// no tener que generar un html index a mano

const rules = [rulesForJavascript, ruleForStyles];

// la configuración de webpack puede ser también un objeto o una función
module.exports = (env, argv) => {
  const {mode} = argv
  const isProduction = mode === 'production'
  return {
    entry: './src/index.js',
    output: {
      filename: isProduction ? '[name].[contenthash].js' : 'main.js',
      path: path.resolve(__dirname, 'build')
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'src/index.html' })
    ],
    // loaders
    module: {
      // lista de reglas para el loader
      rules: rules
    },
    devServer: {
      open: true, // abrimos el navegador
      port: 3000,
      liveReload: true, 
      compress: true
    },
    // para generar el sourcemap y poder debugar desde el navegador (apuntar las referencias y líneas donde hay problemas y para concuerde con el código)
    devtool: 'source-map'
  }
} 