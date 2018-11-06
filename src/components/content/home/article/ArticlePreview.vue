<template>
  <div class="article-preview">
    <div class="article-meta">
      <a href="profile.html"><img v-bind:src="article.author.image" /></a>
      <div class="info">
        <a href="" class="author">{{article.author.username}}</a>
        <span class="date">{{formatDate(article.createdAt)}}</span>
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i> {{article.favoritesCount}}
      </button>
    </div>
    <a href="" class="preview-link">
      <h1>{{article.title}}</h1>
      <p>{{article.body}}</p>
      <span>Read more...</span>
    </a>
  </div>
</template>

<script>
var moment = require('moment');

export default {
  name: 'article-preview',
  props: ['article'],
  methods: {
    formatDate(dateString) {
      return moment(dateString).format('LL');
    }
  }
};
</script>

<style>
</style>
