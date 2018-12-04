<template>
    <div class="my-index">
        <mt-header fixed></mt-header>
        <mt-search cancel-text=""></mt-search>
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="item in list" :key="item.id">
                <router-link to="/index">
                    <img :src="item.img_url"  :key="item.id" class="w-100 h-100"/>
                </router-link>
            </mt-swipe-item>
        </mt-swipe>
        <div>
            <router-link to="/index">
                <img :src="imgs[0]" class="w-50">
            </router-link>
            <router-link to="/index">
                <img :src="imgs[1]" class="w-50">
            </router-link>
        </div>
        <div>
            <router-link to="/index">
                <img :src="imgs[2]" class="w-100">
            </router-link>
        </div>
        <div class="d-flex">
            <div class="div1">
                <router-link to="/index">
                    <img :src="imgs[3]" class="w-100 h-100">
                </router-link>
            </div>
            <div class="div2">
                <router-link to="/index">
                    <img :src="imgs[4]" class="w-100">
                </router-link>
                <router-link to="/index">
                    <img :src="imgs[5]" class="w-100">
                </router-link>
                <router-link to="/index">
                    <img :src="imgs[6]" class="w-100">
                </router-link>
                <router-link to="/index">
                    <img :src="imgs[7]" class="w-100">
                </router-link>
                <router-link to="/index">
                    <img :src="imgs[8]" class="w-100">
                </router-link>
            </div>
        </div>
        <div>
            <router-link to="/index">
                <img :src="imgs[9]" class="w-100">
            </router-link>
            <router-link to="/index">
                <img :src="imgs[10]" class="w-100">
            </router-link>
            <router-link to="/index">
                <img :src="imgs[11]" class="w-100">
            </router-link>
            <router-link to="/index">
                <img :src="imgs[12]" class="w-100">
            </router-link>
        </div>
        <div class="d-flex">
            <div class="w-50">
                <router-link to="/index">
                    <img :src="imgs[13]" class="w-100">
                </router-link>
            </div>
            <div class="w-50">
                <router-link to="/index">
                    <img :src="imgs[14]" class="w-100 h-50">
                </router-link>
                <router-link to="/index">
                    <img :src="imgs[15]" class="w-100 h-50">
                </router-link>
            </div>
        </div>
        <div class="d-flex">
            <div class="w-50">
                <router-link to="/index">
                    <img :src="imgs[16]" class="w-100">
                </router-link>
                <router-link to="/index">
                    <img :src="imgs[18]" class="w-100">
                </router-link>
            </div>
            <div class="w-50">
                <router-link to="/index">
                    <img :src="imgs[17]" class="w-100 h-100">
                </router-link>
            </div>
        </div>
        <div>
            <router-link to="/index">
                <img :src="imgs[19]" class="w-100 h-100">
            </router-link>
        </div>
        <div class="d-flex">
            <div class="w-50">
                <router-link to="/index">
                    <img :src="imgs[20]" class="w-100">
                </router-link>
                <router-link to="/index">
                    <img :src="imgs[23]" class="w-100">
                </router-link>
            </div>
            <div class="w-50">
                <router-link to="/index">
                    <img :src="imgs[21]" class="w-100">
                </router-link>
                <router-link to="/index">
                    <img :src="imgs[22]" class="w-100">
                </router-link>
                <router-link to="/index">
                    <img :src="imgs[24]" class="w-100">
                </router-link>
            </div>
        </div>
        <div>
            <router-link to="/index">
                <img :src="imgs[25]" class="w-100">
            </router-link>
        </div>
        <div class="d-flex">
            <div class="div3">
                <router-link to="/index">
                    <img :src="imgs[26]" class="w-100">
                </router-link>
                <router-link to="/index">
                    <img :src="imgs[28]" class="w-100">
                </router-link>
                <div class="d-flex">
                    <div class="w-100">
                        <router-link to="/index">
                            <img :src="imgs[30]" class="w-100 h-100">
                        </router-link>
                    </div>
                    <div class="w-100">
                        <router-link to="/index">
                            <img :src="imgs[31]" class="w-100 h-100">
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="div4">
                <router-link to="/index">
                    <img :src="imgs[27]" class="w-100">
                </router-link>
                <router-link to="/index">
                    <img :src="imgs[29]" class="w-100">
                </router-link>
                <router-link to="/index">
                    <img :src="imgs[32]" class="w-100">
                </router-link>
            </div>
        </div>
        <div>
            <router-link to="/index">
                <img :src="imgs[33]" class="w-100">
            </router-link>
        </div>
        <div>
            <router-link to="/index">
                <img :src="imgs[34]" class="w-50">
            </router-link>
            <router-link to="/index">
                <img :src="imgs[35]" class="w-50">
            </router-link>
            <router-link to="/index">
                <img :src="imgs[36]" class="w-50">
            </router-link>
            <router-link to="/index">
                <img :src="imgs[37]" class="w-50">
            </router-link>
            <router-link to="/index">
                <img :src="imgs[38]" class="w-50">
            </router-link>
            <router-link to="/index">
                <img :src="imgs[39]" class="w-50">
            </router-link>
            <router-link to="/index">
                <img :src="imgs[40]" class="w-50">
            </router-link>
            <router-link to="/index">
                <img :src="imgs[41]" class="w-50">
            </router-link>
            <router-link to="/index">
                <img :src="imgs[42]" class="w-50">
            </router-link>
            <router-link to="/index">
                <img :src="imgs[43]" class="w-50">
            </router-link>
        </div>
        <div>
            <router-link to="/index">
                <img :src="imgs[44]" class="w-100">
            </router-link>
        </div>
        <div class="d-flex">
            <div class="w-100">
                <router-link to="/index">
                    <img :src="imgs[45]" class="w-100 h-100">
                </router-link>
            </div>
            <div class="w-100">
                <router-link to="/index">
                    <img :src="imgs[46]" class="w-100 h-100">
                </router-link>
            </div>
            <div class="w-100">
                <router-link to="/index">
                    <img :src="imgs[47]" class="w-100 h-100">
                </router-link>
            </div>
        </div>
        <div>
            <router-link to="/index">
                <img :src="imgs[48]" class="w-100">
            </router-link>
        </div>
        <div>
            <router-link to="/index">
                <img :src="imgs[49]" class="w-50">
            </router-link>
            <router-link to="/index">
                <img :src="imgs[50]" class="w-50">
            </router-link>
            <router-link to="/index">
                <img :src="imgs[51]" class="w-50">
            </router-link>
            <router-link to="/index">
                <img :src="imgs[52]" class="w-50">
            </router-link>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
    import footer from "../sub/footer.vue";
    export default({
        data(){
            return {
                list:[],
                imgs:[]
            }
        },
        methods:{
            getImage(){
                var url = "imagelist";
                this.$http.get(url).then(result=>{
                    this.list=result.body[0];
                    this.imgs=result.body[1];
                    return this.list,this.imgs;
                })
            },
        },
        beforeMount(){
            this.getImage();  
        },
        components:{
            "my-footer":footer
        }
        
    })

</script>
<style>
    .my-index .mint-search{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        height: 50px;
        padding: 5px;
        padding-left: 15%;
        width:100%;
    }
    .my-index .mint-search{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        height: 50px;
        padding: 5px;
        padding-left: 28%;
    }
    .my-index .mint-searchbar-inner{
        border-radius: 5px;
    }
    .my-index .mint-searchbar-core{
        background: none;
        margin: 0;
    }
    .my-index .mint-searchbar{
        background:none;
        padding: 5px;
    }
    .my-index .mint-header.is-fixed{
            background:#e60012 url('http://127.0.0.1:1674/img/index/logoN.png') no-repeat;
            background-size: auto 50%;
            background-position: 5% center;
            height: 50px;
    }
    .my-index .mint-swipe{
        height: 55vh;
    }
    .my-index .mint-swipe img{
        width:100%;
        height:100%
    }
    .my-index .d-flex .div1{
        width: 72.2%;
    }
    .my-index .d-flex .div2{
        width: 27.8%;
    }
    .my-index .d-flex .div3{
        width:65.067%;
    }
    .my-index .d-flex .div4{
        width:34.934%;
    }
</style>
