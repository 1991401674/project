<template>
    <div class="my-goodlist h-100">
        <my-search></my-search>
        <div class="mui-content mui-row mui-fullscreen">
			<div class="mui-col-xs-3">
				<div class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical">
                    <ul>
                        <li v-for="(item,i) in radio" :key="item.id" @click="abc(item.id,item.title)" class="br-1" :class="{'title-active':ac==i,'':ac!==i}">
                            <mt-tab-item>{{item.title}}</mt-tab-item>
                        </li>
                    </ul>
				</div>
			</div>
			<div class="mui-col-xs-9 h-100" style="border-left: 1px solid #c8c7cc; ">
				<ul class="mui-table-view mui-grid-view mui-grid-9 h-100" style="padding:1rem; justify-content: space-around;overflow: auto;">
                    <router-link :to='"/index/shoplists?title="+shoplist.title' v-for="shoplist in listimg" :key="shoplist.id">
                        <li class="mui-table-view-cell mui-media" style="width:30%; margin: 1.6%">
                            <img :src="shoplist.img" alt="" class="w-100">
                            <div class="mui-media-body">{{shoplist.title}}</div>
                        </li>
                    </router-link>
                </ul>
			</div>
		</div>
        <!-- <div class="d-flex w-100">
            <div class=" mui-col-xs-3 mui-col-sm-3">
                <mt-navbar>
                    <ul>
                        <li v-for="(item,i) in radio" :key="item.id" @click="abc(item.id,item.title)" class="br-1" :class="{'title-active':ac==i,'':ac!==i}">
                            <mt-tab-item>{{item.title}}</mt-tab-item>
                        </li>
                    </ul>
                </mt-navbar>
            </div>
            <div class="list mui-col-xs-9 mui-col-sm-9">
                <div class="mui-content w-100">
                    <ul class="mui-table-view mui-grid-view mui-grid-9 d-flex" style="padding:1rem; justify-content: space-around;">
                        <router-link :to='"/index/shoplists?title="+shoplist.title' v-for="shoplist in listimg" :key="shoplist.id">
                            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                                <img :src="shoplist.img" alt="" class="w-100">
                                <div class="mui-media-body">{{shoplist.title}}</div>
                            </li>
                        </router-link>
                    </ul>
                </div>
            </div>
        </div> -->
        <my-footer></my-footer>
    </div>
</template>
<script>
    import shopSearchVue from "../sub/shopSearch.vue";
    import footer from "../sub/footer.vue";
    export default({
        data(){
            return {
               radio:[],
               listimg:[],
               ac:""
            }
        },
        methods:{
            getTitle(){
                this.$http.get("shoplist").then(result=>{
                    this.radio=result.body;
                    this.abc(2);
                })
            },
            abc(id,t){
                if(id>=2) {
                    this.ac=id-1;
                    this.listimg=this.radio[id-1].list;
                }else{
                    this.$router.push("/index/shoplists?title="+t)
                }
            }
        },
        created(){
            this.getTitle();
        },
        components:{
            "my-search":shopSearchVue,
            "my-footer":footer
        }
    })
</script>
<style>
    .my-goodlist .mui-row > [class*='mui-col-']{
        border:0 !important;
    }
    .my-goodlist .mui-fullscreen{
        position: static;
        height: 100%;
    }
    .my-goodlist .mint-tab-item ul li{
        height: 50px;
    }
    .my-goodlist .mui-fullscreen .mint-tab-item-label{
        text-align: center;
        line-height: 35px;
    }
    .my-goodlist .mui-media-body{
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size: 10px !important;
    }
    .br-1.title-active{
        background-color: #fff !important;
        border-right: none !important;
    }
    .my-goodlist .mui-content{
        background: #f5f5f5
    }
    .my-goodlist .mui-grid-view.mui-grid-9{
        background-color: #fff;
        border: none;
    }
    .my-goodlist .mint-tab-item .mint-tab-item-label{
        font-size: 14px;
        color:#000;
    }
    .my-goodlist .br-1{
        border-bottom: 1px solid #dcdcdc;
        border-right: 1px solid #dcdcdc;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: 1px solid #eee;
    }
</style>
