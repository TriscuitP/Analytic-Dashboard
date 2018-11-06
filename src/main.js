// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyBRVc0vhcUqTCYMvlvABo8N7ER4j5p6_gg',
  authDomain: 'fanmire-d42b5.firebaseapp.com',
  databaseURL: 'https://fanmire-d42b5.firebaseio.com',
  projectId: 'fanmire-d42b5',
  storageBucket: 'fanmire-d42b5.appspot.com',
  messagingSenderId: '884344886654'
};

Vue.use(VueFire)

firebase.initializeApp(config);

export const db = firebase.firestore()
export const auth = firebase.auth()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  // Initialize the app only when we are sure Firebase Auth object is ready to use
  beforeCreate: function() {
    firebase.auth().onAuthStateChanged(function(user) {
      console.log('auth change', user)
      if (user) {
        store.dispatch(SET_USER, {user})
      }
    }.bind(this))
  },
  components: { App },
  template: '<App/>'
})
