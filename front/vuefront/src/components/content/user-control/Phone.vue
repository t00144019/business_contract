<template>
    <input-item :isColorShow="isColorShow" :hintContent="hintContent">
        <label slot="head" class="mb-0" for="inputNum">{{headName}}</label>
        <div slot="left" id="left" ref="icon" class="d-flex flex-row h-100 align-items-center" @click="coutryShow">
            <img :src="selectflag" class="img-nation"><img src="~assets/images/user_control/arrow-down.svg"
                                                           class="img-arrow">
            <span class="phone-separate"></span><span class="nation-num">+{{selectcode}}</span>
        </div>
        <div slot="input" id="input" class="box-width">
            <input type="tel" class="form-control-plaintext p-0 hw pl-3" id="inputNum" maxlength="11"
                   placeholder="请输入手机号"
                   v-model="childPhoneData.phoneNum" @click="searchBox = false" @blur.prevent="numChange">
        </div>
        <div slot="right" id="right">
            <img src="~assets/images/user_control/mobile.svg">
        </div>


        <div slot="search-box" id="search-box" class="search-container search-scroll" ref="newView" v-show="searchBox">

            <div id="search-content" class="form-row align-items-center search-box m-0 mr-3 ml-3">
                <div class="p-0 pl-3">
                    <img src="~assets/images/user_control/search.svg">
                </div>
                <div class="p-0 pl-3">
                    <label class="sr-only" for="inlineFormInputName">Search</label>
                    <input type="text" class="form-control form-control-plaintext outline w-100"
                           id="inlineFormInputName" v-model="keyword"
                           placeholder="搜索国家名称或区号" @change="debounce(searchCounty,50)" @click.stop="searchBox=true">
                </div>
            </div>
            <div id="common" v-if="!searchShow">
                <h4 class="search-font">
                    常用
                </h4>

                <div class="row mr-0 ml-0 align-items-center search-row" v-for="item in clist"
                     @click="countrySelect(item)">
                    <img :src="item.flagurl">
                    <p class="mb-0 ml-3">{{item.cnname}}</p>
                    <p class="mb-0 ml-auto">{{item.areacode}}</p>
                </div>


                <div class="search-line"></div>
                <h4 class="search-font">
                    国家首字母顺序
                </h4>
                <div class="row mr-0 ml-0 align-items-center search-row" v-for="item in nlist"
                     @click="countrySelect(item)">

                    <img :src="item.flagurl">
                    <p class="mb-0 ml-3">{{item.cnname}}</p>
                    <p class="mb-0 ml-auto">{{item.areacode}}</p>
                </div>
            </div>
            <div id="search-result" v-else >
                <h4 class="search-font">
                    搜索结果
                </h4>
                <div class="row mr-0 ml-0 align-items-center search-row" v-for="item in slist"
                     @click="countrySelect(item)">
                    <img :src="item.flagurl">
                    <p class="mb-0 ml-3">{{item.cnname}}</p>
                    <p class="mb-0 ml-auto">{{item.areacode}}</p>
                </div>
                <div class="row justify-content-center align-items-center search-none" v-show="searchNone">
                    没有找到相关搜索结果
                </div>
            </div>

        </div>

    </input-item>
</template>

<script>
  import InputItem from "components/common/InputItem"
  import component from "network/user/component";
  export default {
    name: "Phone",
    data(){
      return {
        isColorShow: true,
        isShow: false,
        selectflag: require("assets/images/user_control/countryflag/034-china.svg"),
        selectcode: "86",
        countryId: 46,
        searchShow: false,
        keyword: "",
        searchBox: true,
        searchNone: false,
        hintContent: "",
        hintLineShow: true,
        isActive: true,
        userTag: this.parentPhoneData.userTag,
        childPhoneData: this.parentPhoneData,


        clist: [
          {
            id: "46",
            cnname: "中国",
            areacode: "86",
            flagurl: require("assets/images/user_control/countryflag/034-china.svg")
          },
          {
            id: "36",
            cnname: "加拿大",
            areacode: "1",
            flagurl: require("assets/images/user_control/countryflag/243-canada.svg")
          },
          {
            id: "210",
            cnname: "美国",
            areacode: "1",
            flagurl: require("assets/images/user_control/countryflag/226-united-states.svg")
          },
          {
            id: "90",
            cnname: "印度",
            areacode: "91",
            flagurl: require("assets/images/user_control/countryflag/246-india.svg")
          }
        ],
        nlist: [],
        slist: [],

      }
    },
    props: {
      parentPhoneData: {},
      headName: String,
    },
    model: {
      //组件中v-model绑定时,需要在子组件中增加model属性
      prop: 'parentPhoneData', // 注意，是prop，不带s。我在写这个速记的时候，多写了一个s，调试到怀疑人生
      event: 'myNumChange'
    },
    components: {
      InputItem
    },
    created() {
      component.searchCountry({keyword: ""}).then(res => {
        console.log(res);
        this.nlist = res.result;
      })

    },
    mounted() {
      document.addEventListener('click',this.queryHide)
    },
    beforeDestroy(){
      document.removeEventListener('click',this.queryHide)
    },
    methods: {
      queryHide (e) {
        if ((!this.$refs.icon.contains(e.target))) {
          /* 关闭元素 */
          this.searchBox = false
        }
      },
      coutryShow() {
        this.searchBox = !this.searchBox;
        // this.hintContent = "";
        // this.hintLineShow = true;
      },
      countrySelect(item) {
        this.selectflag = item.flagurl;
        this.selectcode = item.areacode;
        this.countryId = item.id;
        console.log(item);
        this.searchBox = false;
      },
      searchCounty() {
        if (this.keyword == "") {
          this.searchShow = false;
        } else {
          this.searchShow = true;
          component.searchCountry({keyword: this.keyword}).then(res => {
            if (res.result == "") {
              this.searchNone = true;
            } else {
              this.slist = res.result;
            }
          })

        }
      },
      debounce(func, delay) {
        let timer = null;
        return function (...args) {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      },

      numChange() {
        //console.log(this.phoneNum);
        // this.$emit('someEvent', [returnValueToParent])
        let cnReg = /^1[0-9]{10}$/;
        let usReg = /^[0-9]{10}$/;
        let otherReg = /^[0-9]$/;
        let phoneNum = this.childPhoneData.phoneNum;
        if (this.selectcode == "86") {
          if (cnReg.test(phoneNum) && phoneNum.length == 11) {
            this.childPhoneData.phoneAvailable = true;
            this.isColorShow = this.childPhoneData.phoneAvailable;
            this.childPhoneData.areaCode = this.selectcode;
          } else {
            this.childPhoneData.phoneAvailable = false;
            this.isColorShow = this.childPhoneData.phoneAvailable;
          }
        } else if (this.selectcode == "1") {
          if (phoneNum.length == 10 && usReg.test(phoneNum)) {
            this.childPhoneData.phoneAvailable = true;
            this.childPhoneData.areaCode = this.selectcode;
            this.isColorShow = this.childPhoneData.phoneAvailable;
          } else {
            this.childPhoneData.phoneAvailable = false;
            this.isColorShow = this.childPhoneData.phoneAvailable;
            this.isColorShow = this.childPhoneData.phoneAvailable;
          }
        } else {
          if (phoneNum.length > 0 && otherReg.test(phoneNum)) {
            this.childPhoneData.phoneAvailable = true;
            this.childPhoneData.areaCode = this.selectcode;
            this.isColorShow = this.childPhoneData.phoneAvailable;
          } else {
            this.childPhoneData.phoneAvailable = false;
            this.isColorShow = this.childPhoneData.phoneAvailable;
          }
        }

        if (!this.childPhoneData.phoneAvailable) {
          this.hintContent = "请输入正确手机号";
        } else {
          this.hintContent = "";
          let sendData = {
            countrycode: this.selectcode,
            userid: phoneNum,
            tag: this.userTag,
          };
          component.userCheck(sendData).then(res => {
            //console.log(res);
            if (res.errcode != 0) {
              let errcode = parseInt(res.errcode);
              switch (errcode) {
                case 1:
                  this.hintContent = "该手机号未注册";
                  this.childPhoneData.phoneAvailable = false;
                  this.isColorShow = this.childPhoneData.phoneAvailable;
                  break;
                case 2:
                  this.hintContent = "该手机号被禁用";
                  this.childPhoneData.phoneAvailable = false;
                  this.isColorShow = this.childPhoneData.phoneAvailable;
                  break;
                case 3:
                  this.hintContent = "手机号码格式不正确";
                  this.childPhoneData.phoneAvailable = false;
                  this.isColorShow = this.childPhoneData.phoneAvailable;
                  break;
                case 4:
                  this.hintContent = "该号码已被注册";
                  this.childPhoneData.phoneAvailable = false;
                  this.isColorShow = this.childPhoneData.phoneAvailable;
                  break;
                case 90:
                  this.hintContent = "通信失败";
                  this.childPhoneData.phoneAvailable = false;
                  this.isColorShow = this.childPhoneData.phoneAvailable;
                  break;
              }
            }
          });
        }
        this.$emit("myNumChange", this.childPhoneData);

      },

      setPhoneHintContent(msg1, msg2) {
        this.hintContent = msg1;
        this.isColorShow = msg2;
      }

    },
  }
</script>

<style scoped>
    @import "../../../assets/css/components/inputitem.css";
</style>