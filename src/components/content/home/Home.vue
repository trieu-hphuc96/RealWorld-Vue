<template>
  <div class="home-page">

    <div class="banner" v-if="!isLogin">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link" v-bind:class="{ active: currentTab === 'yourFeed' }" v-if="isLogin" v-on:click.prevent="getArticlesByFollowedPeople()" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" v-bind:class="{ active: currentTab === 'globalFeed' }" v-on:click.prevent="getAllArticles()" href="">Global Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" v-if="currentTag !== ''" href="">{{'#'+currentTag}}</a>
              </li>
            </ul>
          </div>

          <ArticlePreview v-for="article in articles" v-bind:key="article.slug" v-bind:article="article"></ArticlePreview>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <Tag v-for="(tag,i) in tags" v-bind:key="i" v-bind:tag="tag" v-on:getArticlesByTag="getArticlesByTag($event)"></Tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../../../share/http.js';
import ArticlePreview from './../../share/ArticlePreview.vue';
import Tag from './Tag.vue';

export default {
  name: 'home',
  components: {
    ArticlePreview,
    Tag
  },
  data() {
    return {
      articles: [],
      tags: [],
      currentTag: '',
      currentTab: 'globalFeed',
      subscribe: this.$store.subscribe((mutation, state) => {
        if (
          mutation.type === 'setArticles' &&
          this.currentTab === 'globalFeed'
        ) {
          this.articles = state.articles;
        }

        if (mutation.type === 'updateArticle') {
          if (this.currentTab === 'yourFeed') {
            this.getArticlesByFollowedPeople();
          } else if (
            this.currentTab !== 'yourFeed' &&
            this.currentTab !== 'globalFeed'
          ) {
            this.getArticlesByTag(this.currentTab);
          }
        }
      })
    };
  },
  computed: {
    isLogin() {
      return Object.keys(this.$store.state.user).length !== 0;
    }
  },
  methods: {
    getAllArticles() {
      this.currentTab = 'globalFeed';
      this.currentTag = '';
      this.articles = this.$store.state.articles;
    },
    getArticlesByFollowedPeople() {
      this.currentTab = 'yourFeed';
      this.currentTag = '';

      //get from global articles
      // this.articles = this.articles.filter(item => {
      //   return item.author.following;
      // })

      //get all from database

      http
        .get('/articles/feed', {
          headers: { Authorization: 'Token ' + this.$store.state.user.token }
        })
        .then(res => {
          this.articles = res.data.articles;
        });
    },
    getArticlesByTag(tag) {
      this.currentTag = tag;
      this.currentTab = tag;
      if (this.$store.state.isLogin) {
        http
          .get('/articles', {
            headers: { Authorization: 'Token ' + this.$store.state.user.token },
            params: { tag: tag }
          })
          .then(res => {
            this.articles = res.data.articles;
          });
      } else {
        http
          .get('/articles', {
            params: { tag: tag }
          })
          .then(res => {
            this.articles = res.data.articles;
          });
      }
    }
  },
  mounted() {
    this.$store.dispatch('getArticles');

    http.get('/tags').then(res => {
      this.tags = res.data.tags;
    });

    if (this.$store.state.isLogin) {
      this.currentTab = 'yourFeed';
      this.getArticlesByFollowedPeople();
    }
  }
};
</script>

<style>
</style>
