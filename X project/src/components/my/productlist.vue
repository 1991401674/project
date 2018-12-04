<template>
    <div class="my-productlist">
        <div>
            <mt-navbar v-model="selected" class="top" value="1">
                <mt-tab-item id="1">商场订单</mt-tab-item>
                <mt-tab-item id="2">退款订单</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <mt-navbar v-model="selecteds" class="moddle" value="1">
                        <mt-tab-item id="1">待付款</mt-tab-item>
                        <mt-tab-item id="2">待发货(0)</mt-tab-item>
                        <mt-tab-item id="3">待收货(0)</mt-tab-item>
                        <mt-tab-item id="4">待评论(0)</mt-tab-item>
                        <mt-tab-item id="5">已完成(0)</mt-tab-item>
                    </mt-navbar>
                    <mt-tab-container v-model="selecteds">
                        <mt-tab-container-item id="1">
                            <div class="none">没有更多订单了</div>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="2">
                            <div class="none">没有更多订单了</div>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="3">
                            <div class="none">没有更多订单了</div>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="4">
                            <div class="none">没有更多订单了</div>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="5">
                            <div class="none">没有更多订单了</div>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <div class="none">没有更多订单了</div>
                </mt-tab-container-item>
            </mt-tab-container>
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
                selected:"1",
                selecteds:"1"
            }
        },
        methods:{
            getTitle(){
                var title=this.$route.query.title
                if(title<4){
                    this.selecteds=title;
                    this.selected="1";
                }else if(title==4){
                    this.selecteds="5"
                    this.selected="1";
                }else{
                    this.selected="2";
                }
               
            }
        },
        created() {
            this.getTitle()
        },
        watch:{
            selecteds(){
                if(this.selecteds<4){
                    this.$router.push("/index/admin/productlist?title="+this.selecteds)
                }else if(this.selecteds==5){
                    this.$router.push("/index/admin/productlist?title="+"5")
                }else{
                    this.$router.push("/index/admin/productlist?title="+"6")
                }
            }
        },
        components:{
            "my-footer":footer
        }
    })
</script>
<style>
    .my-productlist .none{
        text-align: center;
        padding: 20px;
        font-size: 80%;
        color: #666;
    }
    .my-productlist{
        height: 100%;
        background:#ccc;
    }
    .my-productlist>div:first-child{
        position: relative;
        top: -50px;
    }
    .my-productlist .mint-navbar{
        border-bottom: 1px solid #e8e8e8;
    }
    .my-productlist .mint-navbar.top .mint-tab-item.is-selected{
        border: none;
        color: #b61d1d;
    }
    .my-productlist .top .mint-tab-item-label{
        font-size: 15px;
    }
    .my-productlist .moddle .mint-tab-item-label{
        color: #969696;
    }
</style>
