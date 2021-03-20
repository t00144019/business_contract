import axios from 'axios'
//import Router from '@/router/index'
//
// export function iaxios(config) {
//   //1.创建axios实例
//   const instance = axios.create({
//     baseURL:'http://internalapi.escroud.com',
//     timeout:5000,
//   })
//
//   //axios的拦截器
//   //请求拦截器
//   instance.interceptors.request.use(config =>{
//     return config
//   },err => {
//     })
//
//   //2.2响应拦截
//   instance.interceptors.response.use(res =>{
//     return res.data
//   },err => {
//   })
//
//   //3.发送真正的网络请求
//   return instance.(config)
// }

const instance = axios.create({

  aseURL: 'http://internalapi.escroud.com',
  // baseURL: 'http://internalapi.hadup.top',

  timeout: 50000,
//    headers: {'Content-Type': 'application/json'}

})

instance.interceptors.request.use(config => {
  console.log(config);
  // 可以在这里加入ajax请求前处理的业务，如加入access_token

  //config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

  let token = window.sessionStorage.getItem("token");

  config.headers.post["Token"] = token;

  //console.log(config);


  //config.headers.post['Token'] = config.data;
  //config.data = JSON.stringify(config.data);
  return config
})

instance.interceptors.response.use(response => {

  console.log("AXIOS Recive:");
  console.log(response.data);

  return response.data
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        //alert("长时间未活动掉线了，请重新登录");
        //store.dispatch('setExit');
        //sessionStorage.setItem('goback', 1)
        //alert();
        window.location.href = "/loginbypwd"
        break;
      // case 404:
      //     Router.push('*');
      //     break;
      // case 500:
      //     Router.push('/500');
      //     break;
      // default:
      //     Router.push('/500');
    }
  }

})

export default instance