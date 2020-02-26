<template>
	<div class="app-goodinfo">
		<!--轮播区域-->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swiper-box :list="imglist"></swiper-box>
				</div>
			</div>
		</div>
		<!--购买区域-->
		<div class="mui-card">
			<div class="mui-card-header">{{info.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
							市场价:<del>￥{{info.Oprice}}</del>
							销售价:<span class="now">￥{{info.Nprice}}</span>
						</p>
						<p>
							购买数量:
							<div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
								<button class="mui-btn mui-btn-numbox-minus" type="button" @click="sub">-</button>
								<input id="test" class="mui-input-numbox" type="number" value="1" v-model="val"  />
								<button class="mui-btn mui-btn-numbox-plus" type="button" @click="add">+</button>
							</div>
						</p>
						<p>
							<mt-button type="danger" size="small">立即购买</mt-button>
							<mt-button type="primary" size="small" @click="addCartTo">加入购物车</mt-button>
						</p>
					</div>
				</div>
			<div class="mui-card-footer"></div>
		</div>
		<!--参数区域-->
		<div class="mui-card">
			<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号:{{info.pid}}</p>
						<p>商品颜色:{{info.color}}</p>
						<p>商品运费:0</p>
					</div>
				</div>
			<div class="mui-card-footer"></div>
		</div>
	</div>
</template>
<script>
import swiper from "../sub/swiper.vue";
import {Toast} from "mint-ui";
//引入 mui js 库,需下载第三方模块，禁止脚手架严格模式
//import mui from "../../lib/mui/js/mui.js";
	export default{
		data(){
			return {
				imglist:[],
				val:1,
				info:[],
				id:this.$route.params.id
			}
		},
		methods:{
			addCartTo(){
				//1.将商品编号数量保存在服务器
				var id = this.id;
				var count = this.val;
				this.$http.get("addCart?pid="+id+"&count="+count).then(result=>{
					if(result.body.code == 1){
						//更新购物车中商品的数量
						//修改Vuex共享数据
						this.$store.commit("increment",count);
						Toast(result.body.msg);
					}else{
						Toast(result.body.msg);
					}
				});
				//2.更新App.vue组件购物车数量
			},
			add(){
				if(this.val<999){
					this.val++;
				}
			},
			sub(){
				if(this.val>1){
					this.val--;
				}
			},
			getdetail(){
				this.$http.get("goodlist").then(result=>{
					var id = this.id-1;
					this.info=result.body[id];
				})
			},
			getImageList(){
				this.$http.get("imagelist").then(result=>{
					this.imglist=result.body;
				})
			}
		},
		created(){
			//console.log(this.$route.params.id);
			this.getImageList();
			this.getdetail();
		},
		components:{"swiper-box":swiper}
	}
</script>
<style>
</style>