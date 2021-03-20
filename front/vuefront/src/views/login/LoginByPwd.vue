<template>
    <user-control-bg>
        <phone ref="uphone" v-model="phoneData" :headName="headName">
        </phone>
    </user-control-bg>
</template>

<script>
  import UserControlBg from "components/content/user-control/UserControlBg"
  import Phone from "components/content/user-control/Phone"
  export default {
    name: "LoginByPwd",
    data(){
      return{
        phoneData: {
          phoneNum: "",
          phoneAvailable: false,
          areaCode: "",
          userTag: 0,
        },
        headName:"手机号",
        isColorShow:false,
        hintContent:"",
      }
    },
    components:{
      UserControlBg,
      Phone,
    }
  }
</script>

<style scoped>

</style>