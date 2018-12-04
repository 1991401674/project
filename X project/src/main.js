import App from './App.vue'
import router from './router'
import Vue from 'vue';
import'mint-ui/lib/style.css'

Vue.config.productionTip = false
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
import touch from 'vue-directive-touch';
Vue.use(touch);

import MintUI from "mint-ui"
import VueResource from "vue-resource"
Vue.use(VueResource);
Vue.use(MintUI);

import './lib/mui/css/mui.css'
Vue.http.options.root="http://127.0.0.1:1674"
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})

Vue.filter("datetimeFilter",function(val){
  var date = new Date(val);
  var y = date.getFullYear();
  var m = date.getMonth()+1;
  var d = date.getDate();
  var h = date.getHours();
  var mi = date.getMinutes();
  var s = date.getSeconds();
  m<10&&(m="0"+m);
  d<10&&(d="0"+d);
  mi<10&&(mi="0"+mi);
  h<10&&(h="0"+h);
  s<10&&(s="0"+s);
  return `${y}-${m}-${d} ${h}:${mi}:${s}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
