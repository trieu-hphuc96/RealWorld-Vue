<template>
  <div class="article-preview">
    <div class="article-meta">
      <a href="profile.html"><img v-bind:src="article.author.image" /></a>
      <div class="info">
        <a href="" class="author" v-on:click.prevent="changeProfile">{{article.author.username}}</a>
        <span class="date">{{formatDate(article.createdAt)}}</span>
      </div>
      <button class="btn btn-sm pull-xs-right" v-bind:class="{ 
        'btn-outline-primary': !article.favorited,
        'btn-primary': article.favorited,
        }" v-on:click.prevent="favoriteHandler()">
        <i class="ion-heart"></i> {{article.favoritesCount}}
      </button>
    </div>
    <a href="" class="preview-link" v-on:click.prevent="$store.commit('route','/article/'+article.slug)">
      <h1>{{article.title}}</h1>
      <p>{{article.body}}</p>
      <span>Read more...</span>
    </a>
  </div>
</template>

<script>
import http from './../../shared/http.js';
var moment = require('moment');

export default {
  name: 'article-preview',
  props: ['article'],
  methods: {
    formatDate(dateString) {
      return moment(dateString).format('LL');
    },
    favoriteHandler() {
      if (this.article.favorited) {
        this.$store.dispatch('unFavoriteArticle', this.article.slug);
      } else {
        this.$store.dispatch('favoriteArticle', this.article.slug);
      }
    },
    changeProfile() {
      http
        .get('/profiles/' + this.article.author.username, {
          headers: {
            Authorization: 'Token ' + this.$store.state.user.token
          }
        })
        .then(res => {
          console.log(res);
          this.$store.commit('changeProfile', res.data.profile)
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
};
</script>

<style>
</style>
