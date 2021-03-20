module.exports = {
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
        'request':'@/request',
        //'img': "../assets/images"
        //.set('img',resolve('src/assets/images'))


      },

    },

    // devServer: {
    //     disableHostCheck: true,
    //     open: false,
    //     host: 'localhost://',
    //     port: 443,
    //     https: true,
    //     hotOnly: false,
    // },

  },



}