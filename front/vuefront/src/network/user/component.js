import Service from 'network/base'

export default {
  userCheck(data){
    let config ={
      url:"/user/component/usercheck/"
    };

    return Service.post(config.url,data);
  },

  searchCountry (data) {

    let config ={
      url:"/user/component/searchcountry"
    };
    return Service.post(config.url,data);
  },


}