<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{comment.body}}</p>
    </div>
    <div class="card-footer">
      <a href="" class="comment-author">
        <img v-bind:src="comment.author.image" class="comment-author-img" />
      </a>
      &nbsp;
      <a href="" class="comment-author">{{comment.author.username}}</a>
      <span class="date-posted">{{formatDate(comment.createdAt)}}</span>
      <span class="mod-options" v-if="comment.author.username === $store.state.user.username">
        <i class="ion-trash-a" v-on:click="$emit('deleteComment', comment.id)"></i>
      </span>
    </div>
  </div>
</template>

<script>
import http from './../../../share/http';

var moment = require('moment');

export default {
  name: 'comment',
  props: ['comment'],
  methods: {
    formatDate(dateString) {
      return moment(dateString).format('LL');
    }
  }
};
</script>

<style>
</style>
