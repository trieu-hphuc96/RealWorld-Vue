<template>
  <div v-if="isHaveData" class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{article.title}}</h1>

        <div class="article-meta">
          <a href="" v-on:click.prevent="changeProfile"><img v-bind:src="article.author.image" /></a>
          <div class="info">
            <a href="" class="author" v-on:click.prevent="changeProfile">{{article.author.username}}</a>
            <span class="date">{{formatDate(article.createdAt)}}</span>
          </div>

          <!-- if it's not user's article -->
          <a class="btn btn-sm btn-outline-secondary action-btn" v-if="!isUser && !article.author.following" v-on:click.prevent="followPerson" href="">
            <i class="ion-plus-round"></i> &nbsp; Follow {{article.author.username}}
          </a>
          <a class="btn btn-sm btn-outline-secondary action-btn" v-if="!isUser && article.author.following" v-on:click.prevent="unFollowPerson" href="">
            <i class="ion-minus-round"></i> &nbsp; Unfollow {{article.author.username}}
          </a>
          &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary" v-if="!isUser && !article.favorited">
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post <span class="counter">({{article.favoritesCount}})</span>
          </button>

          <button class="btn btn-sm btn-outline-primary" v-if="!isUser && article.favorited">
            <i class="ion-heart"></i>
            &nbsp;
            Unfavorite Post <span class="counter">({{article.favoritesCount}})</span>
          </button>

          <!-- else.... -->

          <a class="btn btn-outline-secondary btn-sm" href="" v-if="isUser" v-on:click.prevent="$store.commit('route','/editor/'+article.slug)">
            <i class="ion-edit"></i> Edit Article
          </a>&nbsp;
          <button class="btn btn-outline-danger btn-sm" v-if="isUser" v-on:click="$store.dispatch('deleteArticle',article.slug)">
            <i class="ion-trash-a"></i> Delete Article
          </button>
        </div>

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12">
          {{article.body}}
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <a href="" v-on:click.prevent="changeProfile"><img v-bind:src="article.author.image" /></a>
          <div class="info">
            <a href="" class="author" v-on:click.prevent="changeProfile">{{article.author.username}}</a>
            <span class="date">{{formatDate(article.createdAt)}}</span>
          </div>

          <!-- if it's not user's article -->
          <a class="btn btn-sm btn-outline-secondary action-btn" v-if="!isUser && !article.author.following" v-on:click.prevent="followPerson" href="">
            <i class="ion-plus-round"></i> &nbsp; Follow {{article.author.username}}
          </a>
          <a class="btn btn-sm btn-outline-secondary action-btn" v-if="!isUser && article.author.following" v-on:click.prevent="unFollowPerson" href="">
            <i class="ion-minus-round"></i> &nbsp; Unfollow {{article.author.username}}
          </a>
          &nbsp;
          <button class="btn btn-sm btn-outline-primary" v-if="!isUser && !article.favorited" v-on:click.prevent="favoriteHandler()">
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post <span class="counter">({{article.favoritesCount}})</span>
          </button>

          <button class="btn btn-sm btn-outline-primary" v-if="!isUser && article.favorited" v-on:click.prevent="favoriteHandler()">
            <i class="ion-heart"></i>
            &nbsp;
            Unfavorite Post <span class="counter">({{article.favoritesCount}})</span>
          </button>

          <!-- else.... -->

          <a class="btn btn-outline-secondary btn-sm" href="" v-if="isUser" v-on:click.prevent="$store.commit('route','/editor/'+article.slug)">
            <i class="ion-edit"></i> Edit Article
          </a>&nbsp;
          <button class="btn btn-outline-danger btn-sm" v-if="isUser" v-on:click="$store.dispatch('deleteArticle',article.slug)">
            <i class="ion-trash-a"></i> Delete Article
          </button>

        </div>
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <form class="card comment-form" v-on:submit.prevent="addComment">
            <div class="card-block">
              <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="comment.body"></textarea>
            </div>
            <div class="card-footer">
              <img v-bind:src="userImage" class="comment-author-img" />
              <button class="btn btn-sm btn-primary" type="submit">
                Post Comment
              </button>
            </div>
          </form>
          <Comment v-for="(comment,i) in comments" v-bind:key="i" v-bind:comment="comment"></Comment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from './Comment.vue';
import http from './../../../shared/http';
var moment = require('moment');

export default {
  name: 'my-article',
  props: ['article', 'comments'],
  components: {
    Comment
  },
  data() {
    return {
      comment: {
        body: ''
      },
      unSubscribe: this.$store.subscribe(mutation => {
        //if change following state
        if (mutation.type === 'updateProfileData') {
          this.article.author.following = !this.article.author.following;
        }

        //if change favorite state
        if (mutation.type === 'updateArticle') {
          this.article.favorited = !this.article.favorited;
          this.article.favoritesCount = mutation.payload.data[1].value;
        }
      }),
      isLogin: this.$store.state.isLogin
    };
  },
  methods: {
    formatDate(dateString) {
      return moment(dateString).format('LL');
    },
    favoriteHandler() {
      if (!this.isLogin) {
        this.$store.commit('route', '/register');
      } else if (this.article.favorited) {
        this.$store.dispatch('unFavoriteArticle', this.article.slug);
      } else {
        this.$store.dispatch('favoriteArticle', this.article.slug);
      }
    },
    addComment() {
      if (!this.isLogin) {
        this.$store.commit('route', '/register');
      } else {
        http
          .post('/articles/' + this.article.slug + '/comments', this.comment, {
            headers: { Authorization: 'Token ' + this.$store.state.user.token }
          })
          .then(res => {
            this.comments.splice(0, 0, res.data.comment);
          })
          .catch(error => {
            console.log(error.response);
          });
      }
    },
    followPerson() {
      console.log(this.isLogin);
      if (!this.isLogin) {
        this.$store.commit('route', '/register');
      } else {
        this.$store.dispatch('followPerson', this.article.author.username);
      }
    },
    unFollowPerson() {
      if (!this.isLogin) {
        this.$store.commit('route', '/register');
      } else {
        this.$store.dispatch('unFollowPerson', this.article.author.username);
      }
    },
    changeProfile() {
      if (this.isLogin) {
        http
          .get('/profiles/' + this.article.author.username, {
            headers: {
              Authorization: 'Token ' + this.$store.state.user.token
            }
          })
          .then(res => {
            console.log(res);
            this.$store.commit('changeProfile', res.data.profile);
          })
          .catch(error => {
            console.log(error.response);
          });
      } else {
        http
          .get('/profiles/' + this.article.author.username)
          .then(res => {
            console.log(res);
            this.$store.commit('changeProfile', res.data.profile);
          })
          .catch(error => {
            console.log(error.response);
          });
      }
    }
  },
  computed: {
    isUser() {
      return (
        this.isLogin &&
        this.article.author.username === this.$store.state.user.username
      );
    },
    isHaveData() {
      return Object.keys(this.article).length > 0;
    },
    userImage() {
      return this.$store.state.user.image !== undefined &&
        this.$store.state.user.image !== null &&
        this.$store.state.user.image !== ''
        ? this.$store.state.user.image
        : 'https://static.productionready.io/images/smiley-cyrus.jpg';
    }
  }
};
</script>

<style>
</style>
