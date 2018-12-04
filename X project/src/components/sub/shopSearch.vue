<template>
    <div class="my-shopsearch">
        <mt-header fixed>
            <a @click="back()" slot="left">
                <span class="mui-icon mui-icon-back"></span>
            </a>
        </mt-header>
        <mt-search cancel-text="" :placeholder="title"></mt-search>
    </div>
</template>
<script>
    export default({
        data(){
            return {
                title:""
            }
        },
        methods:{
            back(){
                this.$router.back(-1)
            },
            getTitle(){
                if(this.$route.query.title==undefined){
                    this.title="搜索热门商品"
                }else{
                    this.title=this.$route.query.title
                }
            }
        },
        created() {
             this.getTitle()
        },
    })
</script>
<style>
    .my-shopsearch .mint-navbar{
        display: block;
        background: none;
    }
    .my-shopsearch .mintui.mintui-search{
        font-size:140%;
        color: #b4b2b2;
    }
    .my-shopsearch .mint-searchbar-inner{
        border-radius: 5px;
        background: none;
        z-index: 100;
    }
    .my-shopsearch .mint-searchbar-core{
        background: none;
        margin: 0;
    }
    .my-shopsearch .mint-searchbar{
        background:#e8e8e8;
        padding: 6px;
    }
    .my-shopsearch .mint-search{
            position: fixed;
            top: 0;
            left: 0;
            z-index: 100;
            height: 50px;
            width: 85%;
            padding: 5px;
            margin-left: 15%;
    }
    .my-shopsearch .mint-header.is-fixed{
        height: 50px;
        background: #fff;
        border-bottom: 1px solid #e8e8e8;
    }
    .my-shopsearch .mui-icon.mui-icon-back{
        color:#e8e8e8
    }
    .my-shopsearch .router-link-active{
        z-index: 1000;
    }
</style>

