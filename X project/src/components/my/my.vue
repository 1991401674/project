<template>
    <div class="my-admin">
        <div>
            <img src="http://127.0.0.1:1674/img/toux/tx.jpg">
            <div class="w-100 ab"></div>
            <div class="d-flex w-100">
                <div v-for="(item,i) in title" :key="item.id" class="w-100" @click="go(i+1)">
                    <span :class="item.i"></span>
                    <div>{{item.t}}</div>
                </div>
            </div>
        </div>
        <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell mui-media">
                <a class="mui-navigate-right">
                    <span class="mui-icon-extra mui-icon-extra-topic" style="margin-left:10px; font-size:22px;"></span>
                    <span style="margin-left:10px; font-size:90%;">我的订单</span>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media">
                <a class="mui-navigate-right">
                    <span class="mui-icon-extra mui-icon-extra-dictionary" style="margin-left:10px; font-size:22px;"></span>
                    <span style="margin-left:10px; font-size:90%;">优惠券</span>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media">
                <a class="mui-navigate-right">
                    <span class="mui-icon mui-icon-location" style="margin-left:10px;"></span>
                    <span style="margin-left:10px; font-size:90%;">收货地址</span>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media">
                <router-link to="/uppwd" class="mui-navigate-right">
                    <span class="mui-icon mui-icon-locked" style="margin-left:10px;"></span>
                    <span style="margin-left:10px; font-size:90%;">修改密码</span>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media">
                <a class='mui-navigate-right' href="javascript:;">
                    <span class="mui-icon mui-icon-gear" style="margin-left:10px;"></span>
                    <span style="margin-left:10px; font-size:90%;">设置</span>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media">
                <a class="mui-navigate-right">
                    <span class="mui-icon mui-icon-chat" style="margin-left:10px;"></span>
                    <span style="margin-left:10px; font-size:90%;">团购定制</span>
                </a>
            </li>
        </ul>
        <div style="text-align:center;">
            <a @click="exit()">
                <mt-button type="danger" style="width:90%;">退出登录</mt-button>
            </a>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
    import {Toast} from "mint-ui"
    import footer from "../sub/footer.vue";
    export default({
        data(){
            return {
                title:[
                    {t:"待付款",i:"mui-icon-extra mui-icon-extra-card"},
                    {t:"待发货",i:"mui-icon-extra mui-icon-extra-cart"},
                    {t:"待收货",i:"mui-icon-extra mui-icon-extra-express"},
                    {t:"已完成",i:"mui-icon-extra mui-icon-extra-like"},
                    {t:"退款 / 售后",i:"mui-icon-extra mui-icon-extra-prech"}]
            }
        },
        methods:{
            go(i){
                this.$router.push("/index/admin/productlist?title="+i)
            },
            exit(){
                sessionStorage.removeItem("login")
                Toast("退出成功")
                this.$router.push("/index")
            }
        },
        created() {
            
        },
        components:{
            "my-footer":footer
        }
    })
</script>
<style>
    .my-admin .mui-table-view{
        top:-50px;
    }
    .my-admin .mui-icon-extra-card:before,.my-admin .mui-icon-extra-cart:before,.my-admin .mui-icon-extra-express:before,.my-admin .mui-icon-extra-like:before,.my-admin .mui-icon-extra-prech:before{
        position: relative;
        top: 1.5vh;
        color:#fff;
    }
    .my-admin>div:first-child div.d-flex>.w-100>div{
        color:#fff;
        font-size: 70%;
        margin-top:15px;
    }
    .my-admin>div:first-child>div.ab{
        height:65px;
        background: #333;
        position: absolute;
        bottom: 0;
        opacity: 0.5;
    }
    .my-admin>div:first-child>div.w-100.d-flex{
        height:65px;
        position: absolute;
        bottom: 0;
        opacity: 1;
    }
    .my-admin .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        padding: 0;
    }
    .my-admin>div:first-child{
        height:42.5vw;
        background:url(http://127.0.0.1:1674/img/admin/my_bg.jpg) no-repeat;
        background-size:100% 100%;
        position: relative;
        top:-50px;
        text-align: center;
    }
    .my-admin>div:first-child>img:first-child{
        width: 17%;
        border-radius: 50%;
        position: relative;
        top:10%;
    }
</style>
