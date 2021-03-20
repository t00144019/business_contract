//import _ from 'lodash'
import iaxios from './iaxios'

// const defaultPagination = {
//   current: 1,
//   size: 10
// }
//
// const paginationBody = (body, pagination) => {
//   let _body = _.cloneDeep(body || {})
//   pagination = _.defaultsDeep(pagination, defaultPagination)
//   let _pag = {
//     sort: pagination.sort || null,
//     order: pagination.order || null,
//     pageOffset: pagination.pageOffset || pagination.current || 1,
//     pageSize: pagination.pageSize || pagination.size || 10
//   }
//   return _.defaultsDeep(_body, _pag)
// }



export default {
  // defaultPagination,
  // paginationBody,



  post (url, body) {
    console.log("======================");
    console.log("AXIOS POST:");
    console.log(body);
    console.log("POST URL:");
    console.log(url);
    iaxios.interceptors.request.use(config => {
      // 可以在这里加入ajax请求前处理的业务，如加入access_token

      config.headers['Content-Type'] = 'application/json';

      return config
    })
    return iaxios.post(url, body)
  },

  postForm (url, body) {
    console.log("======================");
    console.log("AXIOS POST:");
    console.log(body);
    console.log("POST-FORM URL:");
    console.log(url);
    iaxios.interceptors.request.use(config => {
      // 可以在这里加入ajax请求前处理的业务，如加入access_token

      config.headers['Content-Type'] = 'multipart/form-data';

      return config
    })
    return iaxios.post(url, body)
  }


}