<template>
    <div class="my-shoplists">
    <my-search></my-search>
        <my-shoplist></my-shoplist>
    
        <my-footer></my-footer>
    </div>
</template>
<script>
    import footer from "../sub/footer.vue";
    import shopSearchVue from "../sub/shopSearch.vue";
    import slist from "../sub/shoplistsub.vue";
    export default {
        data() {
            return {
                list:[],
                lists:[]
            }
        },
        methods: {
            
        },
        components:{
            "my-search":shopSearchVue,
            "my-footer":footer,
            "my-shoplist":slist
        },
        created(){

        }
    };
</script>
<style>
    .my-shoplists .mui-ellipsis{
        color:#FEAE12;
        font-weight: bold;
        font-size: larger;
        margin-top: 20px;
    }
    .my-shoplists .mui-table-view .mui-media-object{
        max-width: 78px;
        height: 78px;
    }
    .my-shoplists .mui-table-view-cell.mui-media{
        margin-bottom:0.5rem;
        background: #fff;
        height: 100px;
    }
    .my-shoplists .mui-table-view{
        background: none;
    }
</style>
