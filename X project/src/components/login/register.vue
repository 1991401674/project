<template>
    <div class="my-register w-100 h-100">
        <img src="http://127.0.0.1:1674/img/login/login_logo.gif" alt="">
        <div class="mui-content">
			<form class="mui-input-group">
				<div class="mui-input-row">
					<input id='account' type="text" class="mui-input-clear mui-input h-100" placeholder="请输入账号" v-model="uname">
				</div>
				<div class="mui-input-row">
					<input id='password' type="password" class="mui-input-clear mui-input h-100" placeholder="请输入密码" v-model="upwd">
				</div>
				<div class="mui-input-row">
					<input id='password_confirm' type="password" class="mui-input-clear mui-input h-100" placeholder="请确认密码" v-model="upwdc">
				</div>
				<div class="mui-input-row">
					<input id='phone' type="text" class="mui-input-clear mui-input h-100" placeholder="请输入手机号" v-model="phone">
				</div>
                <div>

                </div>
                <div style="padding: 3vh 0 3vh 0;">
                    <label>
                        <input type="checkbox" v-model="check">
                        我已看过并接受
                        <a href="#" style="font-size:90%; color:#ddd;">《特步用户协议》</a>
                    </label>
                </div>
			</form>
            <mt-button type="danger" size="large" @click="zc()">立即注册</mt-button>
		</div>
        <div @click="back()" style="margin-top: 20px;">返回</div>
    </div>
</template>
<script>
    import {Toast} from "mint-ui"
    export default({
        data(){
            return {
                uname: "",
                upwd: "",
                upwdc: "",
                phone: "",
                check:false
            }
        },
        methods:{
            back(){
                this.$router.back(-1)
            },
            zc(){
                var uname=this.uname;
                var upwd=this.upwd;
                var upwdc=this.upwdc;
                var phone=this.phone;
                var p=/^\w{8,16}$/
                var n=/^\d{8,16}$/
                var ph=/^\d{11}$/
                if(n.test(uname)&&p.test(upwd)&&upwd==upwdc&&ph.test(phone)&&this.check){
                    this.$http.post("register",{un:uname,up:upwd,phone:phone}).then(result=>{
                        console.log(result.body)
                        Toast(result.body.msg)
                        if(result.body.c==1){
                            setTimeout(() => {
                                this.$router.back(-1)
                            }, 1000);
                        }
                        
                    })
                }else{
                    if(!n.test(uname)){
                        Toast("账号格式错误！")
                    }else if(!p.test(upwd)){
                        Toast("密码格式错误！")
                    }else if(upwd!==upwdc){
                        Toast("两次密码不相同！")
                    }else if(!ph.test(phone)){
                        Toast("手机格式错误！")
                    }else if(!this.check){
                        Toast("请认真阅读协议！")
                    }
                }
            }
        },
        created() {
            
        },
    })
</script>
<style>
    #password_confirm{
        background: url('http://127.0.0.1:1674/img/login/login_password.gif') no-repeat;
        background-size: auto 50%;
        background-position: 5% center;
        padding-left: 20%;
        height: 80%;
    }
    #phone{
        background: url('http://127.0.0.1:1674/img/login/mobile_account.png') no-repeat;
        background-size: auto 50%;
        background-position: 5% center;
        padding-left: 20%;
        height: 80%;
    }
    .my-register{
        background:#fff;
        padding: 1rem;
        top:0;
        height: 100%;
        text-align: center;
        z-index: 999;
    }
    .my-register>img{
        margin-top: 10vh;
        margin-bottom: 10%;
        width: 30%;
    }
    .my-register .mui-input-row{
        height: 50px !important;
    }
</style>

