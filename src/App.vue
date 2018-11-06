<template>
  <div class="app">
    <Header v-on:route="route($event)"></Header>
    <div v-bind:is="this.Content"></div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/header/Header.vue';
import Home from './components/content/home/Home.vue';
import Login from './components/content/Login.vue';
import Register from './components/content/Register.vue';
import Editor from './components/content/Editor.vue';
import Settings from './components/content/Settings.vue';
import Profile from './components/content/Profile.vue';
import Footer from './components/footer/Footer.vue';
import axios from 'axios';

import store from './store.js';

const routes = {
  '': 'Home',
  '#/login': 'Login',
  '#/register': 'Register',
  '#/editor': 'Editor',
  '#/settings': 'Settings',
  '#/profile': 'Profile'
};

export default {
  name: 'app',
  components: {
    Header,
    Home,
    Login,
    Register,
    Editor,
    Settings,
    Profile,
    Footer
  },
  data: function() {
    return {
      currentRoute: store.state.currentRoute,
    };
  },
  computed: {
    Content() {
      return routes[store.state.currentRoute];
    }
  },
  methods: {
    route(href) {
      store.commit('route',href);
    }
  }
};
</script>

<style lang="scss">
</style>
