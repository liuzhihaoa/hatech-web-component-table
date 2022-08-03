import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import Table from '../../src'

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Table)
Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
