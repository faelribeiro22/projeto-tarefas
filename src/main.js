import Vue from 'vue'
import App from './App.vue'
import moment from 'moment-timezone'

new Vue({
  el: '#app',
  moment,
  render: h => h(App)
})
