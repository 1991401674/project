import Vue from 'vue'
import Router from 'vue-router'
import Index from "./components/index/index.vue"
import Login from "./components/login/login.vue"
import Register from "./components/login/register.vue"
import Uppwd from "./components/login/uppwd.vue"
import Shoplist from "./components/shop/shoplist.vue"
import Shoplists from "./components/shop/shoplists.vue"
import Shopinfo from "./components/shop/shopinfo.vue"
import Shopcart from "./components/shop/shopcart.vue"
import Admin from "./components/my/my.vue"
import Productlist from "./components/my/productlist.vue"


Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:"/index"},
    {path:'/index',component:Index},
    {path:'/login',component:Login},
    {path:'/uppwd',component:Uppwd},
    {path:'/index/shoplist',component:Shoplist},
    {path:'/index/shoplists',component:Shoplists},
    {path:'/index/shoplists/shopinfo',component:Shopinfo},
    {path:'/index/shopcart',component:Shopcart},
    {path:'/admin',component:Admin},
    {path:'/register',component:Register},
    {path:'/index/admin/productlist',component:Productlist},
  ]
})


