import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"
//1:引入自定义组件 
import TestContainer from "./components/testContainer.vue";
import listContainer from "./components/listContainer.vue"
import homeContainer from "./components/tabbar/HomeContainer.vue"
import newsListContainer from "./components/news/newsListContainer.vue"
import newInfoContainer from "./components/news/newInfoContainer.vue"
import shopContainer from "./components/tabbar/ShopContainer.vue"
import goodsList from "./components/goods/GoodList.vue"
import goodsInfo from "./components/goods/GoodInfo.vue"
import shopcar from "./components/tabbar/ShopcarContainer.vue"
import photolist from "./components/photo/Photocontainer.vue"
import login from "./components/tabbar/loginContainer.vue"
Vue.use(Router)

//2:配置访问自定义组件路径
//   {path访问路径 component  组件名称}
export default new Router({
  routes: [
    {path:"/home/goodsinfo/:id",component:goodsInfo},
    {path:"/home/goodslist",component:goodsList},
    {path:"/home/shop/:id",component:shopContainer},
    {path:"/shopcar",component:shopcar},
    {path:"/home/newsinfo",component:newInfoContainer},
    {path:"/home/newslist",component:newsListContainer},
    {path:'/',redirect:"/home"},
    {path:"/test",component:TestContainer},
    {path:"/list",component:listContainer},
    {path:"/home",component:homeContainer},
    {path:"/home/photo",component:photolist},
    {path:"/home/login",component:login}
  ]
})


