<template>
    <div class="container-fluid bg-color h-100">
        <div class="row h-100">
            <div class="p-0 left-part h-100">
                <header>
                    <h1>
                        <img src="~assets/images/user_control/headline.png"  alt="Escroud">
                    </h1>
                </header>
                <section>
                    <slot></slot>
                </section>
            </div>
            <div class="p-0 right-part h-100">
                <div class="h-100 position-relative">
                    <figure class="position-absolute picposition-path1">
                        <img src="~assets/images/user_control/Path 1.svg"  alt="高效的二手房竞价工具">
                    </figure>
                    <figure class="position-absolute picposition-path2" >
                        <img src="~assets/images/user_control/Path 2.svg"  alt="高效的二手房竞价工具">
                    </figure>
                    <figure class="position-absolute picposition-house">
                        <img src="~assets/images/user_control/Security-amico.svg" alt="高效的二手房竞价工具">
                    </figure>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: "UserControlBg",

  }
</script>

<style scoped>
    @import "../../../assets/css/user_control/usercontrolbg.css";


</style>