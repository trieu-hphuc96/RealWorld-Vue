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
                <a class="nav-link" v-if="isLogin" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
              </li>
            </ul>
          </div>

          <ArticlePreview v-for="article in articles" v-bind:key="article.slug" v-bind:article="article"></ArticlePreview>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <Tag v-for="(tag,i) in tags" v-bind:key="i" v-bind:tag="tag"></Tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../../../shared/http.js';
import ArticlePreview from './article/ArticlePreview.vue';
import Tag from './Tag.vue';
import store from './../../../store.js';

export default {
  name: 'home',
  components: {
    ArticlePreview,
    Tag
  },
  data() {
    return {
      articles: this.$store.state.articles,
      tags: [],
      subscribe: this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'setArticles') {
          this.articles = this.$store.state.articles;
        }
      })
    };
  },
  computed: {
    isLogin() {
      return Object.keys(store.state.user).length !== 0;
    }
  },
  mounted() {
    this.$store.dispatch('getArticles');

    http.get('/tags').then(res => {
      this.tags = res.data.tags;
    });
  }
};
</script>

<style>
</style>
