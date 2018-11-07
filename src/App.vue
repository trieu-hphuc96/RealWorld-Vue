<template>
  <div class="app">
    <Header v-on:route="route($event)"></Header>
    <div v-if="content === 'Profile'" v-bind:is="'Profile'" v-bind:isUser="$store.state.profileData.isUser" v-bind:profileData="$store.state.profileData"></div>
    <div v-else-if="content === 'Article'" v-bind:is="'Article'" v-bind:article="articleData" v-bind:comments="comments"></div>
    <div v-else-if="content === 'Editor'" v-bind:is="'Editor'" v-bind:article="editorData" v-bind:mode="editorMode"></div>
    <div v-else v-bind:is="content"></div>
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
import Article from './components/content/article/Article.vue';
import Footer from './components/footer/Footer.vue';
import axios from 'axios';

import http from './shared/http';

const routes = {
  '': 'Home',
  '#/login': 'Login',
  '#/register': 'Register',
  '#/editor': 'Editor',
  '#/settings': 'Settings',
  '#/profile': 'Profile',
  '#/article': 'Article'
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
    Article,
    Footer
  },
  data: function() {
    return {
      currentRoute: this.$store.state.currentRoute,
      articleData: {},
      comments: [],
      editorData: {
        title: '',
        description: '',
        body: '',
        tag: '',
        tagList: []
      },
      editorMode: '',
    };
  },
  computed: {
    content() {
      if (this.$store.state.currentRoute.includes('article')) {
        const slug = this.$store.state.currentRoute.slice(
          10,
          this.$store.state.currentRoute.length
        );
        let config = {};

        if (this.$store.state.isLogin) {
          config = {
            headers: {
              Authorization: 'Token ' + this.$store.state.user.token
            }
          };
        }

        this.getAnArticle(slug, config);
        this.getComments(slug, config);
        return routes['#/article'];
      } else if (this.$store.state.currentRoute.includes('editor')) {
        const slug = this.$store.state.currentRoute.slice(
          9,
          this.$store.state.currentRoute.length
        );
        let flag = false;
        console.log(this.$store.state.articles);
        this.$store.state.articles.map(article => {
          if (
            article.slug === slug &&
            article.author.username === this.$store.state.user.username
          ) {
            console.log(article);
            this.editorData = article;
            this.editorMode = 'edit';
            flag = true;
          }
        });

        if (!flag) {
          this.editorData = {
            title: '',
            description: '',
            body: '',
            tag: '',
            tagList: []
          };
            this.editorMode = 'add';
        }

        return routes['#/editor'];
      } else {
        return routes[this.$store.state.currentRoute];
      }
    }
  },
  methods: {
    route(href) {
      this.$store.commit('route', href);
    },
    getAnArticle(slug, config = {}) {
      http.get('/articles/' + slug, config).then(res => {
        this.articleData = res.data.article;
        console.log(this.articleData);
      });
    },
    getComments(slug, config = {}) {
      http.get('/articles/' + slug + '/comments', config).then(res => {
        console.log(res.data);
        this.comments = res.data.comments;
      });
    }
  },
  beforeMount() {
    console.log('beforeMount');
    if (this.$store.state.articles.length === 0) {
      this.$store.dispatch('getArticles');
    }
  }
};
</script>

<style lang="scss">
</style>
