<template>
    <mt-loadmore :top-method="loadTop" ref="loadmore">
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id">
                <router-link :to="'/index/shoplists/shopinfo?id='+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p class='mui-ellipsis'>￥ {{item.price}}</p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
    </mt-loadmore>
</template>
<script>
    export default({
        data(){
            return {
                list:[],
                lists:[]
            }
        },
        methods:{
            loadTop() {
                this.list=[]
                var i=1
                function randomSort(a, b) {
                    return Math.random() > 0.5 ? -1 : 1;
                }
                this.list=this.lists
                this.list.sort(randomSort);
                this.$refs.loadmore.onTopLoaded()
            },
            getlists(){
                this.$http.get("shoplists").then(result=>{
                    this.lists=this.list=result.body
                })
            }
        },
        created() {
            this.getlists()
        },
    })
</script>
<style>
    
</style>