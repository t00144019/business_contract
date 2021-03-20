<template>
    <div class="w-100 item-mt" :class="!isColorShow?'red-color':''">
        <div class="item-head mb-0"><slot name="head"></slot></div>
        <div class="row align-items-center m-0 item-content position-relative">
            <div class="left align-items-center h-100"><slot name="left"></slot></div>
            <div class="d-flex flex-row align-items-center w-100"><slot name="input"></slot></div>
            <div class="right position-absolute h-100 d-flex flex-row align-items-center"><slot name="right"></slot></div>
            <div class="position-absolute search-position w-100"><slot name="search-box"></slot></div>
            <div class="position-absolute invalid">{{hintContent}}</div>
        </div>
    </div>
</template>

<script>

  export default {
    name: "InputItem",
    data(){
      return{
      }
    },
    props:{
      isColorShow:Boolean,
      hintContent:String,
    }
  }
</script>

<style scoped>
    @import "../../assets/css/components/inputitem.css";
</style>