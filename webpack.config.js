import path from 'path'

export default {
    mode: 'development',
    entry: {
        mapa: './src/js/mapa.js',
        addimagen: './src/js/addimage.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve('./public/js')
    }
}