import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import { get, post } from "@/utils/http";
import "./common/vantui";
import FastClick from "fastclick";
FastClick.attach(document.body);
/* import wechat from '@/common/wechat/index'
Vue.use(wechat); */
// const wx = Vue.wechat;
// wx.config({
//     appId: '',
//     nonceStr: '',
//     signature: '',
//     timestamp: '',
//     jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
// })

Vue.prototype.router = router;
Vue.prototype.post = post;
Vue.prototype.get = get;
Vue.config.productionTip = false;
Vue.config.devtools = true;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
