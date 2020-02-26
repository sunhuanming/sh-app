<template>
  <div class="app-goodslist">
     <div class="goods-item" v-for="item in list" :key="item.id">
      <img :src="item.image_url" @click="jumpdetail(item.id)"/>
      <h3 class="title">{{item.title}}</h3>
      <div class="info">
        <p class="price">
           <span class="now">{{item.Nprice}}</span>
           <span class="old">{{item.Oprice}}</span>
        </p>
        <p class="sell">
           <span>热卖中</span>
           <span>剩 {{item.many}}件</span>
        </p>
      </div>  
     </div>

     
  </div>
</template>
<script>
 export default {
  data(){
     return {
        list:[]
     }
   },
  methods:{
    jumpdetail(id){
      //参数：商品的id
      //console.log(id);
      this.$router.push("/home/goodsinfo/"+id);
    },
    getInfo(){
      var url = "http://127.0.0.1:3000/goodlist";
      this.$http.get(url).then(result=>{
        //console.log(result);
        this.list = result.body;
      })
    }
  },
  created(){
    this.getInfo();
  }
}
</script>
<style>
   .app-goodslist{
     display:flex;     /*最外层设置弹性布局*/
     flex-wrap:wrap;   /*子元素换行*/
     justify-content:space-between;/*两端对齐*/
     padding:7px;      /*为子元素内补丁*/
   }
   .app-goodslist .goods-item{
      width:49%;               /*元素宽度*/
      border:1px solid #ccc;   /*边框*/
      box-shadow:0 0 8px #ccc; /*阴影*/
      margin:4px 0 ;
      padding:2px;
      display:flex;           /*弹性布局*/
      flex-direction:column;  /*垂直布局*/
      justify-content:space-between;/*两端对齐*/
      min-height:293px;       /*最小高度*/
   }
   .app-goodslist .goods-item img{
      width:100%;
   }
   .app-goodslist .goods-item .now{
      color:red;
      font-weight:blod;
      font-size:16px;
   }
   .app-goodslist .goods-item .old{
      font-size:10px;
      text-decoration:line-through;
      margin-left:10px;
   }
</style>