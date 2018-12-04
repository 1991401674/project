<template>
    <div class="my-shopinfo">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" bottomPullText bottomLoadingText ref="loadmore">
            <div class="mui-card" style="background: none;">
            <div class="mui-card-header mui-card-media" style="padding: 0;">
                <mt-swipe :auto="3000">
                    <mt-swipe-item v-for="item in list" :key="item.id">
                        <img :src="item.img_url"  :key="item.id" class="w-100 h-100"/>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p style="color: #000; font-size: 15px;">{{lists.title}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <span class="mui-card-link">吊牌价： ￥<s>{{lists.old}}</s></span>
                <span class="mui-card-link">已售：<h4 style="color:red; margin-right:10px;">{{lists.shop}}</h4>件</span>
            </div>
        </div>
        <div class="mui-card" style="background: none;">
            <div class="mui-card-header" style="background: url(http://127.0.0.1:1674/img/shopinfo/msBg.png) no-repeat, linear-gradient(180deg,#fc9a9a,#e61b25); padding: 0.8rem; color:#fff;">
            <div class="d-flex" style="line-height:28px;"><span style="margin:0;">预售价:</span> <h4>￥{{lists.price}}</h4></div>
            <div class="d-flex" style="line-height:28px;"><span style="margin:0;">到手价:</span> <h4>￥{{lists.new}}</h4></div> 
            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner" style="background: #fff;">
                    <p>预售开始时间：2018-11-01 00:00</p>
                    <p style="margin:0;">尾款支付时间：2018-11-10 23:00 — 2018-11-11 23:59</p>
                </div>
            </div>
            <div class="mui-card-footer" style="padding: 1px;">
                <ul class="mui-table-view mui-table-view-chevron w-100" style="background: none">
                    <li class="mui-table-view-cell mui-media w-100"> 
                        <div class="mui-navigate-right" style="display:inline;">
                            <div class="mui-media-body d-flex" style="justify-content: space-around;">
                                <span>规格选择：</span>
                                <b @click="op()">{{checked}}</b>
                                <mt-popup v-model="popupVisible" position="bottom" class="w-100">
                                    <div>
                                        <ul class="mui-table-view">
                                            <li class="mui-table-view-cell mui-media">
                                                <img class="mui-media-object mui-pull-left w-50 h-50" :src="sm_img">
                                                <div class="mui-media-body">
                                                    <p style="text-align:right;">
                                                        <span class="mui-icon mui-icon-closeempty" @click="op(1)"></span>
                                                    </p>
                                                    <h4 style="overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;">{{lists.title}}</h4>
                                                    <h4 style="color:red;">合计： ￥{{sum}}</h4>
                                                    <div class='mui-ellipsis'>
                                                        <div class="mui-numbox">
                                                            <button class="mui-btn mui-btn-numbox-minus" type="button" @click="minus()">-</button>
                                                            <input class="mui-input-numbox" type="number" v-model="count" disabled/>
                                                            <button class="mui-btn mui-btn-numbox-plus" type="button" @click="add()">+</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        <mt-navbar v-model="selected">
                                        <mt-tab-item id="1">{{shopvalue}}</mt-tab-item>
                                        <mt-tab-item id="2">{{shopsize}}</mt-tab-item>
                                        </mt-navbar>
                                        <mt-tab-container v-model="selected">
                                        <mt-tab-container-item id="1">
                                            <mt-radio
                                            :options=color
                                            v-model="duration">
                                            </mt-radio>
                                        </mt-tab-container-item>
                                        <mt-tab-container-item id="2">
                                        <mt-radio
                                            :options=size
                                            v-model="durationSize">
                                            </mt-radio>
                                        </mt-tab-container-item>
                                        </mt-tab-container>
                                    </div>
                                    <mt-button size="large" type="danger" @click="op()">确定</mt-button>
                                </mt-popup>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <mt-navbar v-model="selecteds" value="1">
            <mt-tab-item id="1">详细</mt-tab-item>
            <mt-tab-item id="2">评论（{{comment.length}}）</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selecteds">
            <mt-tab-container-item id="1">
            <div class="mui-card">
                <div class="mui-card-header">
                    <div style="font-size: 70%;">
                        <div><b>产品名称：</b>{{lists.title}}</div>
                        <div><b>货&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</b>{{lists.snum}}</div>
                        <div><b>品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：</b>特步</div>
                        <div><b>品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类：</b>{{lists.type}}</div>
                    </div>
                    
                </div>
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <img :src="img" v-for="img in imginfo" :key="img.id" class="w-100 h-100"/>
                        <img :src="imgs.img_url" v-for="imgs in allshopinfo" :key="imgs.id" class="w-100 h-100"/>
                    </div>
                </div>
                <div>
                    <p class="w-100" style="text-align: center;">—— 推荐商品 ——</p>
                    <a @click="push(img.id)" :key="img.id" v-for="img in listss">
                        <img :src="img.img" class="mui-col-xs-6 mui-col-sm-6"/>
                    </a>
                </div>
            </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell mui-media" v-for="(item,i) in comment" :key="item.id">
                            <img class="mui-media-object mui-pull-left w-25 h-25" :src="item.tx">
                            <div class="mui-media-body">
                                <h4><h5 class="mui-badge mui-badge-dark mui-badge-inverted">第{{i+1}}楼</h5>  {{item.uname}}&nbsp;&nbsp;&nbsp;<h5 class="mui-badge mui-badge-danger mui-badge-inverted">VIP</h5></h4>
                                <h5 class='mui-ellipsis'>{{item.ctime | datetimeFilter}}</h5>
                                <div>{{item.content}}</div>
                            </div>
                        </li>
                    </ul>
                <textarea placeholder="请吐槽最多120个字" maxlength="120" v-model="msg">
                </textarea>
                <mt-button size="large" type="danger" @click="postComment()">发表评论</mt-button>
            </mt-tab-container-item>
            </mt-tab-container>
        </div>
        </mt-loadmore>
        <mt-tabbar v-model="selectedf" fixed style="height:58px;">
            <router-link to="/index" class="mui-col-xs-3 mui-col-sm-3">
                <mt-tab-item id="1" class="bl" style="color:#fff; border-right: 2px solid #fff;">
                    <img slot="icon" src="http://127.0.0.1:1674/img/footer/home (1).png">
                    <span style="font-size:13px;">首页</span>
                </mt-tab-item>
            </router-link>
            <a @click="back()" class="mui-col-xs-3 mui-col-sm-3">
                <mt-tab-item id="2" class="bl" style="color:#fff; border-right: 2px solid #fff;">
                    <img slot="icon" src="http://127.0.0.1:1674/img/footer/classify.png">
                    <span style="font-size:13px;">分类</span>
                </mt-tab-item>
            </a>
            <div @click="shopcart()" class="mui-col-xs-6 mui-col-sm-6" style="background: #ff6600; color:#fff; line-height: 58px; font-size:large;">
                <b>加 入 购 物 车</b>
            </div>
        </mt-tabbar>
        <span class="mui-icon-extra mui-icon-extra-cart" @click.stop="carturl()"></span>
    </div>
</template>
<script>
    import footer from "../sub/footer.vue";
    import { MessageBox } from 'mint-ui';
    import {Toast} from "mint-ui"
    export default({
        data(){
            return {
                msg:"",
                selectedf:"1",
                selecteds:"1",
                listss:[],
                list:[],
                popupVisible:false,
                lists:[],
                selected:"1",
                color:[],
                size:[],
                shopvalue:"颜色",
                shopsize:"尺码",
                duration:'',
                durationSize:'',
                checked:"请选择（尺码/颜色/数量）",
                sm_img:[],
                count:0,
                sum:0,
                imginfo:[],
                allshopinfo:[],
                comment:[],
                page:[],
                allLoaded:"",
                pageIndex:0,           
                pageSize:5,
            }
        },
        methods:{
            loadBottom() {
                this.comments()
                this.$refs.loadmore.onBottomLoaded();
            },
            postComment(){
                var c=this.msg;
                var uname="马云";
                var id=this.$route.query.id
                if(c.trim().length==0){
                    Toast("评论内容不能为空")
                    return;
                }
                this.$http.post("incomment",{id:id,c:c,uname:uname}).then(result=>{
                    Toast(result.body)
                    this.comments()
                    this.msg=""
                })
            },
            carturl(){
                if(sessionStorage.length>0){
                    this.$router.push("/index/shopcart")
                }else{
                    Toast("请先登录！")
                    this.$router.push("/login")
                }
            },
            back(){
                this.$router.push("/index/shoplists")
            },
            push(id){
                this.$router.push('/index/shoplists/shopinfo?id='+id);
                this.$router.go(0);
               
            },
            add(){
                if(this.count<999){
                    this.count++
                    this.sum=this.lists.price*this.count
                }
            },
            minus(){
                if(this.count>0){
                    this.count--
                    this.sum=this.lists.price*this.count
                }
            },
            getswipt(){
                var id=this.$route.query.id;
                this.$http.get("shopinfo").then(result=>{
                    this.list=result.body[id-1]
                })
            },
            getshop(){
                var id=this.$route.query.id;
                this.$http.get("shoplists").then(result=>{
                    this.lists=result.body[id-1]
                    this.color=this.lists.color
                    this.size=this.lists.size
                    this.sm_img=this.lists.sm_img[0]
                    this.imginfo=this.lists.imginfo
                })
            },
            op(i){
                if(this.popupVisible==true){
                    if(i==1){
                        this.popupVisible=false;
                    }else if(this.count==0 || this.shopvalue=="颜色" || this.shopsize=="尺码"){
                        if(this.count==0){
                            MessageBox('提示', '购买数量为0');
                        }else if(this.shopvalue=="颜色"){
                            MessageBox('提示', '请选择颜色');
                        }else if(this.shopsize=="尺码"){
                            MessageBox('提示', '请选择尺码');
                        }
                    }else{
                        this.popupVisible=false;
                        Toast({
                                message: '选择成功',
                                iconClass: 'mui-icon-extra mui-icon-extra-like',
                                duration: 2000
                            })
                        this.checked="已选"+'-'+this.shopvalue+'-'+this.shopsize+'-'+this.count+" 件"
                    }
                }else{
                    this.popupVisible=true;
                }
            },
            getallshop(){
                this.$http.get("allshopinfo").then(result=>{
                    this.allshopinfo=result.body[0]
                    this.getlists()
                })
            },
            getlists(){
                this.$http.get("shoplists").then(result=>{
                    this.listss=result.body
                })
            },
            shopcart(){
                if(sessionStorage.length>0){
                    if(this.checked=="请选择（尺码/颜色/数量）"){
                        Toast({
                                message: '加入失败，请选择商品',
                                duration: 2000
                            });
                        this.popupVisible=true;
                    }else{
                        var id=this.$route.query.id;
                        var title=this.lists.title;
                        var sum=this.lists.price;
                        var color=this.shopvalue;
                        var size=this.shopsize;
                        var count=this.count;
                        var img=this.sm_img;
                        this.$http.post("shopcart",{id:id,title:title,price:sum,color:color,size:size,count:count,img:img}).then(result=>{
                            Toast({
                                message: result.body.msg,
                                iconClass: 'mui-icon-extra mui-icon-extra-cart',
                                duration: 2000
                            })
                        })
                    }
                }else{
                    Toast("请先登录！")
                    this.$router.push("/login")
                }
            },
            comments(){
                this.pageIndex++;
                var p=this.pageIndex;
                var s=this.pageSize;
                var id=this.$route.query.id 
                this.$http.get("comment?id="+id+"&pno="+p+"&pageSize="+s).then(result=>{
                    var row = this.comment.concat(result.body.data);
                    this.comment = row
                })
            }
        },
        created(){
            this.getswipt();
            this.getshop();
            this.getallshop();
            this.comments();
        },
        watch:{
            selecteds(){
                if(this.selecteds=="2"){
                    this.allLoaded=false
                }else{
                    this.allLoaded=true
                }
            },
            duration(newval,oldval){
                for(var i=0;i<this.color.length;i++){
                    if(newval==this.color[i]){
                        this.shopvalue=this.color[i]
                        this.sm_img=this.lists.sm_img[i]
                        
                    }
                }
            },
            durationSize(newval,oldval){
                for(var i=0;i<this.size.length;i++){
                    if(newval==this.size[i]){
                        this.shopsize=this.size[i]
                    }
                }
            }
        }
    })
</script>
<style>
    .my-shopinfo .mui-icon-extra-cart:before{
        position: fixed;
        bottom:40%;
        right:5%;
        color: red;
        font-size: 30px;
        font-weight: 100;
    }
    .mint-toast.is-placemiddle{
        z-index: 9999 !important;
    }
    .my-shopinfo .bl{
        background:#000;
    }
    .my-shopinfo .mint-tabbar > .mint-tab-item.is-selected{
        color:#fff;
        background:#000;
    }
    .my-shopinfo .mui-icon-closeempty:before{
        font-size: 40px;
        text-align:right;
    }
    .my-shopinfo .mui-table-view-chevron .mui-table-view-cell{
        padding-right: 15px;
    }
    .my-shopinfo .mui-table-view .mui-media-object{
        max-width:50%;
    }
    .my-shopinfo .mint-radiolist{
        height:145px;
        overflow: auto;
    }
    .my-shopinfo .mint-navbar .mint-tab-item.is-selected{
        color: red;
    }
    .my-shopinfo .mint-tab-item-label{
        font-size: large;
    }
    .my-shopinfo{
        position: relative;
        top: -50px;
        left: 0;
    }
    .my-shopinfo .mui-card{
        margin: 0;
    }
    .my-shopinfo .mint-swipe{
        height: 375px;
    }
    .my-shopinfo .mint-swipe img{
        width:100%;
        height:100%
    }
    .my-shopinfo .mint-swipe-indicator.is-active{
        background: red;
        opacity: 0.8;
    }
    .my-shopinfo .mui-navigate-right:after, .mui-push-right:after{
        right: 10px;
        font-size: 1.5rem;
    }
</style>
