<template>
	<div class="app-login">
		<h3>用户登录</h3>
		<form action="#">
			用户名：<input type="text" name="uname" v-model="unameval" /><br>
			密码：<input type="password" name="upwd" v-model="upwdval" /></br>
			<input type="button" id="btn" value="登录" @click="btnSubmit" />
		</form>
	</div>
</template>
<script>
import {Toast} from "mint-ui";
export default{
	data(){
		return{
			unameval:"",
			upwdval:""
		}
	},
	methods:{
		btnSubmit(){
			var u = this.unameval;
			var p = this.upwdval;
			this.$http.get("login?uname="+u+"&upwd="+p).then(result=>{
				if(result.body.code==1){
					Toast(result.body.msg);
					this.$router.push("/");
				}else{
					Toast(result.body.msg);
				}
			})
		},
	}
}
</script>
<style>
</style>