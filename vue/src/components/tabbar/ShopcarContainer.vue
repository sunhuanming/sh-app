<template>
 <div class="app-shopcar">
    <!--轮播图-->
    <div class="mui-card">
		<div class="mui-card-content">
			<div class="mui-card-content-inner">
				<swiper-box :list="imglist"></swiper-box>
			</div>
		</div>
	</div>
    <!--商品列表-->
    <div class="mui-card">
		<div class="mui-card-header">商品列表</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
				<!--左侧图片 右侧文字-->
				<ul class="mui-table-view">
					<li class="mui-table-view-cell mui-media" v-for="item in info" :key="item.id">
						<a href="javascript:;">
							<img class="mui-media-object mui-pull-left" src="">
							<div class="mui-media-body">
							{{item.title}}
							<p class='mui-ellipsis'>
								<span class="price">{{item.Nprice}}</span>
								<span>
									<div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
									<button class="mui-btn mui-btn-numbox-minus" type="button" @click="sub(item.id)">-</button>
									<input id="test" class="mui-input-numbox" type="number" :value="item.many"  />
									<button class="mui-btn mui-btn-numbox-plus" type="button" @click="add(item.id)">+</button>
									</div>
								</span>
							</p>
							</div>
						</a>
					</li>
				</ul>
				</div>
			</div>
	</div>
	<div>商品总价:{{getsubTotal}}</div>
 </div>
</template>
<script>
import swiper from "../sub/swiper.vue";
 export default {
   data(){
     return {
     	imglist:[],
     	info:[]
     }
   },
   methods:{
   		add(id){
				//1.遍历数组的每个元素
				for(var item of this.info){
				//2.判断当前的id是否与参数中的id一样
					if(item.id==id){
					//3.一样就+1
						if(item.many<999){
							item.many++;
							break;
						}
					}
				}	
			},
			sub(id){
				//1.遍历数组的每个元素
				for(var item of this.info){
				//2.判断当前的id是否与参数中的id一样
					if(item.id==id){
					//3.一样就+1
						if(item.many>1){
							item.many--;
							break;
						}
					}
				}
			},
   			getImageList(){
				this.$http.get("imagelist").then(result=>{
					this.imglist=result.body;
				})
			},
			getdetail(){
				this.$http.get("goodlist").then(result=>{
					this.info=result.body;
				})
			}
   },
   created(){
     this.getImageList();
     this.getdetail();
   },
   components:{"swiper-box":swiper},
   computed:{
   	getsubTotal:function(){
   		var sum = 0;
   		for(var item of this.info){
   			sum+=(item.Nprice * item.many);
   		}
   		return sum.toFixed(2);
   	}
   }
 }
</script>
<style>
</style>