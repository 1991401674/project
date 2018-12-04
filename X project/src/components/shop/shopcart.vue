<template>
    <div class="my-shopcart">
        <mt-header title="购物车" fixed>
            <a @click.stop="back()" slot="left">
                <mt-button icon="back"></mt-button>
            </a>
            <a @click.stop="delblo()" class="mui-icon mui-icon-trash" slot="right"></a>
        </mt-header>
        <div class="mui-card">
            <form class="mui-input-group">
                <div class="mui-input-row mui-checkbox mui-left" v-for="(item,i) in shop" :key="item.id">
                    <a class="mui-icon mui-icon-redo" @click.stop="shopinfo(item.cid)"></a>
                    <label>
                        <input name="checkbox" :value="item" v-model="sum" type="checkbox">
                        <ul class="mui-table-view">
                            <li class="mui-table-view-cell mui-media">
                                <img class="mui-media-object mui-pull-left" :src="item.img">
                                <div class="mui-media-body">
                                    <div style="margin-bottom:5px; overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
                                    {{item.title}}</div>
                                    <p class="d-flex" style="justify-content:space-between; margin-bottom:5px;">
                                        <b style="color:red;">￥{{item.price.toFixed(2)}}</b>
                                        <span>{{item.color}}</span>
                                        <span>{{item.size}}</span>
                                    </p>
                                    <div class="mui-numbox w-100" style="margin:0;">
                                        <button class="mui-btn mui-btn-numbox-minus" type="button" @click="minus(i)">-</button>
                                        <input class="mui-input-numbox" type="number" v-model="item.count" disabled/>
                                        <button class="mui-btn mui-btn-numbox-plus" type="button" @click="add(i)">+</button>
                                    </div>
                                </div>
				            </li>
                        </ul>
                    </label> 
                </div>         
            </form>
        </div>
        <img src="http://127.0.0.1:1674/img/shopcart/shopCart_null.png" v-if="this.shop.length==0" class="w-50 null"/>
        <mt-tabbar fixed style="height:50px;">
            <mt-button @click="all()" :class="allclass" class="mui-col-xs-4 mui-col-sm-4 h-100" style="background: #333; color:#fff; line-height: 50px; font-size:large;">
                全选
            </mt-button>
            <div class="mui-col-xs-4 mui-col-sm-4" style="background: #333; color:#fff; line-height: 50px; font-size:80%;">
                共计：<b>￥{{he.toFixed(2)}}</b>
            </div>
            <div @click="pay()" class="mui-col-xs-4 mui-col-sm-4" style="background: red; color:#fff; line-height: 50px; font-size:large;">
                <b>结 算</b>
            </div>
            <mt-popup v-model="popupVisible" position="bottom" class="w-100">
                <div style="background:#fff; padding:10px;" class="w-100">
                    支付￥{{he.toFixed(2)}}元
                </div>
                <mt-radio title="请选择支付方式"
                :options=paya v-model="payr" style="text-align:left;">
                </mt-radio>
                <mt-button size="large" style="background:#00FF00; color:#fff;" @click="payM()">
                    <b>支 付</b>
                </mt-button>
            </mt-popup>
        </mt-tabbar>
    </div>
</template>
<script>
    import { MessageBox } from 'mint-ui'
    import {Toast} from "mint-ui"
    export default({
        data(){
            return {
                check:true,
                cart:"null",
                allclass:"",
                nh:"have",
                shop:[],
                sum:[],
                he:0,
                popupVisible:false,
                paya:["支付宝","微信","银行卡"],
                payr:"支付宝"
            }
        },
        methods:{
            payM(){
                var i=this.sum.length
                 if(i>0){
                     MessageBox.confirm('', {message: '你确定要支付？',title: '提示', confirmButtonText: '确定', cancelButtonText: '取消'}).then(action => { 
                         if (action == 'confirm') {
                            MessageBox.prompt('请输入支付密码！',{inputValidator: (val) => {
                                if (val === null) {
                                return true;
                                }
                                return !(val.length < 6 || val.length > 18)
                                }, inputErrorMessage: '密码长度必须在6~18位'
                                }).then(({ value, action }) => {
                                Toast("支付成功")
                                for(var key in this.sum){
                                    var img=this.sum[key].img
                                    var size=this.sum[key].size
                                    this.$http.post('delshop',{img:img,size:size}).then(result=>{
                                        i--
                                        if(i==0){
                                            this.popupVisible=false;
                                            this.getshop()
                                            this.allclass="";
                                            this.sum=[]
                                        }
                                    }) 
                                }
                            }).catch(err => { 
                                 if (err == 'cancel') {
                                    this.popupVisible=false;
                                 } 
                            });
                        }
                     }).catch(err => { 
                         if (err == 'cancel') {
                             this.popupVisible=false;
                             Toast("取消支付")
                         } 
                     });
                 }
            },
            shopinfo(cid){
                this.$router.push('/index/shoplists/shopinfo?id='+cid)
            },
            pay(){
                if(this.he>0){
                    this.popupVisible=true
                }else{
                    Toast("请选择购买商品")
                }
            },
            delblo(){
                 var i=this.sum.length
                 if(i>0){
                     MessageBox.confirm('', {message: '你确定要删除？',title: '提示', confirmButtonText: '确定', cancelButtonText: '取消'}).then(action => { 
                         if (action == 'confirm') {
                            for(var key in this.sum){
                                var img=this.sum[key].img
                                var size=this.sum[key].size
                                this.$http.post('delshop',{img:img,size:size}).then(result=>{
                                    i--
                                    if(i==0){
                                        this.getshop()   
                                        Toast(result.body)
                                        this.allclass="";
                                        this.sum=[]
                                    }
                                }) 
                            }
                        }
                     }).catch(err => { 
                         if (err == 'cancel') {

                         } 
                     });
                }else{
                    Toast("请选择要删除的商品")
                }
            },
            back(){
                this.$router.back(-1)
            },
            add(i){
                if(this.shop[i].count<999){
                    this.shop[i].count++
                    var img=this.shop[i].img;
                    var size=this.shop[i].size;
                    var count=this.shop[i].count;
                    this.sum.sort()
                    this.$http.post('shopadd',{img:img,size:size,count:count}).then(result=>{
                        console.log(result.body)
                    })
                }   
            },
            minus(i){
                if(this.shop[i].count>1){
                    this.shop[i].count--
                    var img=this.shop[i].img;
                    var size=this.shop[i].size;
                    var count=this.shop[i].count;
                    this.sum.sort()
                    this.$http.post('shopadd',{img:img,size:size,count:count}).then(result=>{
                        console.log(result.body)
                    })
                }
            },
            all(){
                if(this.shop.length==0){
                    Toast("没有可选的商品")
                }else if(this.sum.length!==this.shop.length){
                    this.sum=[]
                    for(var key in this.shop){
                        this.sum.push(this.shop[key])
                    }
                    this.allclass="all";
                }else{
                    this.sum=[]
                    this.allclass="";
                }
            },
            getshop(){
                this.$http.get("shopcart").then(result=>{
                    this.shop=result.body;
                    console.log(this.shop)
                })
            }
        },
        created(){
            this.getshop();
        },
        watch:{
            payr(newval,oldval){
                for(var i=0;i<this.paya.length;i++){
                    if(newval==this.paya[i]){
                        this.payr=this.paya[i]
                        console.log(this.payr)
                    }
                }
            },
            sum(){
                this.he=0
                for(var key in this.sum){
                    this.he+=parseInt(this.sum[key].price*this.sum[key].count)
                }
                if(this.sum.length!==this.shop.length){
                    this.allclass="";
                }else{
                    this.allclass="all";
                }
            },
        }
    });
</script>
<style>
    .mui-icon-redo:before{
        position: absolute;
        top: 0;
        right: 0;
        color: #333;
    }
    .mint-radiolist-title{
        font-size: 15px;
    }
    .my-shopcart .mint-button{
        border-radius: 0;
    }
    .my-shopcart .mui-table-view-cell{
        padding: 0 10px 0 0;
    }
    .my-shopcart .mui-table-view .mui-media-object{
        max-width: 100px;
        height: 90px;
    }
    .my-shopcart .mui-input-group .mui-input-row{
        height:auto;
    }
    .my-shopcart .mui-checkbox input[type='checkbox']:before{
        line-height:112px;
    }
    .all{
        opacity:0.8;
    }
    .my-shopcart .bl{
        background:#333;
    }
    .my-shopcart .mint-tabbar > .mint-tab-item.is-selected{
        color:#fff;
        background:#333;
    }
    .my-shopcart .mint-header{
        background: #fff;
        height:45px;
    }
    .my-shopcart .mint-header-button > a , .my-shopcart .mintui-back:before{
        font-size:28px;
        color:#ddd;
    }
    .my-shopcart .mint-header-title{
        color:#000;
        font-size:15px;
    }
    .null{
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
        display: block;
    }
    .mint-popup w-100 mint-popup-bottom{
        z-index:1100;
    }
</style>