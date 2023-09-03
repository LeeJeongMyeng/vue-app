const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  outputDir: "../miniproject/sample/src/main/resources/static",
  devServer: {
    proxy: "http://localhost:8080",
    //changeOrigin: true
  }
});


// const  target = 'http://localhost:8080'
// module.exports = {
//   devServer:{
//     port: 8080,
//     proxy:{
//       '/api' : {
//       target,
//       changeOrigin:true
//       }
//     }
//   }
// }
