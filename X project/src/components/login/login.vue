<template>
    <div class="my-login w-100 h-100">
        <img src="http://127.0.0.1:1674/img/login/login_logo.gif" alt="">
        <div class="mui-content">
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
					<input v-model="uname" id="account" type="text" class="mui-input-clear mui-input" placeholder="请输入账号" style="height:50px;">
				</div>
				<div class="mui-input-row">
					<input id='password' v-model="upwd" type="password" class="mui-input-clear mui-input" placeholder="请输入密码" style="height:50px;">
				</div>
			</form>
			<div class="mui-content-padded">
				<button id='login' type="button" class="mui-btn mui-btn-block mui-btn-danger" @click="sub()">确定登录</button>
				<div class="link-area"><router-link id='reg' to="/register">注册新用户</router-link> <span class="spliter">|</span> <a id='forgetPassword'>忘记密码</a>
				</div>
			</div>
		</div>
        <div class="mui-content-padded oauth-area">
            <div class="mui-content">
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="http://127.0.0.1:1674/img/login/weixin.png" class="w-50"/>
		                    <div class="mui-media-body"></div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="http://127.0.0.1:1674/img/login/qq.png" class="w-50"/>
		                    <div class="mui-media-body"></div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="http://127.0.0.1:1674/img/login/sinaweibo.png" class="w-50"/>
		                    <div class="mui-media-body"></div></a></li>
		        </ul> 
		    </div>
		</div>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
    export default({
        data(){
            return {
                uname:"",
                upwd:""
            }
        },
        methods:{
            sub(){
                this.$http.post("login",{un:this.uname,up:this.upwd}).then(result=>{
                        Toast(result.body.msg);
                        if(result.body.c==1){
                            this.$router.back(-1)
                            sessionStorage.setItem("login",this.uname)
                        }
                })
            }
        },
        created() {
        },
    })
</script>
<style>

    .my-login{
        background:#fff;
        padding: 1rem;
        top:0;
        height: 100%;
        text-align: center;
        z-index: 999;
    }
    .my-login>img{
        margin-top: 15vh;
        margin-bottom: 10%;
        width: 30%;
    }
    .my-login .mui-content{
        background: none;
    }
    #account{
        background: url('http://127.0.0.1:1674/img/login/login_account.gif') no-repeat;
        background-size: auto 50%;
        background-position: 5% center;
        padding-left: 20%;
        height: 80%;
    }
    #password{
        background: url('http://127.0.0.1:1674/img/login/login_password.gif') no-repeat;
        background-size: auto 50%;
        background-position: 5% center;
        padding-left: 20%;
        height: 80%;
    }
    .my-login .mui-input-row{
        height: 50px !important;
    }
    .my-login .mui-btn-block{
        margin-top: 10%;
        margin-bottom: 8%;
        padding: 0.5rem;
        font-size: 20px;
        background: #E53930;
        color:#fff;
    }
    .my-login .link-area a{
        color: #969696;
        font-size: 15px;
        margin-left:10%;
        margin-right:10%;
    }
    .my-login .mui-grid-view.mui-grid-9{
        background: none;
        border: none;
    }
    .my-login .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: none;
    }
</style>
