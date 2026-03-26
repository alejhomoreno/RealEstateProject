import path from 'path'

export default {
    mode: 'development',
    entry: {
        mapa: './src/js/mapa.js',
        addimagen: './src/js/addimage.js',
        showMap: './src/js/showMap.js',
        mapaHome: './src/js/mapaHome.js',
        changeState: './src/js/changeState.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve('./public/js')
    }
}