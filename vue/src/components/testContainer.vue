<template>
  <div class="app-testContainer">
     <h1>第一个测试组件</h1>
     <input type="button" value="修改" @click="msg='ok'"/>
     <p id="h3">{{msg}}</p>
  </div>
</template>
<script>
   export default {    
     data(){
       return {msg:"脚手架"}
     },
     methods:{
     	show(){
     		console.log("执行show这个方法");
     	}
     },
     beforeCreat(){
     	//console.log(this.msg);
     	//this.show();
     },
     created(){
     	//console.log(this.msg);
     	//this.show();
     },
     beforeMount(){
     	//内存中已编辑完成
     	//模板渲染未完成
     	//var h3 = document.getElementById("h3");
     	//console.log(h3.innerText);
     },
     mounted(){
     	//内存中已编辑完成
     	//模板渲染已完成
     	var h3 = document.getElementById("h3");
     	console.log("4"+h3.innerText);
     },
     beforeUpdate(){
     	//data中已修改
     	//模板中未修改
     	console.log("5:内存中data变量："+this.msg);
     	var h3 = document.getElementById("h3");
     	console.log("5:模板中的数据："+h3.innerText);
     },
     updated(){
     	//data中已修改
     	//模板中已修改
     	console.log("6:内存中data变量："+this.msg);
     	var h3 = document.getElementById("h3");
     	console.log("6:模板中的数据："+h3.innerText);
     }
   }
</script>
<style>
</style>