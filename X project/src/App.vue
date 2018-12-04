<template>
 <div class="app-container"  v-touch:right="onSwipeRight">
    <router-view></router-view>
 </div>
</template>
<script>
    export default({
        data(){
            return {
                selected:"1"
            }
        },
        methods:{
            onSwipeRight () {
                this.$router.go(-1)
                console.log(1)
            }
        },
        created() {
            
        },
    })
</script>
<style>

body{
    height:100%;
}
html{
    height:100%;
    background: #fff;
}
.app-container .mui-bar{
    background-color: #fff;
    box-shadow: none;
    border-top: 1px solid #ddd;
}
.app-container .mui-bar-tab .mui-tab-item .mui-icon{
    color:#000;
}
.app-container .mui-bar-tab .mui-tab-item{
    color:#000;
}
ul{
    margin: 0;
    padding: 0;
    list-style: none;
}
.app-container{
    padding-top:50px;
    padding-bottom:50px;
    overflow-x:hidden;
    height: 100vh;
    background: #fff;
}

.mui-bar-tab .mui-tab-item-tao.mui-active {
    color: #007aff;
 }
.mui-bar-tab .mui-tab-item-tao {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-tao .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
   font-size:11px;
   display:block;
   overflow:hidden;
   text-overflow:ellipsis;

}
img{  
    vertical-align: middle;
}
.border-0{
    border:0 !important;
}
.d-flex{
        display: flex;
    }
    .w-100{
        width: 100% !important;
    }
    .w-75{
        width: 75% !important;
    }
    .w-50{
        width: 50% !important;
    }
    .w-25{
        width: 25% !important;
    }
    .h-100{
        height:100% !important;
    }
    .h-75{
        height:75% !important;
    }
    .h-50{
        height:50% !important;
    }
    .h-25{
        height:25% !important;
    }
    .m-0{
        margin: 0 !important;
    }
    .p-0{
        padding: 0 !important;
    }
    image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
    .mui-radio input[type='radio']:checked:before, .mui-checkbox input[type='checkbox']:checked:before{
        color: red !important;
    }
    .app-container .mint-navbar .mint-tab-item.is-selected{
       border-bottom: 3px solid red;
    }
    .app-container .mint-radio-input:checked + .mint-radio-core{
        background-color: red;
        border-color: red;
    }
</style>
