<template>
    <div class="my-footer">
        <mt-tabbar v-model="selected" fixed>
                <mt-tab-item id="1">
                    <img slot="icon" :src='selected=="1"?"http://127.0.0.1:1674/img/footer/home_on.png":"http://127.0.0.1:1674/img/footer/home1.png"'>
                    首页
                </mt-tab-item>
            <mt-tab-item id="2">
                <img slot="icon" :src='selected=="2"?"http://127.0.0.1:1674/img/footer/classify_on.png":"http://127.0.0.1:1674/img/footer/classify1.png"'>
                分类
            </mt-tab-item>
            <mt-tab-item id="3">
                <img slot="icon" :src='selected=="3"?"http://127.0.0.1:1674/img/footer/shopCart_on.png":"http://127.0.0.1:1674/img/footer/shopCart1.png"'>
                购物车
            </mt-tab-item>
            <mt-tab-item id="4">
                <img slot="icon" :src='selected=="4"?"http://127.0.0.1:1674/img/footer/my_on.png":"http://127.0.0.1:1674/img/footer/my1.png"'>
                我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script>
    export default({
        data(){
            return {
                selected:"",
                shop:"",
                login:1,
                title:"",
                shopcart:""
            }
        },
        methods:{
            getlogin(){
                if(sessionStorage.length==0){
                    this.$router.push("/login")
                }
            },
            getUrl(){
                var r=this.$route.fullPath
                if(r=="/index"){
                    this.selected="1"
                }else if(r=="/index/shoplist"){
                    this.shop=0
                    this.selected="2"
                }else if(r=="/index/shoplists?title="+encodeURI(this.$route.query.title)){
                    this.shop=1
                    this.selected="2"
                }else if(r=="/index/shoplists"){
                    this.shop=3
                    this.selected="2"
                }else if(r=="/index/shopcart"){
                    this.selected="3"
                }else if(r=="/login"){
                    this.selected="3"
                }else if(r=="/admin"){
                    this.selected="4"
                    this.login=1
                }else if(r=="/login"){
                    this.selected="4"
                    this.login=0
                }else if(r=="/index/admin/productlist?title="+this.$route.query.title){
                    this.selected="4"
                    this.login=2
                }
            }
        },
        created() {
            this.getUrl();
        },
        watch:{
            selected(i){
                if(i==1){
                    this.$router.push("/index")
                }else if(i==2){
                    if(this.shop==0){
                        this.$router.push("/index/shoplist")
                    }else if(this.shop==1){
                        this.$router.push("/index/shoplists?title="+this.$route.query.title)
                    }else{
                        this.$router.push("/index/shoplists")
                    }
                    
                }else if(i==3){
                    this.$router.push("/index/shopcart")
                    this.getlogin()
                }else if(i==4){
                    if(this.login==0){
                        this.$router.push("/login")
                    }else if(this.login==1){
                        this.$router.push("/admin")
                        this.getlogin()
                    }else{
                        this.$router.push("/index/admin/productlist?title="+this.$route.query.title)
                    }
                }
            }
        }
    })
</script>
<style>
    .mint-tab-item{
        color: #000;
    }
    .my-footer .mint-tabbar > .mint-tab-item.is-selected{
        color: #e70012 !important;
    }
    .my-footer .mint-tab-item-label{
        font-size:12px !important;
    }
</style>
