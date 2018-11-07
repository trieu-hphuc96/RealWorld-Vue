<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img v-bind:src="profileData.image" class="user-img" />
            <h4>{{profileData.username}}</h4>
            <p>
              {{profileData.bio}}
            </p>
            <a class="btn btn-sm btn-outline-secondary action-btn" v-if="!isUser && !profileData.following" v-on:click.prevent="$store.dispatch('followPerson',profileData.username)" href="">
              <i class="ion-plus-round"></i> &nbsp; Follow {{profileData.username}}
            </a>
            <a class="btn btn-sm btn-outline-secondary action-btn" v-if="!isUser && profileData.following" v-on:click.prevent="$store.dispatch('unFollowPerson',profileData.username)" href="">
              <i class="ion-minus-round"></i> &nbsp; Unfollow {{profileData.username}}
            </a>
            <a class="btn btn-sm btn-outline-secondary action-btn" v-if="isUser" href="" v-on:click.prevent="$store.commit('route','/settings')">
              <i class="ion-gear-a"></i> Edit Profile Settings
            </a>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link" v-bind:class="{ active: currentArticles === 'my' }" href="" v-on:click.prevent="currentArticles = 'my'">My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" v-bind:class="{ active: currentArticles === 'favorited' }" href="" v-on:click.prevent="currentArticles = 'favorited'">Favorited Articles</a>
              </li>
            </ul>
          </div>

          <ArticlePreview v-for="article in currentArticles === 'my' ? myArticles : favoritedArticles" v-bind:key="article.slug" v-bind:article="article"></ArticlePreview>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import ArticlePreview from './../shared/ArticlePreview.vue';
import http from './../../shared/http';

export default {
  name: 'profile',
  props: ['isUser', 'profileData'],
  components: {
    ArticlePreview
  },
  data() {
    return {
      myArticles: [],
      favoritedArticles: [],
      currentArticles: 'my',
      unSubscribe: this.$store.subscribe((mutation, state) => {
        if (
          mutation.type === 'setArticles' ||
          mutation.type === 'updateArticle' ||
          mutation.type === 'changeProfile'
        ) {
          console.log('Profile change articles');

          //subscribe come first, before props change value
          setTimeout(() => {
            this.getMyArticles();

            this.getFavoritedArticles();
          }, 500);
        }
      })
    };
  },
  methods: {
    getMyArticles() {
      http
        .get('/articles', {
          headers: {
            Authorization: 'Token ' + this.$store.state.user.token
          },
          params: {
            author: this.profileData.username
          }
        })
        .then(res => {
          this.myArticles = res.data.articles;
        });
    },
    getFavoritedArticles() {
      http
        .get('/articles', {
          headers: {
            Authorization: 'Token ' + this.$store.state.user.token
          },
          params: {
            favorited: this.profileData.username
          }
        })
        .then(res => {
          this.favoritedArticles = res.data.articles;
        });
    }
  },
  mounted() {
    console.log('profile mounted');
    if (this.$store.state.articles.length === 0) {
      this.$store.dispatch('getArticles');
    } else {
      this.getMyArticles();
    }

    if (this.favoritedArticles.length === 0) {
      this.getFavoritedArticles();
    }
  },
  update(){
    console.log('profile updated');
  },
  beforeDestroy() {
    console.log('profile before destroy');
    this.unSubscribe();
  }
};
</script>

<style>
</style>
