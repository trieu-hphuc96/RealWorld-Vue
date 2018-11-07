<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="" v-on:click.prevent="$emit('route','')">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <a class="nav-link" v-bind:class="{ active: currentRoute === '' }" href="" v-on:click.prevent="$emit('route','')">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" v-bind:class="{ active: currentRoute === 'editor' }" href="" v-on:click.prevent="$emit('route','/editor')" v-if="isLogin">
            <i class="ion-compose"></i>&nbsp;New Article
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" v-bind:class="{ active: currentRoute === 'settings' }" href="" v-on:click.prevent="$emit('route','/settings')" v-if="isLogin">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" v-bind:class="{ active: currentRoute === 'profile' && $store.state.profileData.isUser }" href="" v-on:click.prevent="$store.commit('changeProfile',$store.state.user)" v-if="isLogin">
            <img v-bind:src="$store.state.user.image" class="user-pic">
            {{username}}
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" v-bind:class="{ active: currentRoute === 'login' }" href="" v-on:click.prevent="$emit('route','/login')" v-if="!isLogin">Sign in</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" v-bind:class="{ active: currentRoute === 'register' }" href="" v-on:click.prevent="$emit('route','/register')" v-if="!isLogin">Sign up</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'app-header',
  data() {
    return {
      currentRoute: this.$store.state.currentRoute.slice(
        2,
        this.$store.state.currentRoute.length
      ),
      subscribe: this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'route') {
          this.currentRoute = this.$store.state.currentRoute.slice(
            2,
            this.$store.state.currentRoute.length
          );
        }
      })
    };
  },
  computed: {
    username() {
      return this.$store.state.user.username;
    },
    isLogin() {
      return Object.keys(this.$store.state.user).length !== 0;
    }
  }
};
</script>

<style>
</style>
