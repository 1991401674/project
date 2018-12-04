<template>
    <div class="my-uppwd w-100 h-100">
        <div class="mui-content">
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
                    <label>原密码</label>
					<input v-model="upwd" type="text" class="mui-input-clear mui-input" placeholder="请输入原密码" style="height:50px;">
				</div>
				<div class="mui-input-row">
                    <label>新密码</label>
					<input v-model="nupwd" type="text" class="mui-input-clear mui-input" placeholder="请输入新密码" style="height:50px;">
				</div><div class="mui-input-row">
                    <label>确认密码</label>
					<input v-model="upwdc" type="text" class="mui-input-clear mui-input" placeholder="请重新输入新密码" style="height:50px;">
				</div>
			</form>
		</div>
        <div style="text-align:center; margin-top: 20px;">
            <button type="button" class="mui-btn mui-btn-danger" style="margin:5px;">
                确定
            </button>
            <button type="button" @click="quit()" class="mui-btn" style="margin:5px;">
                取消
            </button>
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
                upwd:"",
                nupwd:"",
                upwdc:""
            }
        },
        methods:{
            quit(){
                this.upwd=this.nupwd=this.upwdc=""
            }
        },
        created() {
            
        },
        components:{
            "my-footer":footer
        }
    });
</script>
<style>
    .my-uppwd .mui-input-group .mui-input-row{
        height: 50px;
    }
</style>
