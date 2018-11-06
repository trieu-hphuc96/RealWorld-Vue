<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="" v-on:click.prevent="$emit('route','')">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <a class="nav-link" href="" v-on:click.prevent="$emit('route','')">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="" v-on:click.prevent="$emit('route','/editor')" v-if="isLogin">
            <i class="ion-compose"></i>&nbsp;New Article
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="" v-on:click.prevent="$emit('route','/settings')" v-if="isLogin">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="" v-on:click.prevent="$emit('route','/profile')"  v-if="isLogin">{{username}}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="" v-on:click.prevent="$emit('route','/login')" v-if="!isLogin">Sign in</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="" v-on:click.prevent="$emit('route','/register')" v-if="!isLogin">Sign up</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'app-header',
  computed: {
    username(){
      return this.$store.state.user.username;
    },
    isLogin() {
      return Object.keys(this.$store.state.user).length !== 0;
    },
  }
};
</script>

<style>
</style>
